export interface UpdateCategoryRequest {
  categoryId: string;
  description: string | null;
  name: string;
  superCategoryId: string | null;
}
