import { ApiQueryParams } from "../models/ApiQueryParams";
import { FilterClauseType } from "../models/FilterClauseType";
import { Request } from 'express';

export class FormReponseUtility {
    public static getFilters(req: Request): FilterClauseType[] {
        const filters: FilterClauseType[] = req.query.filters ? JSON.parse(req.query.filters as string) : [];
        const nonEmptyFilters: FilterClauseType[] = filters.filter(filter => Object.keys(filter).length > 0);

        return nonEmptyFilters;
    }

    public static getQueryParameters(req: Request): ApiQueryParams {
        return {
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
            afterDate: req.query.afterDate as string,
            beforeDate: req.query.beforeDate as string,
            status: req.query.status as string,
            includeEditLink: req.query.includeEditLink === 'true',
            sort: req.query.sort as 'asc' | 'desc',
        };
    }
}
