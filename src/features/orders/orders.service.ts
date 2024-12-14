import { CreateOrderRequest } from "@/features/orders/interfaces/request/create-order.interface.ts";
import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";
import { PaginatedOrderResponse } from "@/features/orders/interfaces/response/paginated-order-response.interface.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { httpClient } from "@shared/lib/httpClient.ts";

const ORDERS_URL = "/api/v1/orders";

export async function getOrders(params: PaginationRequest) {
  const response = await httpClient.get<PaginatedOrderResponse>(ORDERS_URL, { params });
  return response.data;
}

export async function createOrder(createOrderRequest: CreateOrderRequest) {
  const response = await httpClient.post<OrderResponse>(ORDERS_URL, createOrderRequest);
  return response.data;
}

export async function cancelOrder(orderId: string) {
  const response = await httpClient.post<OrderResponse>(`${ORDERS_URL}/${orderId}/cancel`, {
    reason: "The user canceled the order",
  });
  return response.data;
}

export async function deliverOrder(orderId: string) {
  const response = await httpClient.post<OrderResponse>(`${ORDERS_URL}/${orderId}/deliver`);
  return response.data;
}

export async function finishOrder(orderId: string) {
  const response = await httpClient.post<OrderResponse>(`${ORDERS_URL}/${orderId}/finish`);
  return response.data;
}

export async function inDeliveryOrder(orderId: string) {
  const response = await httpClient.post<OrderResponse>(
    `${ORDERS_URL}/${orderId}/mark-in-delivery`,
  );
  return response.data;
}
