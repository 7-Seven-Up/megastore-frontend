import { CreateProductParams } from "@products/interfaces/requests/create-product.interface.ts";
import { Product } from "@products/interfaces/responses/product-response.ts";
import { httpClient } from "@/shared/lib/httpClient.ts";

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
