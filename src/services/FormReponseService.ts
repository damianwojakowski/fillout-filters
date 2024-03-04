import axios, { AxiosResponse } from 'axios';
import { config } from '../config';
import { FilterClauseType } from '../models/FilterClauseType';
import { FetchFilteredResponses, Question, FormResponse } from '../models/FetchFilteredResponses';
import { ApiQueryParams } from '../models/ApiQueryParams';

export class FormResponsesService {
    static async fetchFilteredResponses(formId: string, queryParams: ApiQueryParams, filters: FilterClauseType[]): Promise<FetchFilteredResponses> {
        if (this.areFiltersEmpty(filters)) {
            return (await this.getResponsesFromFilloutApi(formId, queryParams)).data;
        }

        queryParams.limit = 150;
        const response: AxiosResponse<FetchFilteredResponses, any> = await this.getResponsesFromFilloutApi(formId, queryParams);
        const filteredResponses = FormResponsesService.filterResponses(response, filters);

        return this.createResponseWithFilters(queryParams, filteredResponses);
    }

    private static areFiltersEmpty(filters: FilterClauseType[]) {
        return (!filters || filters.length === 0);
    }

    private static filterResponses(response: AxiosResponse<FetchFilteredResponses, any>, filters: FilterClauseType[]) {
        return response.data.responses.filter(
            response => filters.every(
                filter => response.questions.some(question => this.matchesFilter(question, filter))
            ));
    }

    private static createResponseWithFilters(queryParams: ApiQueryParams, filteredResponses: FormResponse[]) {
        const pageSize = queryParams.limit ? queryParams.limit : 150;
        const offset = queryParams.offset ? queryParams.offset : 0;
        const paginatedResponses = filteredResponses.slice(offset, offset + pageSize);
        const totalResponses = filteredResponses.length;
        const pageCount = Math.ceil(totalResponses / pageSize);

        return {
            responses: paginatedResponses,
            pageCount: pageCount,
            totalResponses: totalResponses
        };
    }

    private static async getResponsesFromFilloutApi(formId: string, queryParams: ApiQueryParams) {
        return await axios.get<FetchFilteredResponses>(`${config.fillout.baseUrl}/${formId}/submissions`, {
            headers: { 'Authorization': `Bearer ${config.fillout.apiKey}` },
            params: queryParams
        });
    }

    public static matchesFilter(question: Question, filter: FilterClauseType): boolean {
        const questionDate = this.parseISODate(question.value);
        const filterDate = this.parseISODate(filter.value);

        const canBeDateComparison = filter.condition === 'greater_than' || filter.condition === 'less_than';

        if (questionDate && filterDate && canBeDateComparison) {
            return filter.condition === 'greater_than' ?
                questionDate > filterDate :
                questionDate < filterDate;
        }

        switch (filter.condition) {
            case 'equals': return question.value === filter.value
            case 'does_not_equal': return question.value != filter.value;
            case 'greater_than': return typeof question.value === 'number' && question.value > Number(filter.value);
            case 'less_than': return typeof question.value === 'number' && question.value < Number(filter.value);
            default: return false;
        }
    }

    private static parseISODate(value: string | number): Date | null {
        if (typeof value === 'string') {
            const date = new Date(value);

            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return null;
    }
}
