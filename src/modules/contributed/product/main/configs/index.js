"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_schema_1 = require("./product.schema");
const product_route_validation_1 = require("./product.route.validation");
exports.config = {
    app: {
        db: {
            schema: {
                product: product_schema_1.ProductSchema
            }
        },
        file: {
            product: {
                uploadDir: __dirname + '/../' + 'storage',
                min: 0,
                max: 3,
                ext: ['.jpg', '.jpeg', '.png', '.gif'],
                minFileSize: 1000,
                maxFileSize: 1048576 * 10
            }
        },
        privilege: {
            'view-product-basic-privilege': {
                group: 'Product',
                title: 'View product basic'
            },
            'view-product-count-privilege': {
                group: 'Product',
                title: 'View product count'
            },
            'create-product-basic-privilege': {
                group: 'Product',
                title: 'Create product basic'
            },
            'update-product-basic-privilege': {
                group: 'Product',
                title: 'Update product basic'
            },
            'remove-product-basic-privilege': {
                group: 'Product',
                title: 'Remove product basic'
            }
        }
    },
    routes: {
        productList: {
            method: 'GET',
            path: '/products',
            config: {
                app: {
                    model: 'product',
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-product-basic-privilege': 'view-product-basic-privilege'
                    }
                }
            }
        },
        productView: {
            method: 'GET',
            path: '/products/{id}',
            config: {
                app: {
                    model: 'product',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-product-basic-privilege': 'view-product-basic-privilege'
                    }
                }
            }
        },
        productCount: {
            method: 'GET',
            path: '/products/count',
            config: {
                app: {
                    model: 'product',
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-product-count-privilege': 'view-product-count-privilege'
                    }
                }
            }
        },
        productCreate: {
            method: 'POST',
            path: '/products',
            config: {
                app: {
                    model: 'product',
                },
                handler: 'restCreateAction',
                validate: {
                    payload: product_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'create-product-basic-privilege': 'create-product-basic-privilege'
                    }
                }
            }
        },
        productUpdate: {
            method: 'PUT',
            path: '/products/{id}',
            config: {
                app: {
                    model: 'product',
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: product_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'update-product-basic-privilege': 'update-product-basic-privilege'
                    }
                }
            }
        },
        productRemove: {
            method: 'DELETE',
            path: '/products/{id}',
            config: {
                app: {
                    model: 'product',
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-product-basic-privilege': 'remove-product-basic-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map