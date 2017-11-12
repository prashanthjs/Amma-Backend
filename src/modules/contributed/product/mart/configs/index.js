"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const ProductMartSchema = {
    schema: {
        mart: [String]
    }
};
const ProductMartPayload = {
    mart: Joi.array().items(Joi.string()),
};
exports.config = {
    app: {
        db: {
            schema: {
                product: ProductMartSchema
            },
        },
        privilege: {
            'update-product-mart-privilege': {
                group: 'Product',
                title: 'Update product mart'
            },
        }
    },
    routes: {
        productList: {
            config: {
                pre: { addMartFilterHandler: { method: 'addMartFilterHandler' } },
            }
        },
        productCount: {
            config: {
                pre: { addMartFilterHandler: { method: 'addMartFilterHandler' } },
            }
        },
        productCreate: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addDefaultMartHandler' } },
            }
        },
        productRemove: {
            config: {
                pre: { checkMartAccessHandler: { method: 'checkMartAccessHandler' } }
            }
        },
        productView: {
            config: {
                pre: { checkMartAccessHandler: { method: 'checkMartAccessHandler' } }
            }
        },
        productMartUpdate: {
            method: 'PUT',
            path: '/products/{id}/mart',
            config: {
                app: {
                    model: 'product'
                },
                pre: { validateMartHandler: { method: 'validateMartHandler' } },
                handler: 'restUpdateAction',
                validate: {
                    payload: ProductMartPayload
                },
                auth: {
                    scope: {
                        'update-product-mart-privilege': 'update-product-mart-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map