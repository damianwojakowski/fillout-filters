
import { Request, Response } from 'express';
import { FormResponsesService } from '../services/FormReponseService';
import { FilterClauseType } from '../models/FilterClauseType';
import { FormReponseUtility } from '../utils/FormResponseUtility';
import { ApiQueryParams } from '../models/ApiQueryParams';

export class FormResponsesController {
    static async getFilteredResponses(req: Request, res: Response) {
        try {
            const { formId } = req.params;
            const queryParams: ApiQueryParams = FormReponseUtility.getQueryParameters(req);
            const filters: FilterClauseType[] = FormReponseUtility.getFilters(req);
            const filteredResponses = await FormResponsesService.fetchFilteredResponses(formId, queryParams, filters);
            res.json(filteredResponses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Request failed. Make sure you're providing correct parameters." });
        }
    }

    static async getMainPage(req: Request, res: Response) {
        res.json({
            "text": "go to /{formId}/filteredResponses for testing this app."
        });
    }
}