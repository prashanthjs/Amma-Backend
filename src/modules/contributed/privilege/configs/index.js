"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const privilege_controller_1 = require("../services/privilege.controller");
exports.config = {
    app: {
        'privilege': {
            'view-privilege': {
                group: 'Privilege',
                title: 'View Privilege',
                description: 'view Privilege'
            },
        }
    },
    services: {
        'privilegeController': privilege_controller_1.PrivilegeController
    },
    routes: {
        privilegeList: {
            method: 'GET',
            path: '/privileges',
            config: {
                handler: 'privilegeListAction',
                auth: {
                    scope: {
                        'view-privilege': 'view-privilege'
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=index.js.map