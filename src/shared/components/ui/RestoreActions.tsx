import { Tooltip } from "@nextui-org/react";

import { ClockIcon } from "@shared/components/icons/ClockIcon.tsx";

interface RestoreActionsProps {
  onRestore: () => void;
  toolTipContent?: string;
}

export function RestoreActions({
  onRestore,
  toolTipContent,
}: RestoreActionsProps) {
  return (
    <div className={"flex items-center gap-4"}>
      <Tooltip
        closeDelay={0}
        content={toolTipContent || "Restore"}
        delay={0}
        placement={"left"}
      >
        <button
          className="cursor-pointer text-lg text-default-400 active:opacity-50"
          onClick={onRestore}
        >
          <ClockIcon />
        </button>
      </Tooltip>
    </div>
  );
}
