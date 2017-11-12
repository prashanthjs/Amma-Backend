import * as Mongoose from 'mongoose';

export interface IFilter {
    field: string;
    operator?: string;
    value: any;
}

export interface ISort {
    field: string;
    dir?: string;
}

export interface IFilters {
    filter: IFilter[] | IFilter;
    logic?: string;
}


export interface IOptions {
    filter?: string | IFilters[] | IFilters;
    page?: number | string;
    pageSize?: number | string;
    skip?: number | string;
    sort?: string | ISort[] | ISort;
    take?: number | string;
}

export interface IParseResult {
    page: number;
    pageSize: number;
    sort: Object;
    filter: Object;
}

export class QueryParser {
    private page: number;
    private pageSize: number;
    private sort: any;
    private filter: any;
    private schema: Mongoose.Schema;

    parse(options: IOptions, schema: Mongoose.Schema): IParseResult {

        this.schema = schema;
        this.page = options.page ? ( typeof options.page === 'string' ? +options.page : options.page) : 1;
        this.pageSize = options.pageSize ? ( typeof options.pageSize === 'string' ? +options.pageSize : options.pageSize) : 10;

        this.filter = options.filter ?
            (typeof options.filter === 'string' ?
                this.parseAndReturnFilters(JSON.parse(options.filter)) : this.parseAndReturnFilters(options.filter))
            : {};

        this.sort = options.sort ?
            (typeof options.sort === 'string' ?
                this.parseAndReturnSort(JSON.parse(options.sort)) : this.parseAndReturnSort(options.sort))
            : {};

        return {
            page: this.page,
            pageSize: this.pageSize,
            filter: this.filter,
            sort: this.sort
        };
    }

    private parseAndReturnFilters(filters: IFilters[] | IFilters, logic = 'and'): Object {
        let ret = {};
        let tempFilters = [];
        if (!(filters instanceof Array)) {
            tempFilters[0] = filters;
        } else {
            tempFilters = filters;
        }
        let temp = [];
        for (let i = 0; i < tempFilters.length; i++) {
            if (tempFilters[i].filters) {
                temp.push(this.parseAndReturnFilters(tempFilters[i].filters, tempFilters[i].logic));
            } else {
                temp.push(this.parseAndReturnFilter(tempFilters[i]));
            }
        }
        if (temp.length) {
            ret['$' + logic] = temp;
        }
        return ret;
    }

    private parseAndReturnFilter(filter: IFilter): Object {
        let temp = {};
        temp[filter.field] = this.parseAndReturnValue(filter.field, filter.value, filter.operator);
        return temp;
    }

    private parseAndReturnSort(sorts: ISort[] | ISort): Object {
        let ret = {};
        let tempSorts = [];
        if (!(sorts instanceof Array)) {
            tempSorts[0] = sorts;
        } else {
            tempSorts = sorts;
        }
        for (let i = 0; i < tempSorts.length; i++) {
            if (tempSorts[i].dir) {
                ret[tempSorts[i].field] = tempSorts[i].dir;
            }
        }
        return ret;
    }

    private getParsedObject(key: string): any {
        let field: any = this.schema.path(key);
        if (field && field.options) {
            return field.options;
        }
        return false;
    }

    private getType(field: string): string {
        let obj = this.getParsedObject(field);
        let type = 'none';
        if (obj) {
            switch (obj.type) {
                case String:
                    type = 'string';
                    break;
                case Number:
                    type = 'number';
                    break;
                case Date:
                    type = 'date';
                    break;
                case Boolean:
                    type = 'boolean';
                    break;
                default:
                    type = 'none';
                    break;
            }
        }
        return type;
    }

    private parseAndReturnValue(field: string, value: any, operator: string = 'eq'): any {
        let type = this.getType(field);
        switch (operator) {
            case 'contains':
                value = {$regex: new RegExp(value, 'i')};
                break;
            case 'doesnotcontain':
                value = {$ne: {$regex: new RegExp(value, 'i')}};
                break;
            case 'startswith':
                value = {$regex: new RegExp('^' + value, 'i')};
                break;
            case 'endswith':
                value = {$regex: new RegExp(value + '$', 'i')};
                break;
            case 'eq':
                if (type === 'string') {
                    value = {$regex: new RegExp('^' + value + '$', 'i')};
                }
                if (type === 'date') {
                    value = {$eq: new Date(value)};
                }
                break;
            case 'ne':
                if (type === 'date') {
                    value = new Date(value);
                }
                value = {$ne: value};
                break;
            case 'gt':
                if (type === 'date') {
                    value = new Date(value);
                }
                value = {$gt: value};
                break;
            case 'gte':
                if (type === 'date') {
                    value = new Date(value);
                }
                value = {$gte: value};
                break;
            case 'lt':
                if (type === 'date') {
                    value = new Date(value);
                }
                value = {$lt: value};
                break;
            case 'lte':
                if (type === 'date') {
                    value = new Date(value);
                }
                value = {$lte: value};
                break;
            default:
                break;
        }
        return value;
    }
}