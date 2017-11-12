"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_schema_1 = require("./category.schema");
const category_route_validation_1 = require("./category.route.validation");
exports.config = {
    app: {
        db: {
            schema: {
                category: category_schema_1.CategorySchema
            }
        },
        file: {
            category: {
                uploadDir: __dirname + '/../' + 'storage',
                min: 0,
                max: 3,
                ext: ['.jpg', '.jpeg', '.png', '.gif'],
                minFileSize: 1048576 / 20,
                maxFileSize: 1048576 * 10
            }
        },
        privilege: {
            'view-category-basic-privilege': {
                group: 'Category',
                title: 'View category basic'
            },
            'view-category-count-privilege': {
                group: 'Category',
                title: 'View category count'
            },
            'create-category-basic-privilege': {
                group: 'Category',
                title: 'Create category basic'
            },
            'update-category-basic-privilege': {
                group: 'Category',
                title: 'Update category basic'
            },
            'remove-category-basic-privilege': {
                group: 'Category',
                title: 'Remove category basic'
            }
        }
    },
    routes: {
        categoryList: {
            method: 'GET',
            path: '/categories',
            config: {
                app: {
                    model: 'category',
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-category-basic-privilege': 'view-category-basic-privilege'
                    }
                }
            }
        },
        categoryView: {
            method: 'GET',
            path: '/categories/{id}',
            config: {
                app: {
                    model: 'category',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-category-basic-privilege': 'view-category-basic-privilege'
                    }
                }
            }
        },
        categoryCount: {
            method: 'GET',
            path: '/categories/count',
            config: {
                app: {
                    model: 'category'
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-category-count-privilege': 'view-category-count-privilege'
                    }
                }
            }
        },
        categoryCreate: {
            method: 'POST',
            path: '/categories',
            config: {
                app: {
                    model: 'category'
                },
                handler: 'restCreateAction',
                validate: {
                    payload: category_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'create-category-basic-privilege': 'create-category-basic-privilege'
                    }
                }
            }
        },
        categoryUpdate: {
            method: 'PUT',
            path: '/categories/{id}',
            config: {
                app: {
                    model: 'category'
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: category_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'update-category-basic-privilege': 'update-category-basic-privilege'
                    }
                }
            }
        },
        categoryRemove: {
            method: 'DELETE',
            path: '/categories/{id}',
            config: {
                app: {
                    model: 'category'
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-category-basic-privilege': 'remove-category-basic-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map