import { useQuery } from "@tanstack/react-query";

import { GET_PRODUCT_DETAIL_KEY } from "@/features/products/constants.ts";
import { getProductDetail } from "@/features/products/products.service.ts";

export function useGetProductDetail(productId: string) {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [GET_PRODUCT_DETAIL_KEY, productId],
    queryFn: () => getProductDetail(productId),
    staleTime: Infinity,
    retry: false,
  });

  return {
    product,
    isLoading,
    isError,
  };
}
