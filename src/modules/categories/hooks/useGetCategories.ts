import { useQuery } from "@tanstack/react-query";
import { GET_CATEGORIES_KEY } from "@/modules/categories/constants.ts";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface.ts";
import { getAllCategories } from "@/modules/categories/categories.service.ts";

export function useGetCategories(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getAllCategories({
        page: page - 1 < 0 ? page : page - 1,
        pageSize,
        ...rest,
      }),
    queryKey: [GET_CATEGORIES_KEY, page, pageSize],
    staleTime: Infinity,
  });

  return { data, isLoading, isError };
}
