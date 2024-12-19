interface UpdateProductRequest {
  description?: string;
  name: string;
  price: number;
  variantOfId?: string;
}

export interface UpdateProductParams {
  productId: string;
  updateProductRequest: UpdateProductRequest;
  multipartFiles?: File[];
}
