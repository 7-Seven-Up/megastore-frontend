import { OrderDetailResponse } from "@/features/orders/interfaces/response/order-detail.interface.ts";
import { OrderState } from "@/features/orders/enums/order-state.enum.ts";

export interface OrderResponse {
  orderId: string;
  number: number;
  date: [number, number, number];
  clientName: string;
  state: OrderState;
  reasonToCancel?: string;
  total: number;
  orderDetails: OrderDetailResponse[];
}
