import { Button, Link, Tooltip } from "@nextui-org/react";

import { XIcon } from "@shared/components/icons/XIcon.tsx";
import { useCancelOrder } from "@/features/orders/hooks/useCancelOrder.ts";
import { useConfirmModal } from "@shared/hooks/useConfirmModal.ts";

interface UserOrderTableActionsProps {
  orderId: string;
  allowCancel?: boolean;
}

export function UserOrderTableActions({ orderId, allowCancel }: UserOrderTableActionsProps) {
  const { cancelOrder, isCanceling } = useCancelOrder();
  const { showConfirmModal } = useConfirmModal();

  async function handleCancelOrder() {
    showConfirmModal({
      cancelLabel: "No",
      description: "Are you sure you want to cancel this order?",
      okLabel: "Yes",
      onConfirm: confirmCancelOrder,
      title: "Cancel order",
    });
  }

  async function confirmCancelOrder() {
    await cancelOrder(orderId);
  }

  return (
    <div className={"flex items-center gap-3"}>
      <Tooltip content={"Cancel order"} delay={0} closeDelay={0} color={"danger"}>
        <Button
          color={"danger"}
          isDisabled={!allowCancel}
          isIconOnly={true}
          isLoading={isCanceling}
          onPress={handleCancelOrder}
          size={"md"}
          variant={"light"}
        >
          <XIcon className={"size-5 fill-black"} />
        </Button>
      </Tooltip>

      <Button color={"default"} size={"md"} as={Link} href={`/user/orders/${orderId}`}>
        View more
      </Button>
    </div>
  );
}
