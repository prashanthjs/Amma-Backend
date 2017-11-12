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
function ReportUserPlugin(schema, options) {
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
                { $match: filters },
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
                    }
                },
                { $limit: limit }
            ]);
        });
    };
}
exports.ReportUserPlugin = ReportUserPlugin;
//# sourceMappingURL=report.user.plugin.js.map