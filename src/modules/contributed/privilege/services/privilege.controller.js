"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class PrivilegeController {
    constructor(server) {
        this.server = server;
        this.getList = (request, reply) => {
            const privilegesObject = this.server.getConfig('privilege') || {};
            const privilegeArray = this.parse(privilegesObject);
            reply({
                docs: privilegeArray,
                total: privilegeArray.length
            });
        };
        this.server.method('privilegeListAction', this.getList);
    }
    parse(privileges) {
        const privilegesArray = [];
        _.forEach(privileges, (privilege, key) => {
            if (!privilege.hasOwnProperty('_id')) {
                privilege._id = key;
            }
            privilegesArray.push(privilege);
        });
        return privilegesArray;
    }
}
exports.PrivilegeController = PrivilegeController;
//# sourceMappingURL=privilege.controller.js.map