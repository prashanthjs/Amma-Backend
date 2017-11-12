"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const UserGroupSchema = {
    schema: {
        userGroup: String
    }
};
const UserGroupPayload = {
    userGroup: Joi.string().required(),
};
exports.config = {
    app: {
        db: {
            schema: {
                user: UserGroupSchema
            },
        },
        defaultUnAuthenticatedUserGroup: 'guest',
        defaultAuthenticatedUserGroup: 'user',
        privilege: {
            'update-user-user-group-privilege': {
                group: 'User',
                title: 'Update user group'
            },
        }
    },
    routes: {
        userCreate: { config: { pre: { attachDefaultUserGroupHandler: { method: 'attachDefaultUserGroupHandler' } } } },
        userUserGroupUpdate: {
            method: 'PUT',
            path: '/users/{id}/group',
            config: {
                app: {
                    model: 'user'
                },
                pre: { validateUserGroupHandler: { method: 'validateUserGroupHandler' } },
                handler: 'restUpdateAction',
                validate: {
                    payload: UserGroupPayload
                },
                auth: {
                    scope: {
                        'update-user-user-group-privilege': 'update-user-user-group-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map