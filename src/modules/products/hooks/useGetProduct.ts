import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCT } from "../constants";
import { getProduct } from "../product.service";

export const useGetProduct = (productId?: string) => {
  const { data } = useQuery({
    queryFn: () => {
      if (!productId) {
        return;
      }
      return getProduct(productId);
    },
    queryKey: [GET_PRODUCT],
    staleTime: Infinity,
  });

  return {
    data,
  };
};
