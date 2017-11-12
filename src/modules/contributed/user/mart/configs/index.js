"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const UserMartSchema = {
    schema: {
        mart: [String]
    }
};
const UserMartPayload = {
    mart: Joi.array().items(Joi.string()).required(),
};
exports.config = {
    app: {
        db: {
            schema: {
                user: UserMartSchema,
            },
        },
        privilege: {
            'update-user-mart-privilege': {
                group: 'User',
                title: 'Update user mart'
            },
        }
    },
    routes: {
        userList: {
            config: {
                pre: { addMartFilterHandler: { method: 'addMartFilterHandler' } },
            }
        },
        userCount: {
            config: {
                pre: { addMartFilterHandler: { method: 'addMartFilterHandler' } },
            }
        },
        userCreate: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addDefaultMartHandler' } },
            }
        },
        userRemove: {
            config: {
                pre: { checkMartAccessHandler: { method: 'checkMartAccessHandler' } }
            }
        },
        userView: {
            config: {
                pre: { checkMartAccessHandler: { method: 'checkMartAccessHandler' } }
            }
        },
        userChangePassword: {
            config: {
                pre: { checkMartAccessHandler: { method: 'checkMartAccessHandler' } }
            }
        },
        userMartUpdate: {
            method: 'PUT',
            path: '/users/{id}/mart',
            config: {
                app: {
                    model: 'user'
                },
                pre: { validateMartHandler: { method: 'validateMartHandler' } },
                handler: 'restUpdateAction',
                validate: {
                    payload: UserMartPayload
                },
                auth: {
                    scope: {
                        'update-user-mart-privilege': 'update-user-mart-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map