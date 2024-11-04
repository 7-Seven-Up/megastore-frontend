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
  size?: "small" | "normal";
}

export function QuantitySelector(props: QuantitySelectorProps) {
  const {
    disallowAdd = false,
    disallowRemove = false,
    handleAddQuantity,
    handleRemoveQuantity,
    isDisabled = false,
    quantity,
    size = "normal",
  } = props;

  return (
    <div className={"inline-flex w-full min-w-fit flex-1 gap-2 sm:min-w-52"}>
      <Input
        startContent={
          <Button
            className={`${size === "small" ? "h-6 min-w-10 p-0" : "w-4"}`}
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
        size={size === "small" ? "sm" : "md"}
        isDisabled={isDisabled}
        value={quantity.toString()}
        placeholder={"Quantity"}
        classNames={{
          inputWrapper: size === "small" ? "w-36" : "",
        }}
        endContent={
          <Button
            className={`${size === "small" ? "h-6 min-w-10 p-0" : "w-4"}`}
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
