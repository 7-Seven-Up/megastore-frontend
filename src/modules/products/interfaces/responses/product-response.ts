import { PaginatedResponse } from "@/shared/interfaces/pagination/paginated-response.interface.ts";

export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageURLS: string[];
  stock: number;
  color: string;
  sizeName: string;
  variantOfName: string;
}

export type ProductResponse = PaginatedResponse<Product>;
