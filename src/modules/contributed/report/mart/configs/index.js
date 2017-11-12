"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    routes: {
        reportOrderSummary: {
            config: {
                pre: { addMartFilterHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderTopUsersByAmount: {
            config: {
                pre: { addMartFilterHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderTopUsersByCount: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderTopProductsByAmount: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderTopProductsByCount: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderStatusSummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderStatusTypeSummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderDaySummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderMonthSummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportOrderYearSummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        // user
        reportUserDaySummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportUserMonthSummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
        reportUserYearSummary: {
            config: {
                pre: { addDefaultMartHandler: { method: 'addMartFilterHandler' } },
            }
        },
    }
};
//# sourceMappingURL=index.js.map