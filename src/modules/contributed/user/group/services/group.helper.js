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
const Boom = require("boom");
class GroupHelper {
    constructor(server) {
        this.server = server;
        this.server.method('attachDefaultUserGroupHandler', (request, reply) => {
            request.payload.userGroup = this.server.getConfig('defaultAuthenticatedUserGroup');
            reply.continue();
        });
        this.server.method('validateUserGroupHandler', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            yield this.validateUserGroup(request, reply);
        }));
    }
    validateUserGroup(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterName = this.server.getRouteConfig(request, 'userGroupFieldName') || 'userGroup';
            if (!request.payload.hasOwnProperty(filterName) || !request.payload[filterName]) {
                return reply.continue();
            }
            let userGroup = request.payload[filterName];
            if (!Array.isArray(userGroup)) {
                userGroup = [userGroup];
            }
            if (userGroup.length) {
                for (let i = 0; i < userGroup.length; i++) {
                    let value = userGroup[i];
                    if (!(yield this.checkWhetherUserGroupExists(value))) {
                        return reply(Boom.badData('Invalid user group: ' + value));
                    }
                }
            }
            return reply.continue();
        });
    }
    checkWhetherUserGroupExists(mart) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.server.getModel('user-group');
            try {
                const result = yield model.findOne({ name: mart }, '_id name');
                if (result) {
                    return true;
                }
            }
            catch (e) {
            }
            return false;
        });
    }
}
exports.GroupHelper = GroupHelper;
//# sourceMappingURL=group.helper.js.map