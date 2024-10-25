import { useState } from "react";

import { AVAILABLE_TABLE_ACTIONS } from "@shared/interfaces/table-actions.interface.ts";
import { PaginationControls } from "@shared/components/ui/PaginationControls.tsx";
import { SizesTable } from "@sizes/components/SizesTable.tsx";
import { useGetDeletedSizes } from "@sizes/hooks/useGetDeletedSizes.ts";
import { useRestoreSize } from "@sizes/hooks/useRestoreSize.ts";

export function DeletedSizesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { restoreSize } = useRestoreSize();
  const { sizes, isLoading } = useGetDeletedSizes({
    page: currentPage,
  });

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  async function handleRestoreSize(sizeId: string) {
    await restoreSize(sizeId);
  }

  return (
    <SizesTable
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
      isLoading={isLoading}
      sizes={sizes}
      tableActionsProps={{
        onRestore: handleRestoreSize,
        type: AVAILABLE_TABLE_ACTIONS.RESTORE,
      }}
    />
  );
}
