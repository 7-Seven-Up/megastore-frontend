import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { httpClient } from "@shared/lib/httpClient.ts";
import { CreateProductParams } from "@/features/products/interfaces/requests/create-product.interface.ts";
import {
  Product,
  ProductResponse,
} from "@/features/products/interfaces/responses/product-response.interface.ts";
import { UpdateProductParams } from "@/features/products/interfaces/requests/update-product.interface.ts";
import { AVAILABLE_CATEGORIES } from "@/features/categories/constants.ts";

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

export async function getProducts(
  params: PaginationRequest,
  {
    name,
    category,
  }: {
    name?: string;
    category?: AVAILABLE_CATEGORIES;
  },
) {
  const queryParams = new URLSearchParams(params as Record<string, string>);

  if (category) {
    queryParams.append("category", category);
  }

  if (name) {
    queryParams.append("name", name);
  }

  const response = await httpClient.get<ProductResponse>(PRODUCTS_URL, {
    params: queryParams,
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

export async function updateProduct(params: UpdateProductParams) {
  const { productId, updateProductRequest, multipartFiles } = params;
  const formData = new FormData();

  const updateProductBlob = new Blob([JSON.stringify(updateProductRequest)], {
    type: "application/json",
  });

  formData.append("updateProductRequest", updateProductBlob);

  if (multipartFiles && multipartFiles.length > 0) {
    multipartFiles.forEach((file) => {
      formData.append("multipartFiles", file, file.name);
    });
  }

  const response = await httpClient.patch<Product>(`${PRODUCTS_URL}/${productId}`, formData);
  return response.data;
}
