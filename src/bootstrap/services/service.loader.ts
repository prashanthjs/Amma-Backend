import * as _ from 'lodash';
import * as ObjectPath from 'object-path';
import {CallbackHelper} from './callback.helper';
import {Server} from 'hapi';

export class ServiceLoader {

    constructor(private server: Server, private servicesKeyPath) {
    }

    loadServices(serviceConfig: Object): Promise<any> {
        return new Promise(async (resolve) => {

            this.server['getService'] = (serviceName: string) => {
                return ObjectPath.get(this.server, this.servicesKeyPath + '.' + serviceName);
            };

            serviceConfig = serviceConfig || {};
            const callBackArray = [];
            _.forOwn(serviceConfig, (service, serviceName) => {
                this.loadService(serviceName, service, callBackArray);
            });
            if (callBackArray.length) {
                CallbackHelper.run(callBackArray);
            }
            resolve();
        });
    }

    private loadService(serviceName: string, ServiceClass: any, callBackArray: any[]): void {
        const cls = new ServiceClass(this.server);

        try {
            callBackArray.push(cls.init.bind(cls));
        } catch (error) {

        }

        ObjectPath.ensureExists(this.server, this.servicesKeyPath, {});
        ObjectPath.set(this.server, this.servicesKeyPath + '.' + serviceName, cls);
    }
}