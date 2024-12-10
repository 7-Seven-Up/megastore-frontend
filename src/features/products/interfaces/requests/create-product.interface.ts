interface CreateProductRequest {
  categoryId: string;
  color: string;
  description?: string;
  name: string;
  price: number;
  sizeId: string;
  stock: number;
  variantOfId?: string;
}

export interface CreateProductParams {
  createProductRequest: CreateProductRequest;
  multipartFiles: File[];
}
