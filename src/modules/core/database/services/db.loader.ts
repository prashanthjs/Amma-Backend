import * as Mongoose from 'mongoose';
import * as Joi from 'joi';
import * as ObjectPath from 'object-path';
import {Server} from 'hapi';
import * as _ from 'lodash';

import * as Timestamps from 'mongoose-timestamp';
import * as MongoosePaginate from 'mongoose-paginate';
import * as MongooseSlugGenerator from 'mongoose-slug-generator';
import * as MongooseUniqueValidator from 'mongoose-unique-validator';
import {Schema} from '../database';

export interface IDbOptions {
    uri: string;
    options?: Object;
    schema?: {
        schema: Object;
        projections?: Object;
        plugins: Object[];
    };
}

export class DbLoader {

    private options: IDbOptions;

    constructor(private server: Server) {

    }

    init(): Promise<any> {
        this.options = this.server.settings.app.db;
        this.server['getModel'] = (name: string) => {
            return Mongoose.model(name);
        };

        this.server['getProjection'] = (schemaName: string, projection: string) => {
            return ObjectPath.get(this.server, `settings.app.projections.${schemaName}.${projection}`);
        };
        return this.connectDb();
    }

    connectDb(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const options = Joi.attempt(this.options, Joi.object({
                uri: Joi.string().required(),
                options: Joi.object(),
                schema: Joi.object()
            }).required(), 'Invalid DB configs');

            (<any>Mongoose).Promise = Promise;
            try {
                this.server.settings.app.dbInstance = await Mongoose.connect(options.uri, options.options);
                this.server.log('success', 'Connected to MongoDB ' + options.uri + '\n');
                this.loadModels();
                resolve();
            } catch (error) {
                this.server.log('error', 'Could not connect to MongoDB! ' + options.uri + '\n');
                reject(error);
            }
        });
    }

    disconnectDb(): Promise<any> {
        return new Promise((resolve, reject) => {
            Mongoose.disconnect((err) => {
                if (err) {
                    this.server.log(err);
                    reject(err);
                } else {
                    this.server.log('info', 'Disconnected from MongoDB.');
                    resolve();
                }
            });
        });
    }

    private loadModels() {
        _.forEach(this.options.schema, (schema, key: string) => {
            this.addModel(schema, key);
        });
    }

    private addModel(schemaJson, collectionName) {
        const schema: any = new Mongoose.Schema(schemaJson.schema);
        schema.server = this.server;

        const plugins = schemaJson.plugins || [];
        this.loadPlugins(schema, plugins);
        this.addToServer(collectionName, schemaJson, schema);
    }

    private loadPlugins(schema: Schema, customPlugins: Object) {
        schema.plugin(Timestamps);
        schema.plugin(MongooseSlugGenerator);
        schema.plugin(MongoosePaginate);
        schema.plugin(MongooseUniqueValidator);
        _.each(customPlugins, (plugin) => {
            if (typeof plugin === 'function') {
                schema.plugin(plugin);
            } else {
                schema.plugin(plugin.name, plugin.options);
            }
        });
    }

    private addToServer(collectionName, schemaJson, schema) {
        if (!ObjectPath.has(this.server.settings.app, 'model')) {
            this.server.settings.app.model = {};
        }
        if (!ObjectPath.has(this.server.settings.app, 'projections')) {
            this.server.settings.app.projections = {};
        }
        this.server.settings.app.model[collectionName] = Mongoose.model(collectionName, schema);
        this.server.settings.app.projections[collectionName] = schemaJson.projections;
    }
}