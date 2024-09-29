import { PaginatedResponse } from "@/shared/interfaces/pagination/paginated-response.interface.ts";

export interface Product {
  variantOfName: string;
  color: string;
  description: string;
  imagesURLS: string[];
  name: string;
  price: number;
  productId: string;
  sizeName: string;
  stock: number;
}

export type ProductResponse = PaginatedResponse<Product>;
