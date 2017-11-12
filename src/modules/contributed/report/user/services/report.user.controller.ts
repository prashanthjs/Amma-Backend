import {DBServerExtended} from '../../../../core/database/database';
import {QueryParser} from '../../../../core/query-parser/services/query.parser';
import * as Hapi from 'hapi';

export class ReportUserController {

    private modelName = 'user';

    constructor(private server: DBServerExtended) {
        this.server.method('reportUserDaySummaryAction', (request, reply) => this.summaryDayAction(request, reply));
        this.server.method('reportUserMonthSummaryAction', (request, reply) => this.summaryMonthAction(request, reply));
        this.server.method('reportUserYearSummaryAction', (request, reply) => this.summaryYearAction(request, reply));
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
