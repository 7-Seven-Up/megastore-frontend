import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_PRODUCTS_KEY, GET_PRODUCTS_KEY } from "@products/constants.ts";
import { deleteProduct } from "@products/products.service.ts";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteProduct,
    mutationKey: [DELETE_PRODUCTS_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_PRODUCTS_KEY],
      });
    },
  });

  return {
    deleteProduct: mutateAsync,
    isDeleting: isPending,
  };
}
