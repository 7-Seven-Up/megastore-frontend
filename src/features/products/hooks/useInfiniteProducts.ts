import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/products/products.service.ts";
import { GET_PRODUCTS_KEY } from "@/features/products/constants.ts";

export function useInfiniteProducts() {
  const { data, fetchNextPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [GET_PRODUCTS_KEY],
      queryFn: async (props) => {
        return getProducts({
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
