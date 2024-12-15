import { useConfirmModal } from "@/shared/hooks/useConfirmModal.ts";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export function ConfirmModal() {
  const {
    cancelLabel,
    description,
    hideConfirmModal,
    isLoading,
    modalVisible,
    okLabel,
    onConfirm,
    title,
  } = useConfirmModal();

  return (
    <Modal backdrop={"blur"} isOpen={modalVisible} onClose={hideConfirmModal} size={"lg"}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={hideConfirmModal}>
            {cancelLabel}
          </Button>
          <Button color="primary" isLoading={isLoading} onPress={onConfirm}>
            {okLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
