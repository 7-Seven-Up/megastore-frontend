import { Button, cn } from "@nextui-org/react";
import { ComponentProps } from "react";

interface FormFooterProps extends ComponentProps<"footer"> {
  isLoading?: boolean;
  onClose: () => void;
}

export function FormFooter({
  className,
  isLoading,
  onClose,
  ...rest
}: FormFooterProps) {
  return (
    <footer className={cn("my-4 flex justify-end gap-2", className)} {...rest}>
      <Button color="danger" variant="light" onPress={onClose}>
        Close
      </Button>
      <Button color="primary" type={"submit"} isLoading={isLoading}>
        Save
      </Button>
    </footer>
  );
}
