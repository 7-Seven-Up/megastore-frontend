import { QueryClient } from "@tanstack/react-query";

import {
  GET_DELETED_PRODUCTS_KEY,
  GET_PRODUCT_VARIANTS_KEY,
  GET_PRODUCTS_KEY,
} from "@/features/products/constants.ts";
import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";

export async function invalidateProductsQueries(queryClient: QueryClient, product?: Product) {
  const queriesToInvalidate = [
    { queryKey: [GET_DELETED_PRODUCTS_KEY] },
    { queryKey: [GET_PRODUCTS_KEY] },
  ];

  if (product) {
    queriesToInvalidate.push({
      queryKey: [
        GET_PRODUCT_VARIANTS_KEY,
        // Only invalidate variants of the affected product
        product.variantOfId ?? product.productId,
      ],
    });
  }

  await Promise.all(queriesToInvalidate.map((query) => queryClient.invalidateQueries(query)));
}
