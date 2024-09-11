export interface PaginationRequest {
  pageNumber?: number;
  pageSize?: number;
  sortAttribute?: string;
  sortOrder?: "asc" | "desc";
}
