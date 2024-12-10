import { useQuery } from "@tanstack/react-query";

import { GET_DELETED_SIZES_KEY } from "../constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getDeletedSizes } from "../sizes.service.ts";

export function useGetDeletedSizes(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getDeletedSizes({
        page: fixedPage,
        pageSize,
        ...rest,
      }),
    queryKey: [GET_DELETED_SIZES_KEY, fixedPage, pageSize],
    staleTime: Infinity,
  });

  return { sizes: data, isLoading, isError };
}
