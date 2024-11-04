import { PaginatedResponse } from "@/shared/interfaces/pagination/paginated-response.interface.ts";

export interface Product {
  productId: string;
  name: string;
  description?: string;
  price: number;
  imagesURLS: string[];
  stock: number;
  color: string;
  sizeName: string;
  variantOfId?: string;
}

export type ProductResponse = PaginatedResponse<Product>;
