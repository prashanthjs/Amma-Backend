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
const Path = require("path");
class FileController {
    constructor(server) {
        this.server = server;
        this.getFiles = (request, reply) => {
            reply({ files: this.getFileManager(request.params.type, request.params.token).getFormattedFilesResponse() });
        };
        this.upload = (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const fileManager = this.getFileManager(request.params.type, request.params.token);
            try {
                reply({
                    file: yield fileManager.upload(request.payload.file, request.payload.file.hapi.filename || null),
                    headers: request.payload.file.hapi.headers || {}
                });
            }
            catch (error) {
                reply(Boom.badRequest(error));
            }
        });
        this.removeFile = (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const fileManager = this.getFileManager(request.params.type, request.params.token);
            try {
                yield fileManager.canRemove(Path.join(fileManager.fileHelper.getUploadDir(), request.params.fileName));
                yield fileManager.removeFile(request.params.fileName);
                reply({ success: true });
            }
            catch (error) {
                return reply({ error: error.message, success: false });
            }
        });
        this.viewFileAction = (request, reply) => {
            const fileManager = this.getFileManager(request.params.type, request.params.token);
            const file = Path.join(fileManager.fileHelper.getUploadDir(), request.params.fileName);
            reply.file(file);
        };
    }
    init() {
        this.server.method('fileListAction', this.getFiles);
        this.server.method('fileUploadAction', this.upload);
        this.server.method('fileRemoveAction', this.removeFile);
        this.server.method('fileViewAction', this.viewFileAction);
    }
    getFileManager(type, token) {
        return this.server.getService('fileManagerFactory').get(type, token);
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map