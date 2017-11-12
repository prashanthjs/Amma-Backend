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
const _ = require("lodash");
const ObjectPath = require("object-path");
const callback_helper_1 = require("./callback.helper");
class ServiceLoader {
    constructor(server, servicesKeyPath) {
        this.server = server;
        this.servicesKeyPath = servicesKeyPath;
    }
    loadServices(serviceConfig) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            this.server['getService'] = (serviceName) => {
                return ObjectPath.get(this.server, this.servicesKeyPath + '.' + serviceName);
            };
            serviceConfig = serviceConfig || {};
            const callBackArray = [];
            _.forOwn(serviceConfig, (service, serviceName) => {
                this.loadService(serviceName, service, callBackArray);
            });
            if (callBackArray.length) {
                callback_helper_1.CallbackHelper.run(callBackArray);
            }
            resolve();
        }));
    }
    loadService(serviceName, ServiceClass, callBackArray) {
        const cls = new ServiceClass(this.server);
        try {
            callBackArray.push(cls.init.bind(cls));
        }
        catch (error) {
        }
        ObjectPath.ensureExists(this.server, this.servicesKeyPath, {});
        ObjectPath.set(this.server, this.servicesKeyPath + '.' + serviceName, cls);
    }
}
exports.ServiceLoader = ServiceLoader;
//# sourceMappingURL=service.loader.js.map