import axios from 'axios';
import { config } from '../config';
import { FilterClauseType } from '../models/FilterClauseType';
import { FetchFilteredResponses, Question } from '../models/FetchFilteredResponses';

export class FormResponsesService {
    static async fetchFilteredResponses(formId: string, filters: FilterClauseType[]): Promise<FetchFilteredResponses['responses']> {
        const response = await axios.get<FetchFilteredResponses>(`${config.fillout.baseUrl}/${formId}/responses`, {
            headers: { 'Authorization': `Bearer ${config.fillout.apiKey}` },
        });

        const filteredResponses = response.data.responses.filter(response =>
            filters.every(filter =>
                response.questions.some(question => this.matchesFilter(question, filter))
            )
        );

        return filteredResponses;
    }

    public static matchesFilter(question: Question, filter: FilterClauseType): boolean {
        switch (filter.condition) {
            case 'equals': return question.value.toString() === filter.value.toString();
            case 'does_not_equal': return question.value.toString() !== filter.value.toString();
            case 'greater_than': return typeof question.value === 'number' && question.value > Number(filter.value);
            case 'less_than': return typeof question.value === 'number' && question.value < Number(filter.value);
            default: return false;
        }
    }
}