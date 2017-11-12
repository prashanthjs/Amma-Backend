import {ServiceLoader} from './services/service.loader';
import {RouteLoader} from './services/route.loader';
import {Server} from 'hapi';
import {Loader} from './services/loader';

const bootstrap = (server: Server, modules: Object): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const serviceLoader = new ServiceLoader(server, 'settings.app.services');
            const routeLoader = new RouteLoader(server);
            const loader = new Loader(server, serviceLoader, routeLoader);
            await loader.init(modules);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

export = bootstrap;