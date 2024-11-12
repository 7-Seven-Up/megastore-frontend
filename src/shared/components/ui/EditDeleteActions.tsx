import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "@shared/components/icons/DeleteIcon.tsx";
import { EditIcon } from "@shared/components/icons/EditIcon.tsx";
import {
  ConfirmModalProps,
  useConfirmModal,
} from "@shared/hooks/useConfirmModal.ts";

export interface EditDeleteActionsProps {
  deleteContent: string;
  editContent: string;
  onDelete?: () => Promise<void>;
  onEdit?: () => void;
  confirmModalProps: Omit<ConfirmModalProps, "onConfirm">;
  disableEdit?: boolean;
  disableDelete?: boolean;
}

export function EditDeleteActions(props: EditDeleteActionsProps) {
  const { deleteContent, editContent, onDelete, onEdit, confirmModalProps } =
    props;
  const { showConfirmModal } = useConfirmModal();
  const { disableEdit = false, disableDelete = false } = props;

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
      {!disableEdit && (
        <Tooltip closeDelay={0} content={editContent} delay={0}>
          <button
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
            onClick={onEdit}
            data-cy={"table-edit-button"}
          >
            <EditIcon />
          </button>
        </Tooltip>
      )}

      {!disableDelete && (
        <Tooltip
          closeDelay={0}
          color="danger"
          content={deleteContent}
          delay={0}
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
