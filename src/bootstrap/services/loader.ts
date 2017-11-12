import DeepMerge = require('deepmerge');
import Path = require('path');
import _ = require('lodash');
import * as Hapi from 'hapi';
import {ServiceLoader} from './service.loader';
import {RouteLoader} from './route.loader';
import * as ObjectPath from 'object-path';

export interface IConfig {
    app?: Object;
    services?: Object;
    routes?: Object;
}

export interface ServerExtended extends Hapi.Server {

    getService<T>(serviceName: string): T;

    getConfig<T>(name: string): T;

    getRouteConfig<T>(request: Hapi.Request, name: string): T;
}

export class Loader {

    constructor(private server: Hapi.Server, private serviceLoader: ServiceLoader, private routeLoader: RouteLoader) {
    }

    init(modulePaths: Object) {

        return new Promise(async (resolve) => {
            const modules = this.getModules(modulePaths);
            let config = this.loadConfig(modules);
            config = this.triggerMergedConfig(modules, config);
            this.loadAppConfig(config);
            this.server['getConfig'] = (name: string) => {
                return ObjectPath.get(this.server.settings.app, name);
            };

            this.server['getRouteConfig'] = (request: Hapi.Request, name: string) => {
                return ObjectPath.get(request, 'route.settings.app.' + name);
            };

            await this.serviceLoader.loadServices(config.services);
            this.routeLoader.loadRoutes(config.routes);
            resolve();
        });
    }

    private getModules(modulePaths): any[] {
        const modules = [];

        _.forOwn(modulePaths, (modulePath, moduleName) => {
            try {
                const configPath = Path.join(modulePath, 'module');
                modules.push(require(configPath));
            } catch (e) {
                this.server.log(e);
                this.server.log('info', moduleName + ': Module does not exist' + modulePath);
            }
        });

        return modules;
    }

    private loadConfig(modules: any[]): IConfig {
        let config = {};
        for (let i = 0; i < modules.length; i++) {
            if (_.has(modules[i], 'getConfig')) {
                config = DeepMerge(config, modules[i].getConfig());
            }
        }
        return config;
    }

    private triggerMergedConfig(modules, config): IConfig {
        for (let i = 0; i < modules.length; i++) {
            if (_.has(modules[i], 'postConfig')) {
                config = modules[i].postConfig(config);
            }
        }
        return config;
    }

    private loadAppConfig(config: IConfig): void {
        const app = config.app || {};
        if (this.server.settings.app) {
            this.server.settings.app = DeepMerge(app, this.server.settings.app);
        } else {
            this.server.settings.app = app;
        }
    }
}
