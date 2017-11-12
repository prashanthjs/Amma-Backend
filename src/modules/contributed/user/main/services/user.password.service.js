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
const Bcrypt = require("bcrypt");
class UserPasswordService {
    constructor(server) {
        this.server = server;
        this.server.method('userHashPassword', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            request.payload.password = yield this.hashPassword(request.payload.password);
            reply({});
        }));
    }
    hashPassword(password) {
        const salt = this.server.getConfig('user.hash') || 10;
        return Bcrypt.hash(password, salt);
    }
    validatePassword(password, hashPassword) {
        return Bcrypt.compare(password, hashPassword);
    }
}
exports.UserPasswordService = UserPasswordService;
//# sourceMappingURL=user.password.service.js.map