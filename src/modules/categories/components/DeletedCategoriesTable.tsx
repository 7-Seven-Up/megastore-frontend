import { useState } from "react";
import { TableCell, TableRow } from "@nextui-org/react";

import { CATEGORIES_TABLE_COLUMNS } from "@categories/constants.ts";
import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { RestoreActions } from "@shared/components/ui/RestoreActions.tsx";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { useGetDeletedCategories } from "@categories/hooks/useGetDeletedCategories.ts";
import { useRestoreCategory } from "@categories/hooks/useRestoreCategory.ts";

export function DeletedCategoriesTable() {
  const [page, setPage] = useState(1);
  const { deletedCategories, isLoading } = useGetDeletedCategories({ page });
  const { restoreCategory } = useRestoreCategory();

  function handlePageChange(page: number) {
    setPage(page);
  }

  async function handleRestoreCategory(categoryId: string) {
    await restoreCategory(categoryId);
  }

  return (
    <GenericTable
      aria-label={"List of deleted categories"}
      bottomContent={
        <TablePagination
          handlePageChange={handlePageChange}
          items={deletedCategories}
          labelName={"categories"}
          page={page}
        />
      }
      columns={CATEGORIES_TABLE_COLUMNS}
      items={deletedCategories?.content || []}
      tableBodyProps={{
        isLoading,
        emptyContent: "There are no deleted categories to show",
      }}
    >
      {(category) => (
        <TableRow key={category.categoryId}>
          <TableCell>
            <RestoreActions
              onRestore={() => handleRestoreCategory(category.categoryId)}
            />
          </TableCell>
          <TableCell>{category.name}</TableCell>
          <TableCell>{category.description}</TableCell>
          <TableCell>{category.superCategoryName}</TableCell>
        </TableRow>
      )}
    </GenericTable>
  );
}
