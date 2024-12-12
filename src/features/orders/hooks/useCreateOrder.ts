import { useMutation } from "@tanstack/react-query";

import { CREATE_ORDERS_KEY } from "@/features/orders/constants.ts";
import { CreateOrderRequest } from "@/features/orders/interfaces/request/create-order.interface.ts";
import { createOrder } from "@/features/orders/orders.service.ts";

export function useCreateOrder() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (createOrderRequest: CreateOrderRequest) => createOrder(createOrderRequest),
    mutationKey: [CREATE_ORDERS_KEY],
  });

  return {
    createOrder: mutateAsync,
    isPending,
  };
}
