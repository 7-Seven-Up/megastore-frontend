import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DELETE_PRODUCTS_KEY } from "@/features/products/constants.ts";
import { deleteProduct } from "@/features/products/products.service.ts";
import { invalidateProductsQueries } from "@/features/products/products.utilities.ts";

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
