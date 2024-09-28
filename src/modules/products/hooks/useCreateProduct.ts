import { useMutation } from "@tanstack/react-query";
import { CREATE_PRODUCTS_KEY } from "@products/constants.ts";
import { createProduct } from "@products/product.service.ts";

export function useCreateProduct() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: [CREATE_PRODUCTS_KEY],
    mutationFn: createProduct,
  });

  return {
    createProduct: mutateAsync,
    isCreating: isPending,
  };
}
