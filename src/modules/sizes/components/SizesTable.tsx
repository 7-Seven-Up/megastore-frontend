import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
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
import { useMemo, useState } from "react";
import { UpdateSizeForm } from "./UpdateSizeForm";
import { useGetSizes } from "../hooks/useGetSizes";
import { Size } from "../interfaces/responses/size.interface";

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
  const { data, isLoading } = useGetSizes({
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

  const label = useMemo(() => {
    if (!data) return;
    return `Showing from ${data.pageable.offset + 1} to ${
      data.pageable.offset + data.numberOfElements
    } sizes`;
  }, [data]);

  return (
    <>
      <Table
        aria-label="List of sizes"
        bottomContentPlacement={"outside"}
        bottomContent={
          data &&
          data.content.length > 0 && (
            <div className="flex w-full flex-wrap items-center justify-center gap-4 sm:justify-between">
              <Pagination
                color="primary"
                isCompact
                onChange={(page) => handlePageChange(page)}
                page={currentPage}
                showControls
                showShadow
                size={"lg"}
                total={data.totalPages}
              />
              <p className={"text-content4-foreground"}>{label}</p>
              <ButtonGroup>
                <Button
                  isDisabled={data.first}
                  onPress={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  isDisabled={data.last}
                  onPress={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
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
          items={data?.content || []}
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
