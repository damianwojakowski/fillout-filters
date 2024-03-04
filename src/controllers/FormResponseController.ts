
import { Request, Response } from 'express';
import { FormResponsesService } from '../services/FormReponseService';
import { FilterClauseType } from '../models/FilterClauseType';
import { FormReponseUtility } from '../utils/FormResponseUtility';
import { APIQueryParams } from '../models/ApiQueryParams';

export class FormResponsesController {
    static async getFilteredResponses(req: Request, res: Response) {
        const { formId } = req.params;
        const queryParams: APIQueryParams = FormReponseUtility.getQueryParameters(req);
        const filters: FilterClauseType[] = FormReponseUtility.getFilters(req);

        try {
            const filteredResponses = await FormResponsesService.fetchFilteredResponses(formId, queryParams, filters);
            res.json(filteredResponses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    }

    static async getMainPage(req: Request, res: Response) {
        res.json({
            "text": "go to /{formId}/filteredResponses for testing this app."
        });
    }
}