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
const _ = require("lodash");
const JWT = require("jsonwebtoken");
class UserTokenService {
    constructor(server) {
        this.server = server;
    }
    init() {
        this.authConfig = this.server.getConfig('auth');
        this.server.auth.strategy('defaultLogin', 'jwt', {
            key: this.authConfig.key,
            verifyOptions: this.authConfig.verifyOptions,
            validateFunc: (request, decodedToken, callback) => __awaiter(this, void 0, void 0, function* () {
                yield this.validate(request, decodedToken, callback);
            })
        });
        this.server.auth.default('defaultLogin');
    }
    validate(request, decodedToken, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!decodedToken['userId']) {
                return callback(null, false);
            }
            let user = {};
            if (decodedToken['userId'] === 'guest') {
                user = { _id: 'guest' };
            }
            else {
                user = yield this.server.getModel('user').findById(decodedToken['userId']);
            }
            if (!user) {
                return callback(null, false);
            }
            let userGroup = _.get(user, 'userGroup', this.server.getConfig('defaultUnAuthenticatedUserGroup'));
            const resultScope = yield this.server.getModel('user-group').findOne({ name: userGroup });
            return callback(null, true, { user: user, scope: _.get(resultScope, 'privileges', []) });
        });
    }
    signIn(id) {
        return JWT.sign({ userId: id }, this.authConfig.key, this.authConfig.verifyOptions);
    }
}
exports.UserTokenService = UserTokenService;
//# sourceMappingURL=user.token.service.js.map