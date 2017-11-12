"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_status_schema_1 = require("./payment.status.schema");
const payment_status_route_validation_1 = require("./payment.status.route.validation");
exports.config = {
    app: {
        db: {
            schema: {
                'payment-status': payment_status_schema_1.PaymentStatusSchema
            }
        },
        privilege: {
            'view-payment-status-basic-privilege': {
                group: 'Payment status',
                title: 'View payment status basic'
            },
            'view-payment-status-count-privilege': {
                group: 'Payment status',
                title: 'View payment status count'
            },
            'create-payment-status-basic-privilege': {
                group: 'Payment status',
                title: 'Create payment status basic'
            },
            'update-payment-status-basic-privilege': {
                group: 'Payment status',
                title: 'Update payment status basic'
            },
            'remove-payment-status-basic-privilege': {
                group: 'Payment status',
                title: 'Remove payment status basic'
            }
        }
    },
    routes: {
        paymentStatusList: {
            method: 'GET',
            path: '/payment-statuses',
            config: {
                app: {
                    model: 'payment-status'
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-payment-status-basic-privilege': 'view-payment-status-basic-privilege'
                    }
                }
            }
        },
        paymentStatusView: {
            method: 'GET',
            path: '/payment-statuses/{id}',
            config: {
                app: {
                    model: 'payment-status',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-payment-status-basic-privilege': 'view-payment-status-basic-privilege'
                    }
                }
            }
        },
        paymentStatusCount: {
            method: 'GET',
            path: '/payment-statuses/count',
            config: {
                app: {
                    model: 'payment-status'
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-payment-status-count-privilege': 'view-payment-status-count-privilege'
                    }
                }
            }
        },
        paymentStatusCreate: {
            method: 'POST',
            path: '/payment-statuses',
            config: {
                app: {
                    model: 'payment-status'
                },
                handler: 'restCreateAction',
                validate: {
                    payload: payment_status_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'create-payment-status-basic-privilege': 'create-payment-status-basic-privilege'
                    }
                }
            }
        },
        paymentStatusUpdate: {
            method: 'PUT',
            path: '/payment-statuses/{id}',
            config: {
                app: {
                    model: 'payment-status'
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: payment_status_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'update-payment-status-basic-privilege': 'update-payment-status-basic-privilege'
                    }
                }
            }
        },
        paymentStatusRemove: {
            method: 'DELETE',
            path: '/payment-statuses/{id}',
            config: {
                app: {
                    model: 'payment-status'
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-payment-status-basic-privilege': 'remove-payment-status-basic-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map