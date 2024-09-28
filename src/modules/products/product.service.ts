import { httpClient } from "@/shared/lib/httpClient";
import { ProductResponse } from "./interfaces/responses/product-response.interface";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getProduct = async (productId: string) => {
  const response = await httpClient.get<ProductResponse>(
    BACKEND_URL + "/api/v1/products/" + productId,
  );
  return response.data;
};
