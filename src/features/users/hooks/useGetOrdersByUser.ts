import { useQuery } from "@tanstack/react-query";

import { GET_ORDERS_BY_USER_KEY } from "@/features/users/constants.ts";
import { getOrders } from "@/features/users/user.service.ts";

export function useGetOrdersByUser(username: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => getOrders(username),
    queryKey: [GET_ORDERS_BY_USER_KEY],
    staleTime: Infinity,
  });

  return {
    isLoading,
    ordersByUser: data,
  };
}
