import {ShippingStatusSchema} from './shipping.status.schema';
import {Payload} from './shipping.status.route.validation';

export const config = {
    app: {
        db: {
            schema: {
                'shipping-status': ShippingStatusSchema
            }
        },
        privilege: {
            'view-shipping-status-basic-privilege': {
                group: 'Shipping status',
                title: 'View shipping status basic'
            },
            'view-shipping-status-count-privilege': {
                group: 'Shipping status',
                title: 'View shipping status count'
            },
            'create-shipping-status-basic-privilege': {
                group: 'Shipping status',
                title: 'Create shipping status basic'
            },
            'update-shipping-status-basic-privilege': {
                group: 'Shipping status',
                title: 'Update shipping status basic'
            },
            'remove-shipping-status-basic-privilege': {
                group: 'Shipping status',
                title: 'Remove shipping status basic'
            }
        }
    },
    routes: {
        shippingStatusList: {
            method: 'GET',
            path: '/shipping-statuses',
            config: {
                app: {
                    model: 'shipping-status',
                },
                handler: 'restListAction',
                auth: {
                    scope: {
                        'view-shipping-status-basic-privilege': 'view-shipping-status-basic-privilege'
                    }
                }
            }
        },
        shippingStatusView: {
            method: 'GET',
            path: '/shipping-statuses/{id}',
            config: {
                app: {
                    model: 'shipping-status',
                    idNameField: 'name'
                },
                handler: 'restViewAction',
                auth: {
                    scope: {
                        'view-shipping-status-basic-privilege': 'view-shipping-status-basic-privilege'
                    }
                }
            }
        },
        shippingStatusCount: {
            method: 'GET',
            path: '/shipping-statuses/count',
            config: {
                app: {
                    model: 'shipping-status',
                },
                handler: 'restCountAction',
                auth: {
                    scope: {
                        'view-shipping-status-count-privilege': 'view-shipping-status-count-privilege'
                    }
                }
            }
        },
        shippingStatusCreate: {
            method: 'POST',
            path: '/shipping-statuses',
            config: {
                app: {
                    model: 'shipping-status',
                },
                handler: 'restCreateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'create-shipping-status-basic-privilege': 'create-shipping-status-basic-privilege'
                    }
                }
            }
        },
        shippingStatusUpdate: {
            method: 'PUT',
            path: '/shipping-statuses/{id}',
            config: {
                app: {
                    model: 'shipping-status',
                },
                handler: 'restUpdateAction',
                validate: {
                    payload: Payload
                },
                auth: {
                    scope: {
                        'update-shipping-status-basic-privilege': 'update-shipping-status-basic-privilege'
                    }
                }
            }
        },
        shippingStatusRemove: {
            method: 'DELETE',
            path: '/shipping-statuses/{id}',
            config: {
                app: {
                    model: 'shipping-status',
                },
                handler: 'restRemoveAction',
                auth: {
                    scope: {
                        'remove-shipping-status-basic-privilege': 'remove-shipping-status-basic-privilege'
                    }
                }
            }
        },
    }
};