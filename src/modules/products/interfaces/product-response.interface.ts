import { PaginatedResponse } from "@/shared/interfaces/pagination/paginated-response.interface.ts";

export interface Product {
    imagesURLS: string[];
    productId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    color: string;
    sizeName: string;
    VariantOfName: string;
}

export type ProductResponse = PaginatedResponse<Product>;