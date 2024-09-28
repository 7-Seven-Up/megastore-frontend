import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCT } from "../constants";
import { getProduct } from "../product.service";

export const useGetProduct = (productId?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      if (!productId) {
        return;
      }
      const product = await getProduct(productId);
      console.log("Producto obtenido:", product);
      return product;
    },
    queryKey: [GET_PRODUCT, productId],
    staleTime: Infinity,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
