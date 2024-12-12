import { Chip } from "@nextui-org/react";

import { OrderState } from "@/features/orders/enums/order-state.enum.ts";

interface OrderStateChipProps {
  state: OrderState;
}

type ChipColor = "danger" | "success" | "warning" | "default" | "primary" | "secondary";

const stateProps: Record<OrderState, { color: ChipColor; label: string }> = {
  [OrderState.CANCELLED]: { color: "danger", label: "Cancelled" },
  [OrderState.DELIVERED]: { color: "success", label: "Delivered" },
  [OrderState.FINISHED]: { color: "success", label: "Finished" },
  [OrderState.IN_DELIVERY]: { color: "warning", label: "In delivery" },
  [OrderState.IN_PROGRESS]: { color: "warning", label: "In progress" },
};

export function OrderStateChip({ state }: OrderStateChipProps) {
  const { color, label } = stateProps[state];

  return (
    <Chip color={color} variant={"flat"}>
      {label}
    </Chip>
  );
}
