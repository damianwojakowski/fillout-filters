export interface Question {
  id: string;
  name: string;
  type: string; 
  value: string | number;
}

export interface FormResponse {
  questions: Question[];
  submissionId: string;
  submissionTime: string;
}

export interface FetchFilteredResponses {
  responses: FormResponse[];
  totalResponses: number;
  pageCount?: number;
}
