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
const Bootstrap = require("./bootstrap/index");
const Glue = require("glue");
const AppConfig = require("./config/manifest");
const CorsHeaders = require("hapi-cors-headers");
const modules_1 = require("./config/modules");
const options = {
    relativeTo: __dirname
};
Glue.compose(AppConfig, options, (err, server) => __awaiter(this, void 0, void 0, function* () {
    if (err) {
        server.log('info', err);
        throw err;
    }
    server.ext('onPreResponse', CorsHeaders);
    try {
        yield Bootstrap(server, modules_1.modules);
        yield server.start();
    }
    catch (error) {
        server.log('info', error);
    }
    server.log('info', 'server started');
}));
//# sourceMappingURL=index.js.map