export interface ProductResponse {
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
