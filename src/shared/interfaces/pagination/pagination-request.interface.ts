export interface PaginationRequest {
  page?: number;
  pageSize?: number;
  sortAttribute?: string;
  sortOrder?: "asc" | "desc";
}
