"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mart_schema_1 = require("./mart.schema");
const mart_route_validation_1 = require("./mart.route.validation");
const mart_helper_1 = require("../services/mart.helper");
exports.config = {
    app: {
        db: {
            schema: {
                mart: mart_schema_1.MartSchema
            }
        },
        file: {
            mart: {
                uploadDir: __dirname + '/../' + 'storage',
                min: 0,
                max: 3,
                ext: ['.jpg', '.jpeg', '.png', '.gif'],
                minFileSize: 1048576 / 20,
                maxFileSize: 1048576 * 10
            }
        },
        privilege: {
            'view-mart-basic-privilege': {
                group: 'Mart',
                title: 'View mart basic'
            },
            'view-mart-count-privilege': {
                group: 'Mart',
                title: 'View mart count'
            },
            'create-mart-basic-privilege': {
                group: 'Mart',
                title: 'Create mart basic'
            },
            'update-mart-basic-privilege': {
                group: 'Mart',
                title: 'Update mart basic'
            },
            'remove-mart-basic-privilege': {
                group: 'Mart',
                title: 'Remove mart basic'
            }
        }
    },
    services: {
        martHelper: mart_helper_1.MartHelper
    },
    routes: {
        martList: {
            method: 'GET',
            path: '/marts',
            config: {
                app: {
                    model: 'mart'
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-mart-basic-privilege': 'view-mart-basic-privilege'
                    }
                }
            }
        },
        martView: {
            method: 'GET',
            path: '/marts/{id}',
            config: {
                app: {
                    model: 'mart',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-mart-basic-privilege': 'view-mart-basic-privilege'
                    }
                }
            }
        },
        martCount: {
            method: 'GET',
            path: '/marts/count',
            config: {
                app: {
                    model: 'mart'
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-mart-count-privilege': 'view-mart-count-privilege'
                    }
                }
            }
        },
        martCreate: {
            method: 'POST',
            path: '/marts',
            config: {
                app: {
                    model: 'mart'
                },
                handler: 'restCreateAction',
                validate: {
                    payload: mart_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'create-mart-basic-privilege': 'create-mart-basic-privilege'
                    }
                }
            }
        },
        martUpdate: {
            method: 'PUT',
            path: '/marts/{id}',
            config: {
                app: {
                    model: 'mart'
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: mart_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'update-mart-basic-privilege': 'update-mart-basic-privilege'
                    }
                }
            }
        },
        martRemove: {
            method: 'DELETE',
            path: '/marts/{id}',
            config: {
                app: {
                    model: 'mart'
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-mart-basic-privilege': 'remove-mart-basic-privilege'
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=index.js.map