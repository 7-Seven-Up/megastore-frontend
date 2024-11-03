import { useQuery } from "@tanstack/react-query";

import { GET_PRODUCT_VARIANTS_KEY } from "@products/constants.ts";
import { getProductVariants } from "@products/products.service.ts";

export function useGetProductVariants(productId: string) {
  const { data: productVariants, isLoading } = useQuery({
    queryFn: () => getProductVariants(productId),
    queryKey: [GET_PRODUCT_VARIANTS_KEY, productId],
    staleTime: Infinity,
  });

  return {
    productVariants,
    isLoading,
  };
}
