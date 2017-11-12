import * as Joi from 'joi';

const OrderMartSchema = {
    schema: {
        mart: [String]
    }
};

const OrderMartPayload = {
    mart: Joi.array().items(Joi.string()),
};
export const config = {
    app: {
        db: {
            schema: {
                order: OrderMartSchema
            },
        },
        privilege: {
            'update-order-mart-privilege': {
                group: 'Order',
                title: 'Update order basic'
            },
        }
    },
    routes: {
        orderList: {
            config: {
                pre: {addMartFilterHandler: {method: 'addMartFilterHandler'}},
            }
        },
        orderCount: {
            config: {
                pre: {addMartFilterHandler: {method: 'addMartFilterHandler'}},
            }
        },
        orderCreate: {
            config: {
                pre: {addDefaultMartHandler: {method: 'addDefaultMartHandler'}},
            }
        },
        orderRemove: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        orderView: {
            config: {
                pre: {checkMartAccessHandler: {method: 'checkMartAccessHandler'}}
            }
        },
        orderMartUpdate: {
            method: 'PUT',
            path: '/orders/{id}/mart',
            config: {
                app: {
                    model: 'order'
                },
                pre: {validateMartHandler: {method: 'validateMartHandler'}},
                handler: 'restUpdateAction',
                validate: {
                    payload: OrderMartPayload
                },
                auth: {
                    scope: {
                        'update-order-mart-privilege': 'update-order-mart-privilege'
                    }
                }
            }
        },
    }
};