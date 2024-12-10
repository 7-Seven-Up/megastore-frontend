import { TableCell, TableRow } from "@nextui-org/react";

import { CATEGORIES_TABLE_COLUMNS } from "@/features/categories/constants.ts";
import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { RestoreActions } from "@shared/components/ui/RestoreActions.tsx";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { useGetDeletedCategories } from "@/features/categories/hooks/useGetDeletedCategories.ts";
import { usePagination } from "@shared/hooks/usePagination.ts";
import { useRestoreCategory } from "@/features/categories/hooks/useRestoreCategory.ts";

export function DeletedCategoriesTable() {
  const { page, handlePageChange } = usePagination();
  const { deletedCategories, isLoading } = useGetDeletedCategories({ page });
  const { restoreCategory } = useRestoreCategory();

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
        emptyContent: "There are no deleted categories to show",
        isLoading,
      }}
    >
      {(category) => (
        <TableRow key={category.categoryId}>
          <TableCell>
            <RestoreActions onRestore={() => handleRestoreCategory(category.categoryId)} />
          </TableCell>
          <TableCell>{category.name}</TableCell>
          <TableCell>{category.description}</TableCell>
          <TableCell>{category.superCategoryName}</TableCell>
        </TableRow>
      )}
    </GenericTable>
  );
}
