import * as Joi from 'joi';

const CategoryMartSchema = {
    schema: {
        mart: [String]
    }
};

const CategoryMartPayload = {
    mart: Joi.array().items(Joi.string()),
};
export const config = {
    app: {
        db: {
            schema: {
                category: CategoryMartSchema
            },
        },
        privilege: {
            'update-category-mart-privilege': {
                group: 'Category',
                title: 'Update category mart'
            },
        }
    },
    routes: {
        categoryList: {
            config: {
                pre: {addMartFilterHandler: {method: 'addMartFilterHandler'}},
            }
        },
        categoryCount: {
            config: {
                pre: {addMartFilterHandler: {method: 'addMartFilterHandler'}},
            }
        },
        categoryCreate: {
            config: {
                pre: {addDefaultMartHandler: {method: 'addDefaultMartHandler'}},
            }
        },
        categoryRemove: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        categoryView: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        categoryMartUpdate: {
            method: 'PUT',
            path: '/categories/{id}/mart',
            config: {
                app: {
                    model: 'category'
                },
                pre: {validateMartHandler: {method: 'validateMartHandler'}},
                handler: 'restUpdateAction',
                validate: {
                    payload: CategoryMartPayload
                },
                auth: {
                    scope: {
                        'update-category-mart-privilege': 'update-category-mart-privilege'
                    }
                }
            }
        },
    }
};