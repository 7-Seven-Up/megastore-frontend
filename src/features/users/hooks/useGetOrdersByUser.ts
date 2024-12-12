import { useQuery } from "@tanstack/react-query";

import { GET_ORDERS_BY_USER_KEY } from "@/features/users/constants.ts";
import { getOrders } from "@/features/users/user.service.ts";

export function useGetOrdersByUser(username: string, enabled: boolean = true) {
  const { data, isLoading } = useQuery({
    queryFn: () => getOrders(username),
    queryKey: [GET_ORDERS_BY_USER_KEY],
    enabled,
    staleTime: Infinity,
  });

  return {
    isLoading,
    ordersByUser: data,
  };
}
