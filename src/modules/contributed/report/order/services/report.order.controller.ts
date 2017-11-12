import {DBServerExtended} from '../../../../core/database/database';
import {QueryParser} from '../../../../core/query-parser/services/query.parser';
import * as Hapi from 'hapi';

export class ReportOrderController {

    private modelName = 'order';

    constructor(private server: DBServerExtended) {
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

    async countByTypeAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser').parse(request.query, model.schema);

        reply({total: await model.countByType(options.filter, request.params['type'])});
    }

    async summaryAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        reply(await model.summary(options.filter));
    }


    async topUsersByAmountAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.topUsersByAmount(options.filter, options.pageSize));
    }


    async topUsersByCountAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.topUsersByCount(options.filter, options.pageSize));
    }

    async topProductsByAmountAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.topProductsByAmount(options.filter, options.pageSize));
    }


    async topProductsByCountAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.topProductsByCount(options.filter, options.pageSize));
    }

    async summaryStatusAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.summaryByStatus(options.filter));
    }

    async summaryStatusTypeAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply({
            open: await model.summary(options.filter, 'open'),
            processing: await model.summary(options.filter, 'processing'),
            completed: await model.summary(options.filter, 'completed'),
            declined: await model.summary(options.filter, 'declined'),
        });
    }

    async summaryDayAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.summaryByDate('day', options.filter, options.pageSize));
    }

    async summaryMonthAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.summaryByDate('month', options.filter, options.pageSize));
    }

    async summaryYearAction(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        const model: any = this.server.getModel(this.modelName);
        const options = this.server.getService<QueryParser>('queryParser')
            .parse(request.query, model.schema);

        return reply(await model.summaryByDate('year', options.filter, options.pageSize));
    }
}
