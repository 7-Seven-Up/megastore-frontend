import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";

export interface OrderDetailResponse {
  orderDetailId: string;
  quantity: number;
  product: Product;
}
