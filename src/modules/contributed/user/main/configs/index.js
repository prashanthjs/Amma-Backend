"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const user_route_validation_1 = require("./user.route.validation");
const user_controller_1 = require("../services/user.controller");
const user_password_service_1 = require("../services/user.password.service");
const user_token_service_1 = require("../services/user.token.service");
const user_service_1 = require("../services/user.service");
exports.config = {
    app: {
        auth: {
            key: 'SECRETKEYqL0XjqtyD2bmuC6pAQKD1QxLmKx1IiIq',
            verifyOptions: {}
        },
        db: {
            schema: {
                user: user_schema_1.UserSchema
            }
        },
        file: {
            user: {
                uploadDir: __dirname + '/../' + 'storage/user',
                min: 0,
                max: 3,
                ext: ['.jpg', '.jpeg', '.png', '.gif'],
                minFileSize: 1048576 / 20,
                maxFileSize: 1048576 * 10
            }
        },
        privilege: {
            'view-user-basic-privilege': {
                group: 'User',
                title: 'View user basic'
            },
            'view-user-my-profile-privilege': {
                group: 'User',
                title: 'View own user profile'
            },
            'view-user-count-privilege': {
                group: 'User',
                title: 'View user count'
            },
            'create-user-basic-privilege': {
                group: 'User',
                title: 'Create user basic'
            },
            'update-user-basic-privilege': {
                group: 'User',
                title: 'Update user basic'
            },
            'update-user-my-profile-privilege': {
                group: 'User',
                title: 'Update own user profile'
            },
            'update-user-password-privilege': {
                group: 'User',
                title: 'Update user password'
            },
            'update-user-my-password-privilege': {
                group: 'User',
                title: 'Update own user password'
            },
            'remove-user-basic-privilege': {
                group: 'User',
                title: 'Remove user basic'
            }
        }
    },
    services: {
        userController: user_controller_1.UserController,
        userPasswordService: user_password_service_1.UserPasswordService,
        userTokenService: user_token_service_1.UserTokenService,
        userService: user_service_1.UserService
    },
    routes: {
        userList: {
            method: 'GET',
            path: '/users',
            config: {
                app: {
                    model: 'user',
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-user-basic-privilege': 'view-user-basic-privilege'
                    }
                }
            }
        },
        userView: {
            method: 'GET',
            path: '/users/{id}',
            config: {
                app: {
                    model: 'user',
                    idNameField: 'username'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-user-basic-privilege': 'view-user-basic-privilege'
                    }
                }
            }
        },
        userMyProfile: {
            method: 'GET',
            path: '/users/my-profile',
            config: {
                app: {
                    model: 'user',
                },
                pre: {
                    attachUserIdHandler: { method: 'attachUserIdHandler' }
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-user-my-profile-privilege': 'view-user-my-profile-privilege'
                    }
                }
            }
        },
        userCount: {
            method: 'GET',
            path: '/users/count',
            config: {
                app: {
                    model: 'user'
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-user-count-privilege': 'view-user-count-privilege'
                    }
                }
            }
        },
        userCreate: {
            method: 'POST',
            path: '/users',
            config: {
                app: {
                    model: 'user'
                },
                handler: 'restCreateAction',
                pre: {
                    userHashPassword: { method: 'userHashPassword' }
                },
                validate: {
                    payload: user_route_validation_1.CreatePayload
                },
                auth: {
                    scope: {
                        'create-user-basic-privilege': 'create-user-basic-privilege'
                    }
                }
            }
        },
        userUpdate: {
            method: 'PUT',
            path: '/users/{id}',
            config: {
                app: {
                    model: 'user'
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: user_route_validation_1.UpdatePayload
                },
                auth: {
                    scope: {
                        'update-user-basic-privilege': 'update-user-basic-privilege'
                    }
                }
            }
        },
        userUpdateMyProfile: {
            method: 'PUT',
            path: '/users/my-profile/edit',
            config: {
                app: {
                    model: 'user'
                },
                pre: {
                    attachUserIdHandler: { method: 'attachUserIdHandler' }
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: user_route_validation_1.UpdatePayload
                },
                auth: {
                    scope: {
                        'update-user-my-profile-privilege': 'update-user-my-profile-privilege'
                    }
                }
            }
        },
        userRemove: {
            method: 'DELETE',
            path: '/users/{id}',
            config: {
                app: {
                    model: 'user'
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-user-basic-privilege': 'remove-user-basic-privilege'
                    }
                }
            }
        },
        userChangePassword: {
            method: 'PUT',
            path: '/users/{id}/change-password',
            config: {
                app: {
                    model: 'user'
                },
                pre: {
                    userHashPassword: { method: 'userHashPassword' }
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: user_route_validation_1.ChangePasswordPayload
                },
                auth: {
                    scope: {
                        'update-user-password-privilege': 'update-user-password-privilege'
                    }
                }
            }
        },
        userChangeMyProfilePassword: {
            method: 'PUT',
            path: '/users/my-profile/change-password',
            config: {
                app: {
                    model: 'user'
                },
                pre: {
                    attachUserIdHandler: { method: 'attachUserIdHandler' }
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: user_route_validation_1.ChangePasswordPayload
                },
                auth: {
                    scope: {
                        'update-user-my-password-privilege': 'update-user-my-password-privilege'
                    }
                }
            }
        },
        userLogin: {
            method: 'POST',
            path: '/users/authenticate',
            config: {
                app: {
                    model: 'user'
                },
                handler: 'userLoginAction',
                validate: {
                    payload: user_route_validation_1.UserLoginPayload
                },
                auth: false
            }
        },
        userTokenGenerate: {
            method: 'GET',
            path: '/users/token/generate',
            config: {
                handler: 'userTokenGenerateAction',
                auth: false
            }
        },
    }
};
//# sourceMappingURL=index.js.map