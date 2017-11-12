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
class ReportUserController {
    constructor(server) {
        this.server = server;
        this.modelName = 'user';
        this.server.method('reportUserDaySummaryAction', (request, reply) => this.summaryDayAction(request, reply));
        this.server.method('reportUserMonthSummaryAction', (request, reply) => this.summaryMonthAction(request, reply));
        this.server.method('reportUserYearSummaryAction', (request, reply) => this.summaryYearAction(request, reply));
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
exports.ReportUserController = ReportUserController;
//# sourceMappingURL=report.user.controller.js.map