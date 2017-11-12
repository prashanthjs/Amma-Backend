import {PaymentMethodSchema} from './payment.method.schema';
import {Payload} from './payment.method.route.validation';

export const config = {
    app: {
        db: {
            schema: {
                'payment-method': PaymentMethodSchema
            }
        },
        privilege: {
            'view-payment-method-basic-privilege': {
                group: 'Payment method',
                title: 'View payment-method basic'
            },
            'view-payment-method-count-privilege': {
                group: 'Payment method',
                title: 'View payment-method count'
            },
            'create-payment-method-basic-privilege': {
                group: 'Payment method',
                title: 'Create payment-method basic'
            },
            'update-payment-method-basic-privilege': {
                group: 'Payment method',
                title: 'Update payment-method basic'
            },
            'remove-payment-method-basic-privilege': {
                group: 'Payment method',
                title: 'Remove payment-method basic'
            }
        }
    },
    routes: {
        paymentMethodList: {
            method: 'GET',
            path: '/payment-methods',
            config: {
                app: {
                    model: 'payment-method',
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-payment-method-basic-privilege': 'view-payment-method-basic-privilege'
                    }
                }
            }
        },
        paymentMethodView: {
            method: 'GET',
            path: '/payment-methods/{id}',
            config: {
                app: {
                    model: 'payment-method',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-payment-method-basic-privilege': 'view-payment-method-basic-privilege'
                    }
                }
            }
        },
        paymentMethodCount: {
            method: 'GET',
            path: '/payment-methods/count',
            config: {
                app: {
                    model: 'payment-method',
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-payment-method-count-privilege': 'view-payment-method-count-privilege'
                    }
                }
            }
        },
        paymentMethodCreate: {
            method: 'POST',
            path: '/payment-methods',
            config: {
                app: {
                    model: 'payment-method',
                },
                handler: 'restCreateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'create-payment-method-basic-privilege': 'create-payment-method-basic-privilege'
                    }
                }
            }
        },
        paymentMethodUpdate: {
            method: 'PUT',
            path: '/payment-methods/{id}',
            config: {
                app: {
                    model: 'payment-method',
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'update-payment-method-basic-privilege': 'update-payment-method-basic-privilege'
                    }
                }
            }
        },
        paymentMethodRemove: {
            method: 'DELETE',
            path: '/payment-methods/{id}',
            config: {
                app: {
                    model: 'payment-method',
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-payment-method-basic-privilege': 'remove-payment-method-basic-privilege'
                    }
                }
            }
        },
    }
};