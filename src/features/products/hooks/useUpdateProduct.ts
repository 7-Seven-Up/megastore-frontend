import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  GET_PRODUCT_DETAIL_KEY,
  GET_PRODUCTS_KEY,
  UPDATE_PRODUCTS_KEY,
} from "@/features/products/constants.ts";
import { updateProduct } from "@/features/products/products.service.ts";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProduct,
    mutationKey: [UPDATE_PRODUCTS_KEY],
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_PRODUCTS_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_PRODUCT_DETAIL_KEY],
        }),
      ]);
    },
  });

  return {
    updateProduct: mutateAsync,
    isUpdating: isPending,
  };
}
