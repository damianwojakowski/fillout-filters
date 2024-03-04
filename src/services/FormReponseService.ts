import axios from 'axios';
import { FilterClauseType } from '../models/FilterClauseType';
import { config } from '../config';

export class FormResponsesService {
  static async fetchFilteredResponses(formId: string, filters: FilterClauseType[]) {
    try {
      const response = await axios.get(`${config.fillout.baseUrl}/${formId}/responses`, {
        headers: { 'Authorization': `Bearer ${config.fillout.apiKey}` },
      });

      return response.data.responses.filter((response: any) => {
        return filters.every((filter: FilterClauseType) => {
          const question = response.questions.find((q: any) => q.id === filter.id);
          if (!question) return false;
          switch (filter.condition) {
            case 'equals': return question.value === filter.value;
            case 'does_not_equal': return question.value !== filter.value;
            case 'greater_than': return question.value > filter.value;
            case 'less_than': return question.value < filter.value;
            default: return false;
          }
        });
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch or filter responses');
    }
  }
}