import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";

import { FINAL_ORDER_STATES, GET_ORDERS_KEY } from "@/features/orders/constants.ts";
import {
  cancelOrder,
  deliverOrder,
  finishOrder,
  inDeliveryOrder,
} from "@/features/orders/orders.service.ts";
import { OrderState } from "@/features/orders/enums/order-state.enum.ts";
import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";
import { couldChangeToState } from "@/features/orders/utils/couldChangeToState.ts";
import RenderIf from "@shared/components/RenderIf.tsx";
import { useConfirmModal } from "@shared/hooks/useConfirmModal.ts";

interface AdminOrderTableActionsProps {
  order: OrderResponse;
  viewMore?: boolean;
}

type ExcludedOrderState = Exclude<OrderState, OrderState.IN_PROGRESS>;

const ORDER_STATE_FUNCTIONS: Record<
  ExcludedOrderState,
  (orderId: string) => Promise<OrderResponse>
> = {
  [OrderState.CANCELLED]: cancelOrder,
  [OrderState.DELIVERED]: deliverOrder,
  [OrderState.FINISHED]: finishOrder,
  [OrderState.IN_DELIVERY]: inDeliveryOrder,
};

function getDisabledKeys(order: OrderResponse): string[] {
  return Object.keys(ORDER_STATE_FUNCTIONS).filter(
    (state) => !couldChangeToState(state as OrderState, order),
  );
}

export function AdminOrderTableActions({ order, viewMore = true }: AdminOrderTableActionsProps) {
  const queryClient = useQueryClient();
  const { showConfirmModal } = useConfirmModal();

  async function invalidateOrderQuery() {
    await queryClient.invalidateQueries({
      queryKey: [GET_ORDERS_KEY],
    });
  }

  async function handleOrderAction(state: ExcludedOrderState) {
    showConfirmModal({
      cancelLabel: "Cancel",
      description: `Order will be marked as ${state.toLowerCase().replace("_", " ")}.`,
      okLabel: `Mark as ${state.toLowerCase().replace("_", " ")}`,
      onConfirm: () => confirmOrderAction(state),
      title: `Are you sure you want to change the order state?`,
    });
  }

  async function confirmOrderAction(state: ExcludedOrderState) {
    await ORDER_STATE_FUNCTIONS[state](order.orderId);
    await invalidateOrderQuery();
  }

  return (
    <div className={"flex gap-2"}>
      <RenderIf condition={viewMore}>
        <Button as={Link} variant={"flat"} href={`/admin/orders/${order.orderId}`}>
          View more
        </Button>
      </RenderIf>

      <Dropdown isDisabled={FINAL_ORDER_STATES.includes(order.state)}>
        <DropdownTrigger>
          <Button variant="flat">Change state</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Order Actions" disabledKeys={getDisabledKeys(order)}>
          <DropdownItem
            key={OrderState.DELIVERED}
            onPress={() => handleOrderAction(OrderState.DELIVERED)}
          >
            Mark as delivered
          </DropdownItem>
          <DropdownItem
            key={OrderState.IN_DELIVERY}
            onPress={() => handleOrderAction(OrderState.IN_DELIVERY)}
          >
            Mark as in delivery
          </DropdownItem>
          <DropdownItem
            key={OrderState.FINISHED}
            onPress={() => handleOrderAction(OrderState.FINISHED)}
          >
            Mark as finished
          </DropdownItem>
          <DropdownItem
            className="text-danger"
            color="danger"
            key={OrderState.CANCELLED}
            onPress={() => handleOrderAction(OrderState.CANCELLED)}
          >
            Mark as cancelled
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
