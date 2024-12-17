export interface ResponseList<T> {
  pageNumber: number;
  pageSize: number;
  list: T[];
  totalItems: number;
  totalPages: number;
}