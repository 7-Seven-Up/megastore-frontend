import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";
import { OrderState } from "@/features/orders/enums/order-state.enum.ts";

export function couldChangeToState(state: OrderState, order: OrderResponse): boolean {
  switch (state) {
    case OrderState.CANCELLED:
      return order.state === OrderState.IN_PROGRESS;
    case OrderState.DELIVERED:
      return order.state === OrderState.IN_DELIVERY;
    case OrderState.FINISHED:
      return order.state === OrderState.IN_PROGRESS;
    case OrderState.IN_DELIVERY:
      return order.state === OrderState.FINISHED;
    default:
      return false;
  }
}
