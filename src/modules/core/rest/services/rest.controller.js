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
class RestController {
    constructor(server) {
        this.server = server;
        this.server.method(`restListAction`, (request, reply) => this.getList(request, reply));
        this.server.method(`restViewAction`, (request, reply) => this.getById(request, reply));
        this.server.method(`restCreateAction`, (request, reply) => this.create(request, reply));
        this.server.method(`restUpdateAction`, (request, reply) => this.update(request, reply));
        this.server.method(`restRemoveAction`, (request, reply) => this.remove(request, reply));
        this.server.method(`restCountAction`, (request, reply) => this.count(request, reply));
    }
    count(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.getModel(request);
            const options = this.server.getService('queryParser').parse(request.query, model.schema);
            reply({ total: yield model.count(options.filter) });
        });
    }
    getList(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.getModel(request);
            const options = this.getParsedQueryOptions(request);
            const queryOptions = { sort: options.sort, lean: true, page: options.page, limit: options.pageSize };
            const projections = this.getProjections(request);
            if (projections) {
                queryOptions['populate'] = projections;
            }
            reply(yield model.paginate(options.filter, queryOptions));
        });
    }
    getById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.getModel(request);
            const projections = this.getProjections(request);
            let result = yield model.findById(request.params.id, projections);
            let idNameField = request.route.settings.app.idNameField || null;
            if (!result && idNameField) {
                const condition = {};
                condition[idNameField] = request.params.id;
                result = yield model.findOne(condition, projections);
            }
            result ? reply(result) : reply(Boom.notFound());
        });
    }
    create(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getModel(request).create(request.payload);
                reply({ _id: result._id }).code(201);
            }
            catch (error) {
                reply(Boom.badRequest(error));
            }
        });
    }
    update(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getModel(request).findByIdAndUpdate(request.params.id, request.payload);
                result ? reply({ _id: result._id }) : reply(Boom.notFound());
            }
            catch (error) {
                reply(Boom.badRequest(error));
            }
        });
    }
    remove(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getModel(request).findById(request.params.id);
            if (result) {
                if (result.hasOwnProperty('isLocked') && result['isLocked']) {
                    reply(Boom.badRequest('Cannot perform remove'));
                }
                else {
                    yield this.getModel(request).remove({ _id: request.params.id });
                    reply(result);
                }
            }
            else {
                reply(Boom.notFound());
            }
        });
    }
    getParsedQueryOptions(request) {
        const model = this.getModel(request);
        return this.server.getService('queryParser')
            .parse(request.query, model.schema);
    }
    getModel(request) {
        return this.server.getModel(request.route.settings.app.model);
    }
    getProjections(request) {
        return request.route.settings.app.projections || null;
    }
}
exports.RestController = RestController;
//# sourceMappingURL=rest.controller.js.map