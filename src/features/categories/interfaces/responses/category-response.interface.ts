import { Category } from "@/features/categories/interfaces/responses/category.interface.ts";
import { PaginatedResponse } from "@shared/interfaces/pagination/paginated-response.interface.ts";

export type CategoryResponse = PaginatedResponse<Category>;
