import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREATE_PRODUCTS_KEY, GET_PRODUCTS_KEY } from "@products/constants.ts";
import { createProduct } from "@products/products.service.ts";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [CREATE_PRODUCTS_KEY],
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_PRODUCTS_KEY],
      });
    },
  });

  return {
    createProduct: mutateAsync,
    isCreating: isPending,
  };
}
