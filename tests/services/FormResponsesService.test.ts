import { Question } from '../../src/models/FetchFilteredResponses';
import { FilterClauseType } from '../../src/models/FilterClauseType';
import { FormResponsesService } from '../../src/services/FormReponseService';

describe('FormResponsesService', () => {
    describe('matchesFilter', () => {
      it('equals condition for strings', () => {
        const question: Question = { id: '1', name: 'Name', type: 'ShortAnswer', value: 'Alice' };
        const filter: FilterClauseType = { id: '1', condition: 'equals', value: 'Alice' };
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(true);
      });
  
      it('does_not_equal condition for strings', () => {
        const question: Question = { id: '1', name: 'Name', type: 'ShortAnswer', value: 'Alice' };
        const filter: FilterClauseType = { id: '1', condition: 'does_not_equal', value: 'Bob' };
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(true);
      });
  
      it('greater_than condition for numbers', () => {
        const question: Question = { id: '1', name: 'Age', type: 'Number', value: 30 };
        const filter: FilterClauseType = { id: '1', condition: 'greater_than', value: 20 };
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(true);
      });
  
      it('less_than condition for numbers', () => {
        const question: Question = { id: '1', name: 'Age', type: 'Number', value: 30 };
        const filter: FilterClauseType = { id: '1', condition: 'less_than', value: 40 };
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(true);
      });
  
      it('greater_than condition for dates', () => {
        const question: Question = { id: '1', name: 'Date of Birth', type: 'DatePicker', value: '1990-01-01T00:00:00.000Z' };
        const filter: FilterClauseType = { id: '1', condition: 'greater_than', value: '1980-01-01T00:00:00.000Z' };
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(true);
      });
  
      it('less_than condition for dates', () => {
        const question: Question = { id: '1', name: 'Date of Birth', type: 'DatePicker', value: '1990-01-01T00:00:00.000Z' };
        const filter: FilterClauseType = { id: '1', condition: 'less_than', value: '2000-01-01T00:00:00.000Z' };
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(true);
      });
  
      it('should return false when comparing string with greater_than condition', () => {
        const question: Question = { id: '1', name: 'Name', type: 'ShortAnswer', value: 'Alice' };
        const filter: FilterClauseType = { id: '1', condition: 'greater_than', value: 'Bob' }; // Invalid comparison
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(false);
      });
  
      it('should return false when comparing date with equals condition to non-date string', () => {
        const question: Question = { id: '1', name: 'Date of Birth', type: 'DatePicker', value: '1990-01-01T00:00:00.000Z' };
        const filter: FilterClauseType = { id: '1', condition: 'equals', value: '1990-01-01' }; // Different format
        expect(FormResponsesService.matchesFilter(question, filter)).toBe(false);
      });
    });
  });
