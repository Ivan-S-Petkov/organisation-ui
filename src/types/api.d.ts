export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  total: number;
  total: number;
  page?: number;
  perPage?: number;
  pages?: number;
}
