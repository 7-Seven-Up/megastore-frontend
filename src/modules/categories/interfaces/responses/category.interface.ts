export interface Category {
  categoryId: string;
  description: string;
  name: string;
  superCategoryName?: string | null;
  superCategoryId: string | null;
}
