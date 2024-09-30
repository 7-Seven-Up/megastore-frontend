import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { TableActions } from "@/shared/components/ui/TableActions.tsx";
import { useDeleteSize } from "../hooks/useDeleteSize";
import { useState } from "react";
import { UpdateSizeForm } from "./UpdateSizeForm";
import { useGetSizes } from "../hooks/useGetSizes";
import { Size } from "../interfaces/responses/size.interface";
import { PaginationControls } from "@/shared/components/ui/PaginationControls.tsx";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export function SizesTable() {
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
      <Table
        aria-label="List of sizes"
        bottomContentPlacement={"outside"}
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
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"There are no sizes to show"}
          items={sizes?.content || []}
          loadingContent={
            <div
              className={
                "flex h-full w-full flex-col items-center justify-center gap-2 bg-default p-4"
              }
            >
              <Spinner />
            </div>
          }
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(size) => (
            <TableRow key={size.sizeId}>
              <TableCell>{size.name}</TableCell>
              <TableCell>{size.description}</TableCell>
              <TableCell>
                <TableActions
                  deleteContent={"Delete size"}
                  editContent={"Edit size"}
                  onDelete={() => deleteSize(size.sizeId)}
                  onEdit={() => handleOnEdit(size)}
                  confirmModalProps={{
                    title: "Delete size",
                    description: `Are you sure you want to delete the size ${size.name}?`,
                  }}
                  allowEdit
                  allowDelete
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
