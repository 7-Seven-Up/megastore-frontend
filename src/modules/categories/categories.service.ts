import { httpClient } from "@/shared/lib/httpClient.ts";
import { CategoryResponse } from "@/modules/categories/interfaces/responses/category-response.interface.ts";
import { CreateCategoryRequest } from "@/modules/categories/interfaces/requests/create-category.interface.ts";
import { Category } from "@/modules/categories/interfaces/responses/category.interface.ts";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface.ts";
import { UpdateCategoryRequest } from "@/modules/categories/interfaces/requests/update-category.interface.ts";

const CATEGORIES_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`;

export async function getAllCategories(params: PaginationRequest) {
  const response = await httpClient.get<CategoryResponse>(CATEGORIES_URL, {
    params,
  });
  return response.data;
}

export async function getDeletedCategories(params: PaginationRequest) {
  const response = await httpClient.get<CategoryResponse>(
    `${CATEGORIES_URL}/deleted`,
    {
      params,
    },
  );
  return response.data;
}

export async function deleteCategory(categoryId: string) {
  await httpClient.delete(`${CATEGORIES_URL}/${categoryId}`);
}

export async function restoreCategory(categoryId: string) {
  await httpClient.post(`${CATEGORIES_URL}/${categoryId}/restore`);
}

export async function createCategory(params: CreateCategoryRequest) {
  const response = await httpClient.post<Category>(CATEGORIES_URL, {
    ...params,
  });
  return response.data;
}

export async function updateCategory(params: UpdateCategoryRequest) {
  const response = await httpClient.put<Category>(
    `${CATEGORIES_URL}/${params.categoryId}`,
    {
      ...params,
    },
  );
  return response.data;
}
