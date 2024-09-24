import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/modules/categories/categories.service.ts";
import { GET_CATEGORIES_KEY } from "@/modules/categories/constants.ts";

export function useInfiniteCategories() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [GET_CATEGORIES_KEY],
    queryFn: async (props) => {
      return getAllCategories({
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
