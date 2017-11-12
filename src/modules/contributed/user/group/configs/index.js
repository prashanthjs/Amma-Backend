"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_group_schema_1 = require("./user.group.schema");
const user_group_route_validation_1 = require("./user.group.route.validation");
const group_helper_1 = require("../services/group.helper");
exports.config = {
    app: {
        db: {
            schema: {
                'user-group': user_group_schema_1.UserGroupSchema
            }
        },
        privilege: {
            'view-user-group-basic-privilege': {
                group: 'User group',
                title: 'View user group basic'
            },
            'view-user-group-count-privilege': {
                group: 'User group',
                title: 'View user group count'
            },
            'create-user-group-basic-privilege': {
                group: 'User group',
                title: 'Create user group basic'
            },
            'update-user-group-basic-privilege': {
                group: 'User group',
                title: 'Update user group basic'
            },
            'remove-user-group-basic-privilege': {
                group: 'User group',
                title: 'Remove user group basic'
            }
        }
    },
    services: {
        groupHelper: group_helper_1.GroupHelper
    },
    routes: {
        userGroupList: {
            method: 'GET',
            path: '/user-groups',
            config: {
                app: {
                    model: 'user-group',
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-user-group-basic-privilege': 'view-user-group-basic-privilege'
                    }
                }
            }
        },
        userGroupView: {
            method: 'GET',
            path: '/user-groups/{id}',
            config: {
                app: {
                    model: 'user-group',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-user-group-basic-privilege': 'view-user-group-basic-privilege'
                    }
                }
            }
        },
        userGroupCount: {
            method: 'GET',
            path: '/user-group/count',
            config: {
                app: {
                    model: 'user-group',
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-user-group-count-privilege': 'view-user-group-count-privilege'
                    }
                }
            }
        },
        userGroupCreate: {
            method: 'POST',
            path: '/user-groups',
            config: {
                app: {
                    model: 'user-group',
                },
                handler: 'restCreateAction',
                validate: {
                    payload: user_group_route_validation_1.Payload
                },
            }
        },
        userGroupUpdate: {
            method: 'PUT',
            path: '/user-groups/{id}',
            config: {
                app: {
                    model: 'user-group',
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: user_group_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'update-user-group-basic-privilege': 'update-user-group-basic-privilege'
                    }
                }
            }
        },
        userGroupRemove: {
            method: 'DELETE',
            path: '/user-groups/{id}',
            config: {
                app: {
                    model: 'user-group',
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-user-group-basic-privilege': 'remove-user-group-basic-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map