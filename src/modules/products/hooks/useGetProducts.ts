import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS_KEY } from "@products/constants.ts";
import { getProducts } from "@products/product.service.ts";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface.ts";

export function useGetProducts(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getProducts({
        page: fixedPage,
        pageSize,
        ...rest,
      }),
    queryKey: [GET_PRODUCTS_KEY, fixedPage],
    staleTime: Infinity,
  });

  return {
    productResponse: data,
    isLoading,
  };
}
