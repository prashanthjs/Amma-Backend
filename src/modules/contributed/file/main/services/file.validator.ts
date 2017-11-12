import * as Fs from 'fs-extra';
import * as ObjectPath from 'object-path';
import {FileHelper, ICallback} from "./file.helper";
import {Server} from "hapi";
import {FileManager} from "./file.manager";

export class FileValidator {


    constructor(private server: Server, private fileHelper: FileHelper) {

    }

    canUpload(file: string, fileManager: FileManager): Promise<any> {
        const stat = Fs.statSync(file);
        const options = this.fileHelper.getOptions();
        return new Promise(async (resolve, reject) => {
            if (ObjectPath.has(options, 'minFileSize') && options.minFileSize > stat.size) {
                return reject(new Error('Invalid File Min Size'));
            }

            if (ObjectPath.has(options, 'maxFileSize') && options.maxFileSize < stat.size) {
                return reject(new Error('Invalid File Max Size'));
            }

            if (ObjectPath.has(options, 'max') && options.max < this.fileHelper.getFiles().length) {
                return reject(new Error('Max files Limit exceeded'));
            }

            if (ObjectPath.has(options, 'canUpload')) {
                const canUpload = options.canUpload;
                if (typeof canUpload === 'string') {
                    await this.server.methods[canUpload](fileManager, file);
                } else {
                    await canUpload(fileManager, file);
                }
            }
            resolve();
        });

    }


    isValid(fileManager: FileManager): Promise<any> {
        const options = this.fileHelper.getOptions();
        return new Promise(async (resolve, reject) => {

            if (ObjectPath.has(options, 'min') && options.min > this.fileHelper.getFiles().length) {
                return reject(new Error('Min files Limit not met'));
            }

            if (ObjectPath.has(options, 'max') && options.max < this.fileHelper.getFiles().length) {
                return reject(new Error('Max files Limit exceeded'));
            }

            if (ObjectPath.has(options, 'isValid')) {
                const isValid = options.isValid;
                if (typeof isValid === 'string') {
                    await this.server.methods[isValid](fileManager);
                } else {
                    await isValid(fileManager);
                }
            }
            resolve();
        });
    }

    canRemove(file, fileManager: FileManager): Promise<any> {
        const options = this.fileHelper.getOptions();
        return new Promise(async (resolve, reject) => {
            if (ObjectPath.has(options, 'canRemove')) {
                const canRemove = options.canRemove;
                if (typeof canRemove === 'string') {
                    await this.server.methods[canRemove](fileManager, file);
                } else {
                    await canRemove(fileManager, file);
                }
            }
            resolve();
        });
    }
}
