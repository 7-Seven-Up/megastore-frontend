import { useInfiniteQuery } from "@tanstack/react-query";
import { getSizes } from "@/modules/sizes/sizes.service.ts";
import { GET_SIZES_KEY } from "@/modules/sizes/constants.ts";

export function useInfiniteSizes() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [GET_SIZES_KEY],
    queryFn: async (props) => {
      return getSizes({
        page: props.pageParam as number,
        pageSize: 10,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    staleTime: Infinity,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isLoading,
  };
}
