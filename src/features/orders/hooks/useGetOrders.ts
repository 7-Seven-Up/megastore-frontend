import { useQuery } from "@tanstack/react-query";

import { GET_ORDERS_KEY } from "@/features/orders/constants.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { getOrders } from "@/features/orders/orders.service.ts";

export function useGetOrders(params: PaginationRequest, enabled = true) {
  const { pageSize = 10, page = 0, ...rest } = params;
  const fixedPage = page - 1 < 0 ? page : page - 1;

  const { data, isLoading } = useQuery({
    queryFn: () => getOrders({ page: fixedPage, pageSize, ...rest }),
    queryKey: [GET_ORDERS_KEY, fixedPage, pageSize],
    staleTime: Infinity,
    enabled,
  });

  return { orders: data, isLoading };
}
