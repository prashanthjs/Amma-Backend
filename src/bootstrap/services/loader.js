"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DeepMerge = require("deepmerge");
const Path = require("path");
const _ = require("lodash");
const ObjectPath = require("object-path");
class Loader {
    constructor(server, serviceLoader, routeLoader) {
        this.server = server;
        this.serviceLoader = serviceLoader;
        this.routeLoader = routeLoader;
    }
    init(modulePaths) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const modules = this.getModules(modulePaths);
            let config = this.loadConfig(modules);
            config = this.triggerMergedConfig(modules, config);
            this.loadAppConfig(config);
            this.server['getConfig'] = (name) => {
                return ObjectPath.get(this.server.settings.app, name);
            };
            this.server['getRouteConfig'] = (request, name) => {
                return ObjectPath.get(request, 'route.settings.app.' + name);
            };
            yield this.serviceLoader.loadServices(config.services);
            this.routeLoader.loadRoutes(config.routes);
            resolve();
        }));
    }
    getModules(modulePaths) {
        const modules = [];
        _.forOwn(modulePaths, (modulePath, moduleName) => {
            try {
                const configPath = Path.join(modulePath, 'module');
                modules.push(require(configPath));
            }
            catch (e) {
                this.server.log(e);
                this.server.log('info', moduleName + ': Module does not exist' + modulePath);
            }
        });
        return modules;
    }
    loadConfig(modules) {
        let config = {};
        for (let i = 0; i < modules.length; i++) {
            if (_.has(modules[i], 'getConfig')) {
                config = DeepMerge(config, modules[i].getConfig());
            }
        }
        return config;
    }
    triggerMergedConfig(modules, config) {
        for (let i = 0; i < modules.length; i++) {
            if (_.has(modules[i], 'postConfig')) {
                config = modules[i].postConfig(config);
            }
        }
        return config;
    }
    loadAppConfig(config) {
        const app = config.app || {};
        if (this.server.settings.app) {
            this.server.settings.app = DeepMerge(app, this.server.settings.app);
        }
        else {
            this.server.settings.app = app;
        }
    }
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map