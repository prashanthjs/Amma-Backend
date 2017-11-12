import * as Joi from 'joi';

const UserMartSchema = {
    schema: {
        mart: [String]
    }
};
const UserMartPayload = {
    mart: Joi.array().items(Joi.string()).required(),
};
export const config = {
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
                pre: {addMartFilterHandler: {method: 'addMartFilterHandler'}},
            }
        },
        userCount: {
            config: {
                pre: {addMartFilterHandler: {method: 'addMartFilterHandler'}},
            }
        },
        userCreate: {
            config: {
                pre: {addDefaultMartHandler: {method: 'addDefaultMartHandler'}},
            }
        },
        userRemove: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        userView: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        userChangePassword: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        userMartUpdate: {
            method: 'PUT',
            path: '/users/{id}/mart',
            config: {
                app: {
                    model: 'user'
                },
                pre: {validateMartHandler: {method: 'validateMartHandler'}},
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