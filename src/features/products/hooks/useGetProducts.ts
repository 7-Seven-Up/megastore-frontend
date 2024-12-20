import { useQuery } from "@tanstack/react-query";

import { GET_PRODUCTS_KEY } from "@/features/products/constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getProducts } from "@/features/products/products.service.ts";

export function useGetProducts(params: PaginationRequest, name?: string) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getProducts(
        {
          page: fixedPage,
          pageSize,
          ...rest,
        },
        {
          name,
        },
      ),
    queryKey: [GET_PRODUCTS_KEY, fixedPage, pageSize, name],
    staleTime: Infinity,
  });

  return {
    productResponse: data,
    isLoading,
  };
}
