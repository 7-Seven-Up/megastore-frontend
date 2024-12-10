import { useQuery } from "@tanstack/react-query";

import { GET_DELETED_PRODUCTS_KEY } from "@/features/products/constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getDeletedProducts } from "@/features/products/products.service.ts";

export function useGetDeletedProducts(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading } = useQuery({
    queryFn: () => getDeletedProducts({ pageSize, page: fixedPage, ...rest }),
    queryKey: [GET_DELETED_PRODUCTS_KEY, fixedPage, pageSize],
    staleTime: Infinity,
  });

  return { deletedProducts: data, isLoading };
}
