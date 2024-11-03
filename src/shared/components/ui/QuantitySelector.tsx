import { Button, Input } from "@nextui-org/react";

import { MinusIcon } from "@shared/components/icons/MinusIcon.tsx";
import { PlusIcon } from "@shared/components/icons/PlusIcon.tsx";

interface QuantitySelectorProps {
  disallowAdd?: boolean;
  disallowRemove?: boolean;
  handleAddQuantity: () => void;
  handleRemoveQuantity: () => void;
  isDisabled?: boolean;
  quantity: number;
}

export function QuantitySelector(props: QuantitySelectorProps) {
  const {
    disallowAdd = false,
    disallowRemove = false,
    handleAddQuantity,
    handleRemoveQuantity,
    isDisabled = false,
    quantity,
  } = props;

  return (
    <div className={"inline-flex w-full min-w-52 flex-1 gap-2"}>
      <Input
        startContent={
          <Button
            className={"w-4"}
            color={"secondary"}
            isDisabled={disallowRemove}
            onPress={handleRemoveQuantity}
            size={"sm"}
            variant={"flat"}
          >
            <MinusIcon className={"size-3"} />
          </Button>
        }
        style={{
          textAlign: "center",
        }}
        isDisabled={isDisabled}
        value={quantity.toString()}
        placeholder={"Quantity"}
        endContent={
          <Button
            className={"w-4"}
            color={"secondary"}
            isDisabled={disallowAdd}
            onPress={handleAddQuantity}
            size={"sm"}
            variant={"flat"}
          >
            <PlusIcon className={"size-3"} />
          </Button>
        }
      />
    </div>
  );
}
