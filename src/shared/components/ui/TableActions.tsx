import { Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "@/shared/components/icons/DeleteIcon.tsx";
import { EditIcon } from "@/shared/components/icons/EditIcon.tsx";
import { ConfirmModal } from "@/shared/components/ui/ConfirmModal.tsx";

interface TableActionsProps {
  deleteContent: string;
  editContent: string;
  onDelete: () => void;
  onEdit: () => void;
  confirmModalProps: {
    title: string;
    description: string;
  };
}

export function TableActions(props: TableActionsProps) {
  const { deleteContent, editContent, onDelete, onEdit, confirmModalProps } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex items-center gap-4">
      <Tooltip content={editContent} delay={0} closeDelay={0}>
        <button
          className="cursor-pointer text-lg text-default-400 active:opacity-50"
          onClick={onEdit}
        >
          <EditIcon />
        </button>
      </Tooltip>
      <Tooltip color="danger" content={deleteContent} delay={0} closeDelay={0}>
        <button
          className="cursor-pointer text-lg text-danger active:opacity-50"
          onClick={onOpen}
        >
          <DeleteIcon />
        </button>
      </Tooltip>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onDelete}
        {...confirmModalProps}
      />
    </div>
  );
}
