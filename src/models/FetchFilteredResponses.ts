export interface Question {
  id: string;
  name: string;
  type: string; 
  value: string | number;
}

export interface FormResponse {
  questions: Question[];
  submissionId: string;
  submissionTime: string; // ISO 8601 date string.
}

export interface FetchFilteredResponses {
  responses: FormResponse[];
  totalResponses: number;
  pageCount?: number;
}
