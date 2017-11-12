import {ReportUserPlugin} from '../services/report.user.plugin';
import {ReportUserController} from '../services/report.user.controller';

export const config = {
    app: {
        db: {
            schema: {
                user: {
                    plugins: {
                        reportUserPlugin: ReportUserPlugin
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
        reportUserController: ReportUserController,
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