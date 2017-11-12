import * as Hapi from 'hapi';
import * as Boom from 'boom';
import {IParseResult, QueryParser} from '../../query-parser/services/query.parser';
import {DBServerExtended} from '../../database/database';
import {PaginateModel} from 'mongoose';
import * as Mongoose from 'mongoose';

export class RestController {

  constructor(private server: DBServerExtended) {
    this.server.method(`restListAction`, (request, reply) => this.getList(request, reply));
    this.server.method(`restViewAction`, (request, reply) => this.getById(request, reply));
    this.server.method(`restCreateAction`, (request, reply) => this.create(request, reply));
    this.server.method(`restUpdateAction`, (request, reply) => this.update(request, reply));
    this.server.method(`restRemoveAction`, (request, reply) => this.remove(request, reply));
    this.server.method(`restCountAction`, (request, reply) => this.count(request, reply));
  }

  async count(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const model = this.getModel(request);
    const options = this.server.getService<QueryParser>('queryParser').parse(request.query, model.schema);
    reply({total: await model.count(options.filter)});
  }

  async getList(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const model = this.getModel(request);
    const options = this.getParsedQueryOptions(request);
    const queryOptions = {sort: options.sort, lean: true, page: options.page, limit: options.pageSize};
    const projections = this.getProjections(request);

    if (projections) {
      queryOptions['populate'] = projections;
    }

    reply(await model.paginate(options.filter, queryOptions));
  }

  async getById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const model = this.getModel(request);
    const projections = this.getProjections(request);
    let result = await model.findById(request.params.id, projections);

    let idNameField = request.route.settings.app.idNameField || null;

    if (!result && idNameField) {
      const condition = {};
      condition[idNameField] = request.params.id;
      result = await model.findOne(condition, projections);
    }

    result ? reply(result) : reply(Boom.notFound());
  }

  async create(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    try {
      const result: any = await this.getModel(request).create(request.payload);
      reply({_id: result._id}).code(201);
    } catch (error) {
      reply(Boom.badRequest(error));
    }
  }

  async update(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    try {
      const result = await this.getModel(request).findByIdAndUpdate(request.params.id, request.payload);
      result ? reply({_id: result._id}) : reply(Boom.notFound());
    } catch (error) {
      reply(Boom.badRequest(error));
    }
  }

  async remove(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const result: Object = await this.getModel(request).findById(request.params.id);
    if (result) {
      if (result.hasOwnProperty('isLocked') && result['isLocked']) {
        reply(Boom.badRequest('Cannot perform remove'));
      } else {
        await this.getModel(request).remove({_id: request.params.id});
        reply(result);
      }
    } else {
      reply(Boom.notFound());
    }
  }

  getParsedQueryOptions(request: Hapi.Request): IParseResult {
    const model: any = this.getModel(request);
    return this.server.getService<QueryParser>('queryParser')
      .parse(request.query, model.schema);
  }

  getModel(request: Hapi.Request): PaginateModel<Mongoose.Document> {
    return this.server.getModel(request.route.settings.app.model);
  }

  getProjections(request: Hapi.Request): string {
    return request.route.settings.app.projections || null;
  }
}