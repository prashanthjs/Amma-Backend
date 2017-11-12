import {DBServerExtended} from '../../../../core/database/database';
import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as _ from 'lodash';

export class MartHelper {

    constructor(private server: DBServerExtended) {
        this.server.ext('onPostAuth', (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            this.validateRequestHeader(request, reply);
        });

        this.server.method('addMartFilterHandler', (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            this.addMartFilterHandler(request, reply);
        });
        this.server.method('addDefaultMartHandler', (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            const filterName = this.server.getRouteConfig<string>(request, 'martFieldName') || 'mart';
            request.payload[filterName] = this.getCurrentMarts(request);
            reply.continue();
        });

        this.server.method('validateMartHandler', async (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            const filterName = this.server.getRouteConfig<string>(request, 'martFieldName') || 'mart';
            await this.validateMart(request.payload[filterName], reply);
        });

        this.server.method('checkMartAccessHandler', async (request: Hapi.Request, reply: Hapi.ReplyWithContinue) => {
            await this.checkMartAccessHandler(request, reply);
        });
    }

    validateRequestHeader(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        if (request.auth.isAuthenticated) {
            const user = request.auth.credentials.user;
            const marts = _.get(user, 'mart', null);
            if (marts) {
                const accessMarts = this.getCurrentMarts(request);
                if (accessMarts && accessMarts.length) {
                    accessMarts.forEach((mart) => {
                        if (marts.indexOf(mart) === -1) {
                            return reply(Boom.forbidden('Access denied for mart: ' + mart));
                        }
                    });
                }
            }
        }
        reply.continue();
    }

    addMartFilterHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {

        const filterName = this.server.getRouteConfig<string>(request, 'martFieldName') || 'mart';

        const query: any = request.query;
        const filter = query.filter ? (typeof query.filter === 'string' ? JSON.parse(query.filter) : query.filter) : null;

        const filterWrap = {
            logic: 'and',
            filters: []
        };

        if (filter) {
            filterWrap.filters.push(filter);
        }

        const accessMarts = this.getCurrentMarts(request);
        const martFilter = {
            logic: 'or',
            filters: []
        };
        accessMarts.forEach((mart) => {
            martFilter.filters.push({'field': filterName, 'operator': 'eq', 'value': mart});
        });

        filterWrap.filters.push(martFilter);

        query.filter = filterWrap;

        reply.continue();
    }

    getCurrentMarts(request: Hapi.Request): string[] {
        if (request.auth.isAuthenticated) {
            const user = request.auth.credentials.user;
            const marts = _.get(user, 'mart', null);
            if (marts) {
                const xMarts = _.get(request, 'headers.x-mart', null);
                if (!xMarts) {
                    request.headers['x-mart'] = marts.join(',');
                }
            }
        }

        const xMarts = _.get(request, 'headers.x-mart', null);
        return !xMarts ? [] : xMarts.split(',');
    }

    async validateMart(mart: string[] | string, reply: Hapi.ReplyWithContinue) {
        if (!Array.isArray(mart)) {
            mart = [mart];
        }
        if (mart.length) {
            for (let i = 0; i < mart.length; i++) {
                let value = mart[i];
                if (!await this.checkWhetherMartExists(value)) {
                    return reply(Boom.badData('Invalid mart: ' + value));
                }
            }
        }
        return reply.continue();
    }

    private async checkWhetherMartExists(mart: string): Promise<boolean> {
        const model = this.server.getModel('mart');
        try {
            const result = await model.findOne({name: mart}, '_id name');
            if (result) {
                return true;
            }
        } catch (e) {

        }
        return false;
    }

    async checkMartAccessHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        const modelName = this.server.getRouteConfig<string>(request, 'model');
        const result: any = await this.server.getModel(modelName).findById(request.params.id);
        const filterName = this.server.getRouteConfig<string>(request, 'martFieldName') || 'mart';
        if (!result) {
            return reply.continue();
        }
        const currentMart = this.getCurrentMarts(request);
        console.log(currentMart);
        if (!currentMart.length || !result[filterName] || !result[filterName].length) {
            return reply(Boom.forbidden('Access denied: ' + request.params.id));
        }

        for (let i = 0; i < currentMart.length; i++) {
            if (result[filterName].indexOf(currentMart[i]) !== -1) {
                return reply.continue();
            }
        }

        return reply(Boom.forbidden('Invalid request'));
    }
}
