import { CreateProductParams } from "@products/interfaces/requests/create-product.interface.ts";
import {
  Product,
  ProductResponse,
} from "@products/interfaces/responses/product-response.interface.ts";
import { httpClient } from "@/shared/lib/httpClient.ts";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface.ts";

const PRODUCTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/products`;

export async function createProduct(params: CreateProductParams) {
  const { createProductRequest, multipartFiles } = params;
  const formData = new FormData();

  const createProductBlob = new Blob([JSON.stringify(createProductRequest)], {
    type: "application/json",
  });
  formData.append("createProductRequest", createProductBlob);

  multipartFiles.forEach((image) => {
    formData.append("multipartFiles", image);
  });

  const response = await httpClient.post<Product>(PRODUCTS_URL, formData);
  return response.data;
}

export async function getProducts(params: PaginationRequest) {
  const response = await httpClient.get<ProductResponse>(PRODUCTS_URL, {
    params,
  });

  return response.data;
}

export async function getDeletedProducts(params: PaginationRequest) {
  const response = await httpClient.get<ProductResponse>(`${PRODUCTS_URL}/deleted`, {
    params,
  });
  return response.data;
}

export async function getProductDetail(productId: string) {
  const response = await httpClient.get<Product>(`${PRODUCTS_URL}/${productId}`);
  return response.data;
}

export async function getProductVariants(productId: string) {
  const response = await httpClient.get<Product[]>(`${PRODUCTS_URL}/${productId}/variants`);
  return response.data;
}

export async function deleteProduct(productId: string) {
  await httpClient.delete(`${PRODUCTS_URL}/${productId}`);
}

export async function restoreProduct(productId: string) {
  const response = await httpClient.post<Product>(`${PRODUCTS_URL}/${productId}/restore`);
  return response.data;
}
