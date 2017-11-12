import {OrderSchema} from './order.schema';
import {Payload} from './order.route.validation';
import {OrderTransformerHandler} from '../services/order.transformer.handler';

export const config = {
    app: {
        db: {
            schema: {
                order: OrderSchema
            }
        },
        privilege: {
            'view-order-basic-privilege': {
                group: 'Order',
                title: 'View order basic'
            },
            'view-order-count-privilege': {
                group: 'Order',
                title: 'View order count'
            },
            'create-order-basic-privilege': {
                group: 'Order',
                title: 'Create order basic'
            },
            'update-order-basic-privilege': {
                group: 'Order',
                title: 'Update order basic'
            },
            'remove-order-basic-privilege': {
                group: 'Order',
                title: 'Remove order basic'
            }
        }
    },
    services: {
        orderTransformerHandler: OrderTransformerHandler
    },
    routes: {
        orderList: {
            method: 'GET',
            path: '/orders',
            config: {
                app: {
                    model: 'order'
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-order-basic-privilege': 'view-order-basic-privilege'
                    }
                }
            }
        },
        orderView: {
            method: 'GET',
            path: '/orders/{id}',
            config: {
                app: {
                    model: 'order'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-order-basic-privilege': 'view-order-basic-privilege'
                    }
                }
            }
        },
        orderCount: {
            method: 'GET',
            path: '/orders/count',
            config: {
                app: {
                    model: 'order'
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-order-count-privilege': 'view-order-count-privilege'
                    }
                }
            }
        },
        orderCreate: {
            method: 'POST',
            path: '/orders',
            config: {
                app: {
                    model: 'order'
                },
                pre: {orderTotalsTransformer: {method: 'orderTotalsTransformerHandler'}},
                handler: 'restCreateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'create-order-basic-privilege': 'create-order-basic-privilege'
                    }
                }
            }
        },
        orderUpdate: {
            method: 'PUT',
            path: '/orders/{id}',
            config: {
                app: {
                    model: 'order'
                },
                pre: {orderTotalsTransformer: {method: 'orderTotalsTransformerHandler'}},
                handler: 'restUpdateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'update-order-basic-privilege': 'update-order-basic-privilege'
                    }
                }
            }
        },
        orderRemove: {
            method: 'DELETE',
            path: '/orders/{id}',
            config: {
                app: {
                    model: 'order'
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-order-basic-privilege': 'remove-order-basic-privilege'
                    }
                }
            }
        },
    }
};