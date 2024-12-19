import { PaginatedResponse } from "@shared/interfaces/pagination/paginated-response.interface.ts";

export interface Product {
  productId: string;
  name: string;
  description?: string;
  price: number;
  imagesURLS: string[];
  stock: number;
  color: string;
  sizeName: string;
  categoryId: string;
  categoryName: string;
  variantOfId?: string;
  variantOfName?: string;
  hasVariants: boolean;
}

export type ProductResponse = PaginatedResponse<Product>;
