import { Product } from "./product.interface";

export interface ProductResponse {
    content: Product[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    imageURLS: string[];
}