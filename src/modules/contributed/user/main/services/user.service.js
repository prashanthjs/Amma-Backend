"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class UserService {
    constructor(server) {
        this.server = server;
    }
    init() {
        this.server.method('attachUserIdHandler', (request, reply) => {
            request.params.id = _.get(request.auth.credentials, 'user.id', null);
            reply.continue();
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map