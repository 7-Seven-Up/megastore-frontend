import { CreateOrderRequest } from "@/features/orders/interfaces/request/create-order.interface.ts";
import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";
import { httpClient } from "@shared/lib/httpClient.ts";

const ORDERS_URL = "/api/v1/orders";

export async function createOrder(createOrderRequest: CreateOrderRequest) {
  const response = await httpClient.post<OrderResponse>(ORDERS_URL, createOrderRequest);
  return response.data;
}

export async function cancelOrder(orderId: string) {
  const response = await httpClient.post<void>(`${ORDERS_URL}/${orderId}/cancel`, {
    reason: "The user canceled the order",
  });
  return response.data;
}
