import { useState } from "react";
import { TableCell, TableRow, useDisclosure } from "@nextui-org/react";

import { EditDeleteActions } from "@shared/components/ui/EditDeleteActions.tsx";
import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { SIZES_TABLE_COLUMNS } from "@/features/sizes/constants.ts";
import { Size } from "@/features/sizes/interfaces/responses/size.interface.ts";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { UpdateSizeModal } from "@/features/sizes/components/UpdateSizeModal.tsx";
import { useDeleteSize } from "@/features/sizes/hooks/useDeleteSize.ts";
import { useGetSizes } from "@/features/sizes/hooks/useGetSizes.ts";

export function SizesOverviewTable() {
  const [page, setPage] = useState(1);
  const [updatingSize, setUpdatingSize] = useState<Size>();
  const { deleteSize } = useDeleteSize();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { sizes, isLoading } = useGetSizes({ page });

  function handleOnEdit(size: Size) {
    setUpdatingSize(size);
    onOpen();
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  return (
    <>
      <GenericTable
        aria-label={"List of sizes"}
        columns={SIZES_TABLE_COLUMNS}
        items={sizes?.content || []}
        tableBodyProps={{ isLoading }}
        bottomContent={
          <TablePagination
            handlePageChange={handlePageChange}
            items={sizes}
            labelName={"sizes"}
            page={page}
          />
        }
      >
        {(size) => (
          <TableRow key={size.sizeId}>
            <TableCell>
              <EditDeleteActions
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
            <TableCell>{size.name}</TableCell>
            <TableCell>{size.description}</TableCell>
          </TableRow>
        )}
      </GenericTable>

      {updatingSize && (
        <UpdateSizeModal isOpen={isOpen} onClose={onClose} updatingSize={updatingSize} />
      )}
    </>
  );
}
