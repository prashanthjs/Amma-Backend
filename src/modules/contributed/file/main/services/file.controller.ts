import {FileManager} from './file.manager';
import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as Path from 'path';
import {FileManagerFactory} from "./file.manager.factory";
import {DBServerExtended} from '../../../../core/database/database';


export class FileController {

    constructor(private server: DBServerExtended) {

    }

    init() {
        this.server.method('fileListAction', this.getFiles);
        this.server.method('fileUploadAction', this.upload);
        this.server.method('fileRemoveAction', this.removeFile);
        this.server.method('fileViewAction', this.viewFileAction);
    }

    getFiles = (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
        reply({files: this.getFileManager(request.params.type, request.params.token).getFormattedFilesResponse()});
    };

    upload = async (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
        const fileManager = this.getFileManager(request.params.type, request.params.token);
        try {
            reply({
                file: await fileManager.upload(request.payload.file, request.payload.file.hapi.filename || null),
                headers: request.payload.file.hapi.headers || {}
            });
        } catch (error) {
            reply(Boom.badRequest(error));
        }
    };

    removeFile = async (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
        const fileManager = this.getFileManager(request.params.type, request.params.token);
        try {
            await fileManager.canRemove(Path.join(fileManager.fileHelper.getUploadDir(), request.params.fileName));
            await fileManager.removeFile(request.params.fileName);
            reply({success: true});
        } catch (error) {
            return reply({error: error.message, success: false});
        }
    };

    viewFileAction = (request: Hapi.Request, reply: Hapi.ReplyNoContinue) => {
        const fileManager = this.getFileManager(request.params.type, request.params.token);
        const file = Path.join(fileManager.fileHelper.getUploadDir(), request.params.fileName);
        reply.file(file);
    };

    private getFileManager(type: string, token: string): FileManager {
        return this.server.getService<FileManagerFactory>('fileManagerFactory').get(type, token);
    }
}