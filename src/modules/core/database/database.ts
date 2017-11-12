import {ServerExtended} from '../../../bootstrap/services/loader';
import {PaginateModel} from 'mongoose';
import * as Mongoose from 'mongoose';

export interface DBServerExtended extends ServerExtended {

    getModel(name: string): PaginateModel<Mongoose.Document>;

    getProjection(name: string, projection: string): Object;
}

export interface Schema extends Mongoose.Schema {

    server: DBServerExtended;
}