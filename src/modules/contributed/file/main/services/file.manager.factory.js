"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_helper_1 = require("./file.helper");
const file_validator_1 = require("./file.validator");
const file_manager_1 = require("./file.manager");
class FileManagerFactory {
    constructor(server) {
        this.server = server;
    }
    get(type, token) {
        const fileHelper = new file_helper_1.FileHelper(this.server, type, token);
        return new file_manager_1.FileManager(fileHelper, new file_validator_1.FileValidator(this.server, fileHelper));
    }
}
exports.FileManagerFactory = FileManagerFactory;
//# sourceMappingURL=file.manager.factory.js.map