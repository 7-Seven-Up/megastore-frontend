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
import { useDeleteCategory } from "@/modules/categories/hooks/useDeleteCategory.ts";
import { useMemo, useState } from "react";
import { Category } from "@/modules/categories/interfaces/responses/category.interface.ts";
import { EditCategoryForm } from "@/modules/categories/components/EditCategoryForm.tsx";
import { useGetCategories } from "@/modules/categories/hooks/useGetCategories.ts";

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
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useGetCategories({
    page: currentPage,
  });
  const { mutate } = useDeleteCategory();
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

  const label = useMemo(() => {
    if (!data) return;
    return `Showing from ${data.pageable.offset + 1} to ${
      data.pageable.offset + data.numberOfElements
    } categories`;
  }, [data]);

  return (
    <>
      <Table
        aria-label="List of categories"
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
          emptyContent={"There are no categories to show"}
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
                  onDelete={() => mutate(category.categoryId)}
                  onEdit={() => handleOnEdit(category)}
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
