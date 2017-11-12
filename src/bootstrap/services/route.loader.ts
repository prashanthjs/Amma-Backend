import * as _ from 'lodash';
import {Server} from 'hapi';


export class RouteLoader {

    constructor(private server: Server) {

    }

    loadRoutes(routes?: Object): void {
        routes = routes || {};
        let routesArray = [];
        _.forOwn(routes, (route, key) => {
            route.config.id = route.config.id || key;
            route = this.transformRoute(route, 'config.pre', 'assign');
            route = this.transformRoute(route, 'config.post');
            route = this.transformRoute(route, 'config.auth.scope');
            routesArray.push(route);
        });
        this.server.route(routesArray);
    }

    transformRoute(route, key, localKey: string = null): Object {
        if (_.has(route, key)) {
            const preObj = _.get(route, key);
            _.set(route, key, this.getArrayFromObject(preObj, localKey));
        }

        return route;
    }

    private getArrayFromObject(obj: Object, localKey: string = null): any[] {
        const arr = [];
        _.forEach(obj, (value, key) => {
            if (localKey) {
                value[localKey] = key;
            }
            arr.push(value);
        });
        return arr;
    }
}
