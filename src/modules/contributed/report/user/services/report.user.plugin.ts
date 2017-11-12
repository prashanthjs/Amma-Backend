import {Schema} from '../../../../core/database/database';

export function ReportUserPlugin(schema: Schema, options) {

    schema.statics.summaryByDate = async function (viewType, filters: Object, limit = 10): Promise<Object> {
        let format = '%Y-%m-%d';
        if (viewType === 'month') {
            format = '%Y-%m';
        } else if (viewType === 'year') {
            format = '%Y';
        }

        return this.aggregate([
            {$match: filters},
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
                }
            },
            {$limit: limit}
        ]);
    };
}