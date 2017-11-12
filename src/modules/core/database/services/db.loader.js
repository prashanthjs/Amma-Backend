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
const Mongoose = require("mongoose");
const Joi = require("joi");
const ObjectPath = require("object-path");
const _ = require("lodash");
const Timestamps = require("mongoose-timestamp");
const MongoosePaginate = require("mongoose-paginate");
const MongooseSlugGenerator = require("mongoose-slug-generator");
const MongooseUniqueValidator = require("mongoose-unique-validator");
class DbLoader {
    constructor(server) {
        this.server = server;
    }
    init() {
        this.options = this.server.settings.app.db;
        this.server['getModel'] = (name) => {
            return Mongoose.model(name);
        };
        this.server['getProjection'] = (schemaName, projection) => {
            return ObjectPath.get(this.server, `settings.app.projections.${schemaName}.${projection}`);
        };
        return this.connectDb();
    }
    connectDb() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const options = Joi.attempt(this.options, Joi.object({
                uri: Joi.string().required(),
                options: Joi.object(),
                schema: Joi.object()
            }).required(), 'Invalid DB configs');
            Mongoose.Promise = Promise;
            try {
                this.server.settings.app.dbInstance = yield Mongoose.connect(options.uri, options.options);
                this.server.log('success', 'Connected to MongoDB ' + options.uri + '\n');
                this.loadModels();
                resolve();
            }
            catch (error) {
                this.server.log('error', 'Could not connect to MongoDB! ' + options.uri + '\n');
                reject(error);
            }
        }));
    }
    disconnectDb() {
        return new Promise((resolve, reject) => {
            Mongoose.disconnect((err) => {
                if (err) {
                    this.server.log(err);
                    reject(err);
                }
                else {
                    this.server.log('info', 'Disconnected from MongoDB.');
                    resolve();
                }
            });
        });
    }
    loadModels() {
        _.forEach(this.options.schema, (schema, key) => {
            this.addModel(schema, key);
        });
    }
    addModel(schemaJson, collectionName) {
        const schema = new Mongoose.Schema(schemaJson.schema);
        schema.server = this.server;
        const plugins = schemaJson.plugins || [];
        this.loadPlugins(schema, plugins);
        this.addToServer(collectionName, schemaJson, schema);
    }
    loadPlugins(schema, customPlugins) {
        schema.plugin(Timestamps);
        schema.plugin(MongooseSlugGenerator);
        schema.plugin(MongoosePaginate);
        schema.plugin(MongooseUniqueValidator);
        _.each(customPlugins, (plugin) => {
            if (typeof plugin === 'function') {
                schema.plugin(plugin);
            }
            else {
                schema.plugin(plugin.name, plugin.options);
            }
        });
    }
    addToServer(collectionName, schemaJson, schema) {
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
exports.DbLoader = DbLoader;
//# sourceMappingURL=db.loader.js.map