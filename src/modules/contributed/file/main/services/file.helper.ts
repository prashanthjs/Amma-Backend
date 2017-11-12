import * as Fs from 'fs-extra';
import * as Path from 'path';
import {FileManager} from './file.manager';
import {Server} from 'hapi';

export interface ICallback {
    (err?: any, results?: any): void;
}

export interface IFileUploadCallback {
    (fileManager: FileManager, file: string): Promise<any>;
}

export interface IFileValidateCallback {
    (fileManager: FileManager): Promise<any>;
}

export interface IFileRemoveCallback {
    (fileManager: FileManager, file: string): Promise<any>;
}

export interface IFileResult {
    fileName: string;
    url: string;
}

export interface IOptions {
    uploadDir: string;
    min?: number;
    max?: number;
    ext: string[];
    minFileSize?: number;
    maxFileSize?: number;
    isValid?: string | IFileValidateCallback;
    canUpload?: string | IFileUploadCallback;
    canRemove?: string | IFileRemoveCallback;
}


export class FileHelper {


    constructor(private server: Server, public type: string, public token: string) {

    }

    getUploadDir(): string {
        const uploadDir = this.getOptions()['uploadDir'];
        return Path.join(uploadDir, this.token);
    }

    getOptions(): IOptions {
        return this.server.settings.app.file[this.type];
    }

    getViewUrl(fileName) {
        return this.server.settings.app.serverBaseUrl + Path.join('file', this.type, this.token, fileName);
    }

    getFormattedFileResponse(file): IFileResult {
        const baseFile = Path.parse(file).base;
        return {
            fileName: baseFile,
            url: this.getViewUrl(baseFile)
        };
    }

    getUniqueFileName(file: string): string {
        const parseData = Path.parse(file);
        const dir = parseData.dir;
        let fileName = parseData.name;
        const ext = parseData.ext;
        let i = 1;
        fileName = fileName.replace(/[^a-zA-Z0-9_-]/g, '');
        file = Path.join(dir, fileName + ext);
        while (Fs.existsSync(file)) {
            file = Path.join(dir, fileName + '_' + i + ext);
            i = i + 1;
        }
        return file;
    }

    getFiles(): string[] {
        const uploadDir = this.getUploadDir();
        if (Fs.existsSync(uploadDir) && Fs.statSync(uploadDir).isDirectory()) {
            return Fs.readdirSync(uploadDir).filter((file: string) => {
                file = uploadDir + '/' + file;
                if (!Fs.existsSync(file) || !Fs.statSync(file).isFile()) {
                    return false;
                }
                return this.hasValidExtensions(file);
            });
        } else {
            return [];
        }
    }

    hasValidExtensions(file): boolean {
        const parseData = Path.parse(file);
        const ext = parseData.ext;
        const validExtensions = this.getOptions().ext;
        if (validExtensions.indexOf(ext) !== -1) {
            return true;
        }
        return false;
    }
}