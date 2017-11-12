import {Schema} from '../../../../core/database/database';
import * as _ from 'lodash';

export function ReportOrderPlugin(schema: Schema, options) {

    schema.statics.countByType = async function orderTypeCount(filter: Object, type: string) {
        return this.count(await parseFilters(filter, type));
    };

    schema.statics.summary = async function (filters: Object, type: string = 'completed'): Promise<Object> {
        const result = await this.aggregate([
            {$match: await parseFilters(filters, type)},
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
        const ret = {sell: 0, cost: 0, total: 0};
        if (result && result.length) {
            ret.sell = result[0]['sell'];
            ret.cost = result[0]['cost'];
            ret.total = result[0]['total'];
        }
        return ret;
    };

    schema.statics.topUsersByAmount = async function (filters: Object, limit = 10): Promise<Object> {
        return this.aggregate([
            {$match: await parseFilters(filters)},
            {
                $group: {
                    _id: "$user.username",
                    total: {
                        $sum: '$totalPrice.sell'
                    }
                }
            },
            {$sort: {total: -1}},
            {$limit: limit}
        ]);
    };

    schema.statics.topUsersByCount = async function (filters: Object, limit = 10): Promise<Object> {
        return this.aggregate([
            {$match: await parseFilters(filters)},
            {
                $group: {
                    _id: "$user.username",
                    total: {
                        $sum: 1
                    }
                }
            },
            {$sort: {total: -1}},
            {$limit: limit}
        ]);
    };

    schema.statics.topProductsByAmount = async function (filters: Object, limit = 10): Promise<Object> {
        return this.aggregate([
            {$match: await parseFilters(filters)},
            {$unwind: "$inItems"},
            {
                $group: {
                    _id: "$inItems.name",
                    total: {
                        $sum: '$inItems.totalPrice.sell'
                    }
                }
            },
            {$sort: {total: -1}},
            {$limit: limit}
        ]);
    };

    schema.statics.topProductsByCount = async function (filters: Object, limit = 10): Promise<Object> {
        return this.aggregate([
            {$match: await parseFilters(filters)},
            {$unwind: "$inItems"},
            {
                $group: {
                    _id: "$inItems.name",
                    total: {
                        $sum: '$inItems.qty'
                    }
                }
            },
            {$sort: {total: -1}},
            {$limit: limit}
        ]);
    };

    schema.statics.summaryByStatus = async function (filters: Object): Promise<Object> {
        return this.aggregate([
            {$match: filters},
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
            {$sort: {total: -1}}
        ]);
    };

    schema.statics.summaryByDate = async function (viewType, filters: Object, limit = 10): Promise<Object> {
        let format = '%Y-%m-%d';
        if (viewType === 'month') {
            format = '%Y-%m';
        } else if (viewType === 'year') {
            format = '%Y';
        }

        return this.aggregate([
            {$match: await parseFilters(filters)},
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $group: {
                    _id: {$dateToString: {format: format, date: '$createdAt'}},
                    total: {
                        $sum: 1
                    },
                    amount: {
                        $sum: '$totalPrice.sell'
                    }
                }
            },
            {$limit: limit}
        ]);
    };


    async function parseFilters(filter, type: string = 'completed') {
        const res = await schema.server.getModel('order-status').find({type: type});
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
                    $and: await conditions
                };
            } else {
                filter['$and'] = _.concat(filter['$and'], conditions);
            }
        }
        return filter;
    }
}