import * as Fs from 'fs-extra';
import * as Path from 'path';
import {FileHelper, IFileResult} from "./file.helper";
import {FileValidator} from "./file.validator";
import * as Defer from  'promise-defer';

export class FileManager {


    constructor(public fileHelper: FileHelper, public fileValidator: FileValidator) {

    }

    removeFile(fileName: string): void {
        Fs.removeSync(Path.join(this.fileHelper.getUploadDir(), fileName));
    }

    upload(file: Fs.ReadStream, fileName: string): Promise<IFileResult> {
        const defer = Defer();
        const uploadDir = this.fileHelper.getUploadDir();
        Fs.ensureDirSync(uploadDir);
        const path = this.fileHelper.getUniqueFileName(Path.join(uploadDir, fileName));
        if (!this.fileHelper.hasValidExtensions(path)) {
            setImmediate(() => {
                defer.reject(new Error('Invalid Extensions'));
            });

        } else {
            const fileStream = Fs.createWriteStream(path);
            fileStream.on('error', (err) => {
                defer.reject(new Error(err));
            });
            file.pipe(fileStream);
            file.on('end', async (err) => {
                if (err) {
                    this.removeFile(Path.parse(path).base);
                    defer.reject(new Error(err));
                } else {
                    try {
                        await this.canUpload(path);
                        defer.resolve(this.fileHelper.getFormattedFileResponse(path));
                    } catch (e) {
                        this.removeFile(Path.parse(path).base);
                        defer.reject(err);
                    }
                }

            });
        }
        return defer.promise;
    }


    getFormattedFilesResponse(): IFileResult[] {
        const files = this.fileHelper.getFiles();
        const result = [];
        files.forEach((file) => {
            result.push(this.fileHelper.getFormattedFileResponse(file));
        });
        return result;
    }

    canUpload(file: string): Promise<any> {
        return this.fileValidator.canUpload(file, this);
    }

    canRemove(file: string): Promise<any> {
        return this.fileValidator.canRemove(file, this);
    }

    isValid(): Promise<any> {
        return this.fileValidator.isValid(this);
    }
}