import { useQuery } from "@tanstack/react-query";

import { AVAILABLE_CATEGORIES } from "@/features/categories/constants.ts";
import { GET_PRODUCTS_BY_CATEGORY_KEY } from "@/features/products/constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getProducts } from "@/features/products/products.service.ts";

export function useGetProductByCategory(
  params: PaginationRequest,
  category?: AVAILABLE_CATEGORIES,
) {
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
          category,
        },
      ),
    queryKey: [GET_PRODUCTS_BY_CATEGORY_KEY, category],
    staleTime: Infinity,
  });

  return {
    productResponse: data,
    isLoading,
  };
}
