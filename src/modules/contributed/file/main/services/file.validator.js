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
const ObjectPath = require("object-path");
class FileValidator {
    constructor(server, fileHelper) {
        this.server = server;
        this.fileHelper = fileHelper;
    }
    canUpload(file, fileManager) {
        const stat = Fs.statSync(file);
        const options = this.fileHelper.getOptions();
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    yield this.server.methods[canUpload](fileManager, file);
                }
                else {
                    yield canUpload(fileManager, file);
                }
            }
            resolve();
        }));
    }
    isValid(fileManager) {
        const options = this.fileHelper.getOptions();
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (ObjectPath.has(options, 'min') && options.min > this.fileHelper.getFiles().length) {
                return reject(new Error('Min files Limit not met'));
            }
            if (ObjectPath.has(options, 'max') && options.max < this.fileHelper.getFiles().length) {
                return reject(new Error('Max files Limit exceeded'));
            }
            if (ObjectPath.has(options, 'isValid')) {
                const isValid = options.isValid;
                if (typeof isValid === 'string') {
                    yield this.server.methods[isValid](fileManager);
                }
                else {
                    yield isValid(fileManager);
                }
            }
            resolve();
        }));
    }
    canRemove(file, fileManager) {
        const options = this.fileHelper.getOptions();
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (ObjectPath.has(options, 'canRemove')) {
                const canRemove = options.canRemove;
                if (typeof canRemove === 'string') {
                    yield this.server.methods[canRemove](fileManager, file);
                }
                else {
                    yield canRemove(fileManager, file);
                }
            }
            resolve();
        }));
    }
}
exports.FileValidator = FileValidator;
//# sourceMappingURL=file.validator.js.map