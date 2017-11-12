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
const Boom = require("boom");
const _ = require("lodash");
class MartHelper {
    constructor(server) {
        this.server = server;
        this.server.ext('onPostAuth', (request, reply) => {
            this.validateRequestHeader(request, reply);
        });
        this.server.method('addMartFilterHandler', (request, reply) => {
            this.addMartFilterHandler(request, reply);
        });
        this.server.method('addDefaultMartHandler', (request, reply) => {
            const filterName = this.server.getRouteConfig(request, 'martFieldName') || 'mart';
            request.payload[filterName] = this.getCurrentMarts(request);
            reply.continue();
        });
        this.server.method('validateMartHandler', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const filterName = this.server.getRouteConfig(request, 'martFieldName') || 'mart';
            yield this.validateMart(request.payload[filterName], reply);
        }));
        this.server.method('checkMartAccessHandler', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkMartAccessHandler(request, reply);
        }));
    }
    validateRequestHeader(request, reply) {
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
    addMartFilterHandler(request, reply) {
        const filterName = this.server.getRouteConfig(request, 'martFieldName') || 'mart';
        const query = request.query;
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
            martFilter.filters.push({ 'field': filterName, 'operator': 'eq', 'value': mart });
        });
        filterWrap.filters.push(martFilter);
        query.filter = filterWrap;
        reply.continue();
    }
    getCurrentMarts(request) {
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
    validateMart(mart, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(mart)) {
                mart = [mart];
            }
            if (mart.length) {
                for (let i = 0; i < mart.length; i++) {
                    let value = mart[i];
                    if (!(yield this.checkWhetherMartExists(value))) {
                        return reply(Boom.badData('Invalid mart: ' + value));
                    }
                }
            }
            return reply.continue();
        });
    }
    checkWhetherMartExists(mart) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel('mart');
            try {
                const result = yield model.findOne({ name: mart }, '_id name');
                if (result) {
                    return true;
                }
            }
            catch (e) {
            }
            return false;
        });
    }
    checkMartAccessHandler(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelName = this.server.getRouteConfig(request, 'model');
            const result = yield this.server.getModel(modelName).findById(request.params.id);
            const filterName = this.server.getRouteConfig(request, 'martFieldName') || 'mart';
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
        });
    }
}
exports.MartHelper = MartHelper;
//# sourceMappingURL=mart.helper.js.map