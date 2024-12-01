import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "@products/interfaces/responses/product-response.interface.ts";
import { RESTORE_PRODUCT_KEY } from "@products/constants.ts";
import { invalidateProductsQueries } from "@products/products.utilities.ts";
import { restoreProduct } from "@products/products.service.ts";

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
