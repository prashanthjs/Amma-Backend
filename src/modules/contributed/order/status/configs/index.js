"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_status_schema_1 = require("./order.status.schema");
const order_status_route_validation_1 = require("./order.status.route.validation");
exports.config = {
    app: {
        db: {
            schema: {
                'order-status': order_status_schema_1.OrderStatusSchema
            }
        },
        privilege: {
            'view-order-status-basic-privilege': {
                group: 'Order status',
                title: 'View order status basic'
            },
            'view-order-status-count-privilege': {
                group: 'Order status',
                title: 'View order status count'
            },
            'create-order-status-basic-privilege': {
                group: 'Order status',
                title: 'Create order status basic'
            },
            'update-order-status-basic-privilege': {
                group: 'Order status',
                title: 'Update order status basic'
            },
            'remove-order-status-basic-privilege': {
                group: 'Order status',
                title: 'Remove order status basic'
            }
        }
    },
    routes: {
        orderStatusList: {
            method: 'GET',
            path: '/order-statuses',
            config: {
                app: {
                    model: 'order-status'
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-order-status-basic-privilege': 'view-order-status-basic-privilege'
                    }
                }
            }
        },
        orderStatusView: {
            method: 'GET',
            path: '/order-statuses/{id}',
            config: {
                app: {
                    model: 'order-status',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-order-status-basic-privilege': 'view-order-status-basic-privilege'
                    }
                }
            }
        },
        orderStatusCount: {
            method: 'GET',
            path: '/order-statuses/count',
            config: {
                app: {
                    model: 'order-status'
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-order-status-count-privilege': 'view-order-status-count-privilege'
                    }
                }
            }
        },
        orderStatusCreate: {
            method: 'POST',
            path: '/order-statuses',
            config: {
                app: {
                    model: 'order-status'
                },
                handler: 'restCreateAction',
                validate: {
                    payload: order_status_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'create-order-status-basic-privilege': 'create-order-status-basic-privilege'
                    }
                },
            }
        },
        orderStatusUpdate: {
            method: 'PUT',
            path: '/order-statuses/{id}',
            config: {
                app: {
                    model: 'order-status'
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: order_status_route_validation_1.Payload
                },
                auth: {
                    scope: {
                        'update-order-status-basic-privilege': 'update-order-status-basic-privilege'
                    }
                }
            }
        },
        orderStatusRemove: {
            method: 'DELETE',
            path: '/order-statuses/{id}',
            config: {
                app: {
                    model: 'order-status'
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-order-status-basic-privilege': 'remove-order-status-basic-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map