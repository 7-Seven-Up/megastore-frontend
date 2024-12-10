import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";
import { RESTORE_PRODUCT_KEY } from "@/features/products/constants.ts";
import { invalidateProductsQueries } from "@/features/products/products.utilities.ts";
import { restoreProduct } from "@/features/products/products.service.ts";

export function useRestoreProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (product: Product) => restoreProduct(product.productId),
    mutationKey: [RESTORE_PRODUCT_KEY],
    onSuccess: async (product: Product) => {
      await invalidateProductsQueries(queryClient, product);
    },
  });

  return { restoreProduct: mutateAsync };
}
