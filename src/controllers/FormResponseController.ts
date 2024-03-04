
import { Request, Response } from 'express';
import { FormResponsesService } from '../services/FormReponseService';
import { FilterClauseType } from '../models/FilterClauseType';

export class FormResponsesController {
  static async getFilteredResponses(req: Request, res: Response) {
    const { formId } = req.params;
    const filters: FilterClauseType[] = req.query.filters ? JSON.parse(req.query.filters as string) : [];
    
    try {
      const filteredResponses = await FormResponsesService.fetchFilteredResponses(formId, filters);
      res.json({
        responses: filteredResponses,
        totalResponses: filteredResponses.length,
        // Implement pagination logic here if necessary
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }
}