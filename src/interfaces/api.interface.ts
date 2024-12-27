export interface ApiResponse<T> {
  currentPage: number;
  count: number;
  totalPages: number;
  items: T;
  length?: number
}