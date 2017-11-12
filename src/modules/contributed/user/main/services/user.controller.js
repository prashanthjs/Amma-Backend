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
class UserController {
    constructor(server) {
        this.server = server;
        this.server.method('userLoginAction', (request, reply) => this.login(request, reply));
        this.server.method('userTokenGenerateAction', (request, reply) => this.getToken(request, reply));
    }
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTokenService = this.server.getService('userTokenService');
            try {
                let result = yield this.authenticate(request.payload.username, request.payload.password);
                if (result) {
                    return reply({
                        token: userTokenService.signIn(result._id),
                        _id: result._id
                    });
                }
            }
            catch (e) {
                this.server.log(e);
            }
            return reply({ token: false });
        });
    }
    getToken(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTokenService = this.server.getService('userTokenService');
            return reply({
                token: userTokenService.signIn('guest'),
            });
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPasswordService = this.server.getService('userPasswordService');
            const model = this.server.getModel('user');
            const user = yield model.findOne({
                $or: [
                    { username: username },
                    { email: username }
                ]
            }, '+password').exec();
            if (!user) {
                return false;
            }
            const result = yield userPasswordService.validatePassword(password, user.password);
            return result ? user : false;
        });
    }
    ;
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map