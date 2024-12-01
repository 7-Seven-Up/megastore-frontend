import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DELETE_PRODUCTS_KEY } from "@products/constants.ts";
import { deleteProduct } from "@products/products.service.ts";
import { invalidateProductsQueries } from "@products/products.utilities.ts";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteProduct,
    mutationKey: [DELETE_PRODUCTS_KEY],
    onSuccess: async () => {
      await invalidateProductsQueries(queryClient);
    },
  });

  return {
    deleteProduct: mutateAsync,
    isDeleting: isPending,
  };
}
