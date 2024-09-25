import { CreateSizeForm } from "@/modules/sizes/components/CreateSizeForm";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function CreateSizePage() {
  const navigate = useNavigate();

  function onClose() {
    navigate("/admin/sizes");
  }

  return (
    <Modal isOpen onClose={onClose} backdrop={"blur"} size={"lg"}>
      <ModalContent>
        <ModalHeader>Create a new size</ModalHeader>
        <ModalBody>
          <CreateSizeForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
