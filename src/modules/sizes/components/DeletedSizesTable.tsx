import { useState } from "react";
import { TableCell, TableRow } from "@nextui-org/react";

import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { RestoreActions } from "@shared/components/ui/RestoreActions.tsx";
import { SIZES_TABLE_COLUMNS } from "@sizes/constants.ts";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { useGetDeletedSizes } from "@sizes/hooks/useGetDeletedSizes.ts";
import { useRestoreSize } from "@sizes/hooks/useRestoreSize.ts";

export function DeletedSizesTable() {
  const [page, setPage] = useState(1);
  const { restoreSize } = useRestoreSize();
  const { sizes, isLoading } = useGetDeletedSizes({ page });

  function handlePageChange(page: number) {
    setPage(page);
  }

  async function handleRestoreSize(sizeId: string) {
    await restoreSize(sizeId);
  }

  return (
    <GenericTable
      aria-label={"List of deleted sizes"}
      bottomContent={
        <TablePagination
          handlePageChange={handlePageChange}
          items={sizes}
          labelName={"sizes"}
          page={page}
        />
      }
      columns={SIZES_TABLE_COLUMNS}
      items={sizes?.content || []}
      tableBodyProps={{
        isLoading,
        emptyContent: "There are no deleted sizes to show",
      }}
    >
      {(size) => (
        <TableRow key={size.sizeId}>
          <TableCell>
            <RestoreActions onRestore={() => handleRestoreSize(size.sizeId)} />
          </TableCell>
          <TableCell>{size.name}</TableCell>
          <TableCell>{size.description}</TableCell>
        </TableRow>
      )}
    </GenericTable>
  );
}
