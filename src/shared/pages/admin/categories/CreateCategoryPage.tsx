import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { CreateCategoryForm } from "@/features/categories/components/CreateCategoryForm.tsx";

export function CreateCategoryPage() {
  const navigate = useNavigate();

  function onClose() {
    navigate("/admin/categories");
  }

  return (
    <Modal isOpen onClose={onClose} backdrop={"blur"} size={"lg"}>
      <ModalContent>
        <ModalHeader>Create a new category</ModalHeader>
        <ModalBody>
          <CreateCategoryForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
