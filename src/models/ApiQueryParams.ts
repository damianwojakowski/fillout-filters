export interface APIQueryParams {
  limit?: number;
  offset?: number;
  afterDate?: string;
  beforeDate?: string;
  status?: string;
  includeEditLink?: boolean;
  sort?: 'asc' | 'desc';
}
