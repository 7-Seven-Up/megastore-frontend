import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

import { EditProductForm } from "@/features/products/components/EditProductForm.tsx";
import { Product } from "@/features/products/interfaces/responses/product-response.interface.ts";

interface EditProductModalProps {
  editingProduct: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function EditProductModal(props: EditProductModalProps) {
  const { editingProduct, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"} size={"4xl"}>
      <ModalContent>
        <ModalHeader>Edit product</ModalHeader>
        <ModalBody>
          <EditProductForm onClose={onClose} product={editingProduct} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
