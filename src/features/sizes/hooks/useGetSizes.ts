import { useQuery } from "@tanstack/react-query";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getSizes } from "../sizes.service.ts";
import { GET_SIZES_KEY } from "../constants.ts";

export function useGetSizes(params: PaginationRequest) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getSizes({
        page: fixedPage,
        pageSize,
        ...rest,
      }),
    queryKey: [GET_SIZES_KEY, fixedPage, pageSize],
    staleTime: Infinity,
  });

  return { sizes: data, isLoading, isError };
}
