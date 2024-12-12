import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CANCEL_ORDERS_KEY } from "@/features/orders/constants.ts";
import { GET_ORDERS_BY_USER_KEY } from "@/features/users/constants.ts";
import { cancelOrder } from "@/features/orders/orders.service.ts";

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (orderId: string) => cancelOrder(orderId),
    mutationKey: [CANCEL_ORDERS_KEY],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_ORDERS_BY_USER_KEY],
      });
    },
  });

  return { cancelOrder: mutateAsync, isCanceling: isPending };
}
