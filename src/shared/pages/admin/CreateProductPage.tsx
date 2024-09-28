import { CreateProductForm } from "@products/components/CreateProductForm.tsx";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function CreateProductPage() {
  const navigate = useNavigate();

  function onClose() {
    navigate("/admin/products");
  }

  return (
    <Modal
      backdrop={"blur"}
      isOpen
      onClose={onClose}
      scrollBehavior={"inside"}
      size={"4xl"}
    >
      <ModalContent>
        <ModalHeader>Create a new product</ModalHeader>
        <ModalBody>
          <CreateProductForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
