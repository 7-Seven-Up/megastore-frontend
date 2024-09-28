import { httpClient } from "@/shared/lib/httpClient.ts";
import { ProductResponse } from "./interfaces/product-response.interface";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface.ts";

const PRODUCTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`;

export async function getAllProducts(params: PaginationRequest) {
  const response = await httpClient.get<ProductResponse>(PRODUCTS_URL, {
    params,
  });
  return response.data;
}