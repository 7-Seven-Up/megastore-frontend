interface CreateProductRequest {
  categoryId: string;
  color: string;
  description: string | null;
  name: string;
  price: number;
  sizeId: string;
  stock: number;
  variantOfId: string | null;
}

export interface CreateProductParams {
  createProductRequest: CreateProductRequest;
  multipartFiles: File[];
}
