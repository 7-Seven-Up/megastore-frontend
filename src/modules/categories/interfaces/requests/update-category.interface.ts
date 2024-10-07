export interface UpdateCategoryRequest {
  categoryId: string;
  description?: string;
  name: string;
  superCategoryId?: string;
}
