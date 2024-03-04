export interface ApiQueryParams {
  limit?: number;
  offset?: number;
  afterDate?: string;
  beforeDate?: string;
  status?: string;
  includeEditLink?: boolean;
  sort?: 'asc' | 'desc';
}
