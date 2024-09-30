import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "@/shared/components/icons/DeleteIcon.tsx";
import { EditIcon } from "@/shared/components/icons/EditIcon.tsx";
import {
  ConfirmModalProps,
  useConfirmModal,
} from "@/shared/hooks/useConfirmModal.ts";

interface TableActionsProps {
  deleteContent: string;
  editContent: string;
  onDelete?: () => Promise<void>;
  onEdit?: () => void;
  confirmModalProps: Omit<ConfirmModalProps, "onConfirm">;
  allowEdit?: boolean;
  allowDelete?: boolean;
}

export function TableActions(props: TableActionsProps) {
  const { deleteContent, editContent, onDelete, onEdit, confirmModalProps } =
    props;
  const { showConfirmModal } = useConfirmModal();
  const { allowEdit = false, allowDelete = false } = props;

  function handleDelete() {
    if (!onDelete) return;

    showConfirmModal({
      description: confirmModalProps.description,
      onConfirm: onDelete,
      title: confirmModalProps.title,
    });
  }

  return (
    <div className="flex items-center gap-4">
      {allowEdit && (
        <Tooltip content={editContent} delay={0} closeDelay={0}>
          <button
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
            onClick={onEdit}
          >
            <EditIcon />
          </button>
        </Tooltip>
      )}

      {allowDelete && (
        <Tooltip
          color="danger"
          content={deleteContent}
          delay={0}
          closeDelay={0}
        >
          <button
            className="cursor-pointer text-lg text-danger active:opacity-50"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </button>
        </Tooltip>
      )}
    </div>
  );
}
