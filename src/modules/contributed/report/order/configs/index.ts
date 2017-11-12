import {ReportOrderPlugin} from '../services/report.order.plugin';
import {ReportOrderController} from '../services/report.order.controller';

export const config = {
    app: {
        db: {
            schema: {
                order: {
                    plugins: {
                        reportOrderPlugin: ReportOrderPlugin
                    }
                }
            },
        },
        privilege: {
            'view-report-order-summary-privilege': {
                group: 'Report',
                title: 'View report order summary'
            },
            'view-report-order-top-users-amount-privilege': {
                group: 'Report',
                title: 'View report top users by order amount'
            },
            'view-report-order-top-users-count-privilege': {
                group: 'Report',
                title: 'View report top users by count'
            },
            'view-report-order-top-products-amount-privilege': {
                group: 'Report',
                title: 'View report top products by amount'
            },
            'view-report-order-top-products-count-privilege': {
                group: 'Report',
                title: 'View report top products by count'
            },
            'view-report-order-status-summary-privilege': {
                group: 'Report',
                title: 'View report order summary by order status'
            },
            'view-report-order-status-type-summary-privilege': {
                group: 'Report',
                title: 'View report order summary for all order statuses'
            },
            'view-report-order-day-summary-privilege': {
                group: 'Report',
                title: 'View report order summary by day'
            },
            'view-report-order-month-summary-privilege': {
                group: 'Report',
                title: 'View report order summary by month'
            },
            'view-report-order-year-summary-privilege': {
                group: 'Report',
                title: 'View report order summary by year'
            },
        }
    },
    services: {
        'reportOrderController': ReportOrderController,
    },
    routes: {
        reportOrderSummary: {
            method: 'GET',
            path: '/reports/order/summary',
            config: {
                handler: 'reportOrderSummaryAction',
                auth: {
                    scope: {
                        'view-report-order-summary-privilege': 'view-report-order-summary-privilege'
                    }
                }
            }
        },

        reportOrderTopUsersByAmount: {
            method: 'GET',
            path: '/reports/order/top/users/amount',
            config: {
                handler: 'reportOrderTopUsersByAmountAction',
                auth: {
                    scope: {
                        'view-report-order-top-users-amount-privilege': 'view-report-order-top-users-amount-privilege'
                    }
                }
            }
        },

        reportOrderTopUsersByCount: {
            method: 'GET',
            path: '/reports/order/top/users/count',
            config: {
                handler: 'reportOrderTopUsersByCountAction',
                auth: {
                    scope: {
                        'view-report-order-top-users-count-privilege': 'view-report-order-top-users-count-privilege'
                    }
                }
            }
        },

        reportOrderTopProductsByAmount: {
            method: 'GET',
            path: '/reports/order/top/products/amount',
            config: {
                handler: 'reportOrderTopProductsByAmountAction',
                auth: {
                    scope: {
                        'view-report-order-top-products-amount-privilege': 'view-report-order-top-products-amount-privilege'
                    }
                }
            }
        },

        reportOrderTopProductsByCount: {
            method: 'GET',
            path: '/reports/order/top/products/count',
            config: {
                handler: 'reportOrderTopProductsByCountAction',
                auth: {
                    scope: {
                        'view-report-order-top-products-count-privilege': 'view-report-order-top-products-count-privilege'
                    }
                }
            }
        },

        reportOrderStatusSummary: {
            method: 'GET',
            path: '/reports/order/status/summary',
            config: {
                handler: 'reportOrderStatusSummaryAction',
                auth: {
                    scope: {
                        'view-report-order-status-summary-privilege': 'view-report-order-status-summary-privilege'
                    }
                }
            }
        },

        reportOrderStatusTypeSummary: {
            method: 'GET',
            path: '/reports/order/status-type/summary',
            config: {
                handler: 'reportOrderStatusTypeSummaryAction',
                auth: {
                    scope: {
                        'view-report-order-status-type-summary-privilege': 'view-report-order-status-type-summary-privilege'
                    }
                }
            }
        },

        reportOrderDaySummary: {
            method: 'GET',
            path: '/reports/order/day/summary',
            config: {
                handler: 'reportOrderDaySummaryAction',
                auth: {
                    scope: {
                        'view-report-order-day-summary-privilege': 'view-report-order-day-summary-privilege'
                    }
                }
            }
        },
        reportOrderMonthSummary: {
            method: 'GET',
            path: '/reports/order/month/summary',
            config: {
                handler: 'reportOrderMonthSummaryAction',
                auth: {
                    scope: {
                        'view-report-order-month-summary-privilege': 'view-report-order-month-summary-privilege'
                    }
                }
            }
        },
        reportOrderYearSummary: {
            method: 'GET',
            path: '/reports/order/year/summary',
            config: {
                handler: 'reportOrderYearSummaryAction',
                auth: {
                    scope: {
                        'view-report-order-year-summary-privilege': 'view-report-order-year-summary-privilege'
                    }
                }
            }
        },
    }
};