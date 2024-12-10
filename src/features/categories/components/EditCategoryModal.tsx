import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

import { Category } from "@/features/categories/interfaces/responses/category.interface.ts";
import { EditCategoryForm } from "@/features/categories/components/EditCategoryForm.tsx";

interface EditCategoryModalProps {
  editingCategory: Category;
  isOpen: boolean;
  onClose: () => void;
}

export function EditCategoryModal(props: EditCategoryModalProps) {
  const { editingCategory, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"} size={"lg"}>
      <ModalContent>
        <ModalHeader>Edit category</ModalHeader>
        <ModalBody>
          <EditCategoryForm category={editingCategory} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
