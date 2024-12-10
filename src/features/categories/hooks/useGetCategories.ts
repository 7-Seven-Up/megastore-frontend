import { useQuery } from "@tanstack/react-query";
import { GET_CATEGORIES_KEY } from "@/features/categories/constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getAllCategories } from "@/features/categories/categories.service.ts";

export function useGetCategories(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getAllCategories({
        page: fixedPage,
        pageSize,
        ...rest,
      }),
    queryKey: [GET_CATEGORIES_KEY, fixedPage, pageSize],
    staleTime: Infinity,
  });

  return { categories: data, isLoading, isError };
}
