import { OrderDetailRequest } from "@/features/orders/interfaces/request/order-detail.interface.ts";

export interface CreateOrderRequest {
  orderDetailRequestList: OrderDetailRequest[];
  userId: string;
}
