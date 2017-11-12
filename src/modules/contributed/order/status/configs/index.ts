import {OrderStatusSchema} from './order.status.schema';
import {Payload} from './order.status.route.validation';

export const config = {
    app: {
        db: {
            schema: {
                'order-status': OrderStatusSchema
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
                    payload: Payload
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
                    payload: Payload
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