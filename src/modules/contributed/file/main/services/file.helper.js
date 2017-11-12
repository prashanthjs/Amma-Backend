"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fs = require("fs-extra");
const Path = require("path");
class FileHelper {
    constructor(server, type, token) {
        this.server = server;
        this.type = type;
        this.token = token;
    }
    getUploadDir() {
        const uploadDir = this.getOptions()['uploadDir'];
        return Path.join(uploadDir, this.token);
    }
    getOptions() {
        return this.server.settings.app.file[this.type];
    }
    getViewUrl(fileName) {
        return this.server.settings.app.serverBaseUrl + Path.join('file', this.type, this.token, fileName);
    }
    getFormattedFileResponse(file) {
        const baseFile = Path.parse(file).base;
        return {
            fileName: baseFile,
            url: this.getViewUrl(baseFile)
        };
    }
    getUniqueFileName(file) {
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
    getFiles() {
        const uploadDir = this.getUploadDir();
        if (Fs.existsSync(uploadDir) && Fs.statSync(uploadDir).isDirectory()) {
            return Fs.readdirSync(uploadDir).filter((file) => {
                file = uploadDir + '/' + file;
                if (!Fs.existsSync(file) || !Fs.statSync(file).isFile()) {
                    return false;
                }
                return this.hasValidExtensions(file);
            });
        }
        else {
            return [];
        }
    }
    hasValidExtensions(file) {
        const parseData = Path.parse(file);
        const ext = parseData.ext;
        const validExtensions = this.getOptions().ext;
        if (validExtensions.indexOf(ext) !== -1) {
            return true;
        }
        return false;
    }
}
exports.FileHelper = FileHelper;
//# sourceMappingURL=file.helper.js.map