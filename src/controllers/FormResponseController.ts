
import { Request, Response } from 'express';
import { FormResponsesService } from '../services/FormReponseService';
import { FilterClauseType } from '../models/FilterClauseType';

export class FormResponsesController {
    static async getFilteredResponses(req: Request, res: Response) {
        const { formId } = req.params;
        const queryParams = {
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
            afterDate: req.query.afterDate as string,
            beforeDate: req.query.beforeDate as string,
            status: req.query.status as string,
            includeEditLink: req.query.includeEditLink === 'true',
            sort: req.query.sort as 'asc' | 'desc',
        };
        const filters: FilterClauseType[] = req.query.filters ? JSON.parse(req.query.filters as string) : [];

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