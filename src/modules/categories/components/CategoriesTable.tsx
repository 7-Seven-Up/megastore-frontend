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
import { useDeleteCategory } from "@/modules/categories/hooks/useDeleteCategory.ts";
import { useState } from "react";
import { Category } from "@/modules/categories/interfaces/responses/category.interface.ts";
import { EditCategoryForm } from "@/modules/categories/components/EditCategoryForm.tsx";
import { useGetCategories } from "@/modules/categories/hooks/useGetCategories.ts";
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
    key: "superCategory",
    label: "SUPER CATEGORY",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export function CategoriesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, isLoading } = useGetCategories({
    page: currentPage,
  });
  const { deleteCategory } = useDeleteCategory();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(
    undefined,
  );

  function handleOnEdit(category: Category) {
    setEditingCategory(category);
    onOpen();
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  async function handleOnDelete(categoryId: string) {
    await deleteCategory(categoryId);
  }

  return (
    <>
      <Table
        aria-label="List of categories"
        bottomContentPlacement={"outside"}
        bottomContent={
          categories &&
          categories.content.length > 0 && (
            <PaginationControls
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              labelName={"Categories"}
              paginatedResponse={categories}
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
          emptyContent={"There are no categories to show"}
          items={categories?.content || []}
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
          {(category) => (
            <TableRow key={category.categoryId}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <span
                  className={`${!category.superCategoryName ? "text-content4-foreground" : ""}`}
                >
                  {category.superCategoryName || "No super category"}
                </span>
              </TableCell>
              <TableCell>
                <TableActions
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
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editingCategory && (
        <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"} size={"lg"}>
          <ModalContent>
            <ModalHeader>Edit category</ModalHeader>
            <ModalBody>
              <EditCategoryForm category={editingCategory} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
