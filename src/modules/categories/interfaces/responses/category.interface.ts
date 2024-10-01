export interface Category {
  categoryId: string;
  description: string | null;
  name: string;
  superCategoryName: string | null;
  superCategoryId: string | null;
}
