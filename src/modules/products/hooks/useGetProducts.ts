import { useQuery } from "@tanstack/react-query";
import { GET_PRODUCTS_KEY } from "@/modules/products/constants.ts";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface.ts";
import { getAllProducts } from "@/modules/products/products.service.ts";

export function useGetProducts(params: PaginationRequest) {
  const { pageSize = 12, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getAllProducts({ 
        page: fixedPage,
        pageSize,
        ...rest,
      }),
    queryKey: [GET_PRODUCTS_KEY, fixedPage, pageSize],
    staleTime: Infinity,
  });

  return { data, isLoading, isError };
}
