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
const Fs = require("fs-extra");
const Path = require("path");
const Defer = require("promise-defer");
class FileManager {
    constructor(fileHelper, fileValidator) {
        this.fileHelper = fileHelper;
        this.fileValidator = fileValidator;
    }
    removeFile(fileName) {
        Fs.removeSync(Path.join(this.fileHelper.getUploadDir(), fileName));
    }
    upload(file, fileName) {
        const defer = Defer();
        const uploadDir = this.fileHelper.getUploadDir();
        Fs.ensureDirSync(uploadDir);
        const path = this.fileHelper.getUniqueFileName(Path.join(uploadDir, fileName));
        if (!this.fileHelper.hasValidExtensions(path)) {
            setImmediate(() => {
                defer.reject(new Error('Invalid Extensions'));
            });
        }
        else {
            const fileStream = Fs.createWriteStream(path);
            fileStream.on('error', (err) => {
                defer.reject(new Error(err));
            });
            file.pipe(fileStream);
            file.on('end', (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    this.removeFile(Path.parse(path).base);
                    defer.reject(new Error(err));
                }
                else {
                    try {
                        yield this.canUpload(path);
                        defer.resolve(this.fileHelper.getFormattedFileResponse(path));
                    }
                    catch (e) {
                        this.removeFile(Path.parse(path).base);
                        defer.reject(err);
                    }
                }
            }));
        }
        return defer.promise;
    }
    getFormattedFilesResponse() {
        const files = this.fileHelper.getFiles();
        const result = [];
        files.forEach((file) => {
            result.push(this.fileHelper.getFormattedFileResponse(file));
        });
        return result;
    }
    canUpload(file) {
        return this.fileValidator.canUpload(file, this);
    }
    canRemove(file) {
        return this.fileValidator.canRemove(file, this);
    }
    isValid() {
        return this.fileValidator.isValid(this);
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=file.manager.js.map