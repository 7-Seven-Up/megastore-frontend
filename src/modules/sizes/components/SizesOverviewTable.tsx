import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { AVAILABLE_TABLE_ACTIONS } from "@shared/interfaces/table-actions.interface.ts";
import { PaginationControls } from "@shared/components/ui/PaginationControls.tsx";
import { Size } from "../interfaces/responses/size.interface";
import { SizesTable } from "@sizes/components/SizesTable.tsx";
import { UpdateSizeForm } from "./UpdateSizeForm";
import { useDeleteSize } from "../hooks/useDeleteSize";
import { useGetSizes } from "../hooks/useGetSizes";

export function SizesOverviewTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { sizes, isLoading } = useGetSizes({
    page: currentPage,
  });
  const { deleteSize } = useDeleteSize();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [updatingSize, setUpdatingSize] = useState<Size | undefined>(undefined);

  function handleOnEdit(size: Size) {
    setUpdatingSize(size);
    onOpen();
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <>
      <SizesTable
        tableActionsProps={{
          onDelete: deleteSize,
          onEdit: handleOnEdit,
          type: AVAILABLE_TABLE_ACTIONS.EDIT_DELETE,
        }}
        sizes={sizes}
        isLoading={isLoading}
        bottomContent={
          sizes &&
          sizes.content.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              labelName={"sizes"}
              paginatedResponse={sizes}
            />
          )
        }
      />

      {updatingSize && (
        <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"} size={"lg"}>
          <ModalContent>
            <ModalHeader>Edit size</ModalHeader>
            <ModalBody>
              <UpdateSizeForm size={updatingSize} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
