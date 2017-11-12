"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function ReportOrderPlugin(schema, options) {
    schema.statics.countByType = function orderTypeCount(filter, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.count(yield parseFilters(filter, type));
        });
    };
    schema.statics.summary = function (filters, type = 'completed') {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.aggregate([
                { $match: yield parseFilters(filters, type) },
                {
                    $group: {
                        _id: null,
                        sell: {
                            $sum: '$totalPrice.sell'
                        },
                        cost: {
                            $sum: '$totalPrice.cost'
                        },
                        total: {
                            $sum: 1
                        }
                    }
                }
            ]);
            const ret = { sell: 0, cost: 0, total: 0 };
            if (result && result.length) {
                ret.sell = result[0]['sell'];
                ret.cost = result[0]['cost'];
                ret.total = result[0]['total'];
            }
            return ret;
        });
    };
    schema.statics.topUsersByAmount = function (filters, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.aggregate([
                { $match: yield parseFilters(filters) },
                {
                    $group: {
                        _id: "$user.username",
                        total: {
                            $sum: '$totalPrice.sell'
                        }
                    }
                },
                { $sort: { total: -1 } },
                { $limit: limit }
            ]);
        });
    };
    schema.statics.topUsersByCount = function (filters, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.aggregate([
                { $match: yield parseFilters(filters) },
                {
                    $group: {
                        _id: "$user.username",
                        total: {
                            $sum: 1
                        }
                    }
                },
                { $sort: { total: -1 } },
                { $limit: limit }
            ]);
        });
    };
    schema.statics.topProductsByAmount = function (filters, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.aggregate([
                { $match: yield parseFilters(filters) },
                { $unwind: "$inItems" },
                {
                    $group: {
                        _id: "$inItems.name",
                        total: {
                            $sum: '$inItems.totalPrice.sell'
                        }
                    }
                },
                { $sort: { total: -1 } },
                { $limit: limit }
            ]);
        });
    };
    schema.statics.topProductsByCount = function (filters, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.aggregate([
                { $match: yield parseFilters(filters) },
                { $unwind: "$inItems" },
                {
                    $group: {
                        _id: "$inItems.name",
                        total: {
                            $sum: '$inItems.qty'
                        }
                    }
                },
                { $sort: { total: -1 } },
                { $limit: limit }
            ]);
        });
    };
    schema.statics.summaryByStatus = function (filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.aggregate([
                { $match: filters },
                {
                    $group: {
                        _id: "$orderStatus",
                        total: {
                            $sum: 1
                        },
                        amount: {
                            $sum: '$totalPrice.sell'
                        }
                    }
                },
                { $sort: { total: -1 } }
            ]);
        });
    };
    schema.statics.summaryByDate = function (viewType, filters, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let format = '%Y-%m-%d';
            if (viewType === 'month') {
                format = '%Y-%m';
            }
            else if (viewType === 'year') {
                format = '%Y';
            }
            return this.aggregate([
                { $match: yield parseFilters(filters) },
                {
                    $sort: {
                        createdAt: -1,
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: format, date: '$createdAt' } },
                        total: {
                            $sum: 1
                        },
                        amount: {
                            $sum: '$totalPrice.sell'
                        }
                    }
                },
                { $limit: limit }
            ]);
        });
    };
    function parseFilters(filter, type = 'completed') {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield schema.server.getModel('order-status').find({ type: type });
            const conditions = [];
            if (res && res.length) {
                res.forEach((status) => {
                    conditions.push({
                        'orderStatus': status['name']
                    });
                });
            }
            if (conditions.length) {
                if (!filter || !filter['$and'] || !filter['$and'].length) {
                    filter = {
                        $and: yield conditions
                    };
                }
                else {
                    filter['$and'] = _.concat(filter['$and'], conditions);
                }
            }
            return filter;
        });
    }
}
exports.ReportOrderPlugin = ReportOrderPlugin;
//# sourceMappingURL=report.order.plugin.js.map