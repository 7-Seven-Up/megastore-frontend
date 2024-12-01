import { useQuery } from "@tanstack/react-query";

import { GET_DELETE_CATEGORIES_KEY } from "@categories/constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getDeletedCategories } from "@categories/categories.service.ts";

export function useGetDeletedCategories(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading } = useQuery({
    queryFn: () => getDeletedCategories({ page: fixedPage, pageSize, ...rest }),
    queryKey: [GET_DELETE_CATEGORIES_KEY, fixedPage, pageSize],
    staleTime: Infinity,
  });

  return { deletedCategories: data, isLoading };
}
