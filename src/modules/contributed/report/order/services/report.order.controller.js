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
class ReportOrderController {
    constructor(server) {
        this.server = server;
        this.modelName = 'order';
        this.server.method('reportOrderCountByTypeAction', (request, reply) => this.countByTypeAction(request, reply));
        this.server.method('reportOrderSummaryAction', (request, reply) => this.summaryAction(request, reply));
        this.server.method('reportOrderTopUsersByAmountAction', (request, reply) => this.topUsersByAmountAction(request, reply));
        this.server.method('reportOrderTopUsersByCountAction', (request, reply) => this.topUsersByCountAction(request, reply));
        this.server.method('reportOrderTopProductsByAmountAction', (request, reply) => this.topProductsByAmountAction(request, reply));
        this.server.method('reportOrderTopProductsByCountAction', (request, reply) => this.topProductsByCountAction(request, reply));
        this.server.method('reportOrderStatusSummaryAction', (request, reply) => this.summaryStatusAction(request, reply));
        this.server.method('reportOrderStatusTypeSummaryAction', (request, reply) => this.summaryStatusTypeAction(request, reply));
        this.server.method('reportOrderDaySummaryAction', (request, reply) => this.summaryDayAction(request, reply));
        this.server.method('reportOrderMonthSummaryAction', (request, reply) => this.summaryMonthAction(request, reply));
        this.server.method('reportOrderYearSummaryAction', (request, reply) => this.summaryYearAction(request, reply));
    }
    countByTypeAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser').parse(request.query, model.schema);
            reply({ total: yield model.countByType(options.filter, request.params['type']) });
        });
    }
    summaryAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            reply(yield model.summary(options.filter));
        });
    }
    topUsersByAmountAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.topUsersByAmount(options.filter, options.pageSize));
        });
    }
    topUsersByCountAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.topUsersByCount(options.filter, options.pageSize));
        });
    }
    topProductsByAmountAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.topProductsByAmount(options.filter, options.pageSize));
        });
    }
    topProductsByCountAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.topProductsByCount(options.filter, options.pageSize));
        });
    }
    summaryStatusAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.summaryByStatus(options.filter));
        });
    }
    summaryStatusTypeAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply({
                open: yield model.summary(options.filter, 'open'),
                processing: yield model.summary(options.filter, 'processing'),
                completed: yield model.summary(options.filter, 'completed'),
                declined: yield model.summary(options.filter, 'declined'),
            });
        });
    }
    summaryDayAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.summaryByDate('day', options.filter, options.pageSize));
        });
    }
    summaryMonthAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.summaryByDate('month', options.filter, options.pageSize));
        });
    }
    summaryYearAction(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel(this.modelName);
            const options = this.server.getService('queryParser')
                .parse(request.query, model.schema);
            return reply(yield model.summaryByDate('year', options.filter, options.pageSize));
        });
    }
}
exports.ReportOrderController = ReportOrderController;
//# sourceMappingURL=report.order.controller.js.map