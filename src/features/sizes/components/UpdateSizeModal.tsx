import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

import { Size } from "@/features/sizes/interfaces/responses/size.interface.ts";
import { UpdateSizeForm } from "@/features/sizes/components/UpdateSizeForm.tsx";

interface UpdateSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  updatingSize: Size;
}

export function UpdateSizeModal(props: UpdateSizeModalProps) {
  const { isOpen, onClose, updatingSize } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"} size={"lg"}>
      <ModalContent>
        <ModalHeader>Edit size</ModalHeader>
        <ModalBody>
          <UpdateSizeForm size={updatingSize} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
