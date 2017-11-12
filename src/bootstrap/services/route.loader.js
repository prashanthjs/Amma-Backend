"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class RouteLoader {
    constructor(server) {
        this.server = server;
    }
    loadRoutes(routes) {
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
    transformRoute(route, key, localKey = null) {
        if (_.has(route, key)) {
            const preObj = _.get(route, key);
            _.set(route, key, this.getArrayFromObject(preObj, localKey));
        }
        return route;
    }
    getArrayFromObject(obj, localKey = null) {
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
exports.RouteLoader = RouteLoader;
//# sourceMappingURL=route.loader.js.map