"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const service_loader_1 = require("./services/service.loader");
const route_loader_1 = require("./services/route.loader");
const loader_1 = require("./services/loader");
const bootstrap = (server, modules) => {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceLoader = new service_loader_1.ServiceLoader(server, 'settings.app.services');
            const routeLoader = new route_loader_1.RouteLoader(server);
            const loader = new loader_1.Loader(server, serviceLoader, routeLoader);
            yield loader.init(modules);
            resolve();
        }
        catch (e) {
            reject(e);
        }
    }));
};
module.exports = bootstrap;
//# sourceMappingURL=index.js.map