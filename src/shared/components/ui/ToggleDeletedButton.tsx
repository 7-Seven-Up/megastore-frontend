import { Button } from "@nextui-org/react";

import { EyeFilledIcon } from "@shared/components/icons/EyeFilledIcon.tsx";
import { EyeSlashFilledIcon } from "@shared/components/icons/EyeSlashFilledIcon.tsx";

interface ToggleDeletedButtonProps {
  onClick: () => void;
  showDeleted: boolean;
}

export function ToggleDeletedButton({
  showDeleted,
  onClick,
}: ToggleDeletedButtonProps) {
  return (
    <Button
      className={"w-full sm:w-auto"}
      onClick={onClick}
      variant={"bordered"}
    >
      {showDeleted ? (
        <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
      ) : (
        <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
      )}
      {showDeleted ? "Hide deleted" : "Show deleted"}
    </Button>
  );
}
