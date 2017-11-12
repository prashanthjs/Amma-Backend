import {ShippingMethodSchema} from './shipping.method.schema';
import {Payload} from './shipping.method.route.validation';

export const config = {
    app: {
        db: {
            schema: {
                'shipping-method': ShippingMethodSchema
            }
        },
        privilege: {
            'view-shipping-method-basic-privilege': {
                group: 'Shipping method',
                title: 'View shipping method basic'
            },
            'view-shipping-method-count-privilege': {
                group: 'Shipping method',
                title: 'View shipping method count'
            },
            'create-shipping-method-basic-privilege': {
                group: 'Shipping method',
                title: 'Create shipping method basic'
            },
            'update-shipping-method-basic-privilege': {
                group: 'Shipping method',
                title: 'Update shipping method basic'
            },
            'remove-shipping-method-basic-privilege': {
                group: 'Shipping method',
                title: 'Remove shipping method basic'
            }
        }
    },
    routes: {
        shippingMethodList: {
            method: 'GET',
            path: '/shipping-methods',
            config: {
                app: {
                    model: 'shipping-method',
                },
                handler: 'restListAction'
            }
        },
        shippingMethodView: {
            method: 'GET',
            path: '/shipping-methods/{id}',
            config: {
                app: {
                    model: 'shipping-method',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-shipping-method-basic-privilege': 'view-shipping-method-basic-privilege'
                    }
                }
            }
        },
        shippingMethodCount: {
            method: 'GET',
            path: '/shipping-methods/count',
            config: {
                app: {
                    model: 'shipping-method',
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-shipping-method-count-privilege': 'view-shipping-method-count-privilege'
                    }
                }
            }
        },
        shippingMethodCreate: {
            method: 'POST',
            path: '/shipping-methods',
            config: {
                app: {
                    model: 'shipping-method',
                },
                handler: 'restCreateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'create-shipping-method-basic-privilege': 'create-shipping-method-basic-privilege'
                    }
                }
            }
        },
        shippingMethodUpdate: {
            method: 'PUT',
            path: '/shipping-methods/{id}',
            config: {
                app: {
                    model: 'shipping-method',
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'update-shipping-method-basic-privilege': 'update-shipping-method-basic-privilege'
                    }
                }
            }
        },
        shippingMethodRemove: {
            method: 'DELETE',
            path: '/shipping-methods/{id}',
            config: {
                app: {
                    model: 'shipping-method',
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-shipping-method-basic-privilege': 'remove-shipping-method-basic-privilege'
                    }
                }
            }
        },
    }
};