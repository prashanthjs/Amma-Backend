"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report_user_plugin_1 = require("../services/report.user.plugin");
const report_user_controller_1 = require("../services/report.user.controller");
exports.config = {
    app: {
        db: {
            schema: {
                user: {
                    plugins: {
                        reportUserPlugin: report_user_plugin_1.ReportUserPlugin
                    }
                }
            },
        },
        privilege: {
            'view-report-user-day-summary-privilege': {
                group: 'Report',
                title: 'View report user summary by day'
            },
            'view-report-user-month-summary-privilege': {
                group: 'Report',
                title: 'View report user summary by month'
            },
            'view-report-user-year-summary-privilege': {
                group: 'Report',
                title: 'View report user summary by year'
            },
        }
    },
    services: {
        reportUserController: report_user_controller_1.ReportUserController,
    },
    routes: {
        reportUserDaySummary: {
            method: 'GET',
            path: '/reports/user/day/summary',
            config: {
                handler: 'reportUserDaySummaryAction',
                auth: {
                    scope: {
                        'view-report-user-day-summary-privilege': 'view-report-user-day-summary-privilege'
                    }
                }
            }
        },
        reportUserMonthSummary: {
            method: 'GET',
            path: '/reports/user/month/summary',
            config: {
                handler: 'reportUserMonthSummaryAction',
                auth: {
                    scope: {
                        'view-report-user-month-summary-privilege': 'view-report-user-month-summary-privilege'
                    }
                }
            }
        },
        reportUserYearSummary: {
            method: 'GET',
            path: '/reports/user/year/summary',
            config: {
                handler: 'reportUserYearSummaryAction',
                auth: {
                    scope: {
                        'view-report-user-year-summary-privilege': 'view-report-user-year-summary-privilege'
                    }
                }
            }
        },
    }
};
//# sourceMappingURL=index.js.map