import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";

export function denormalizeOrderProducts(order: OrderResponse) {
  return order.orderDetails.flatMap((detail) => Array(detail.quantity).fill(detail.product));
}
