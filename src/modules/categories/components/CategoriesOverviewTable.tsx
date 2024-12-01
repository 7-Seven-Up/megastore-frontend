import { useState } from "react";
import { TableCell, TableRow, useDisclosure } from "@nextui-org/react";

import { CATEGORIES_TABLE_COLUMNS } from "@categories/constants.ts";
import { Category } from "@/modules/categories/interfaces/responses/category.interface.ts";
import { EditCategoryModal } from "@categories/components/EditCategoryModal.tsx";
import { EditDeleteActions } from "@shared/components/ui/EditDeleteActions.tsx";
import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { useDeleteCategory } from "@/modules/categories/hooks/useDeleteCategory.ts";
import { useGetCategories } from "@/modules/categories/hooks/useGetCategories.ts";
import { usePagination } from "@shared/hooks/usePagination.ts";

export function CategoriesOverviewTable() {
  const [editingCategory, setEditingCategory] = useState<Category>();
  const { page, handlePageChange } = usePagination();
  const { categories, isLoading } = useGetCategories({ page });
  const { deleteCategory } = useDeleteCategory();
  const { onOpen, onClose, isOpen } = useDisclosure();

  function handleOnEdit(category: Category) {
    setEditingCategory(category);
    onOpen();
  }

  async function handleOnDelete(categoryId: string) {
    await deleteCategory(categoryId);
  }

  return (
    <>
      <GenericTable
        aria-label={"List of categories"}
        bottomContent={
          <TablePagination
            handlePageChange={handlePageChange}
            items={categories}
            labelName={"categories"}
            page={page}
          />
        }
        columns={CATEGORIES_TABLE_COLUMNS}
        items={categories?.content || []}
        tableBodyProps={{ isLoading, emptyContent: "There are no categories" }}
      >
        {(category) => (
          <TableRow key={category.categoryId}>
            <TableCell>
              <EditDeleteActions
                deleteContent={"Delete category"}
                editContent={"Edit category"}
                onDelete={() => handleOnDelete(category.categoryId)}
                onEdit={() => handleOnEdit(category)}
                confirmModalProps={{
                  title: "Delete category",
                  description: `Are you sure you want to delete the category ${category.name}?`,
                }}
              />
            </TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              <span
                className={`${!category.description ? "text-content4-foreground" : ""}`}
              >
                {category.description || "No description"}
              </span>
            </TableCell>
            <TableCell>
              <span
                className={`${!category.superCategoryName ? "text-content4-foreground" : ""}`}
              >
                {category.superCategoryName || "No super category"}
              </span>
            </TableCell>
          </TableRow>
        )}
      </GenericTable>

      {editingCategory && (
        <EditCategoryModal
          editingCategory={editingCategory}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
