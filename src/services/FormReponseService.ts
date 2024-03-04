import axios from 'axios';
import { config } from '../config';
import { FilterClauseType } from '../models/FilterClauseType';
import { FetchFilteredResponses, Question } from '../models/FetchFilteredResponses';

export class FormResponsesService {
    static async fetchFilteredResponses(formId: string, filters: FilterClauseType[]): Promise<FetchFilteredResponses['responses']> {
        const response = await axios.get<FetchFilteredResponses>(`${config.fillout.baseUrl}/${formId}/submissions`, {
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
        const questionDate = this.parseISODate(question.value);
        const filterDate = this.parseISODate(filter.value);

        const canBeDateComparison = filter.condition === 'greater_than' || filter.condition === 'less_than';

        if (questionDate && filterDate && canBeDateComparison) {
            return filter.condition === 'greater_than' ?
                questionDate > filterDate :
                questionDate < filterDate;
        }

        switch (filter.condition) {
            case 'equals': return question.value.toString() === filter.value.toString();
            case 'does_not_equal': return question.value.toString() !== filter.value.toString();
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
