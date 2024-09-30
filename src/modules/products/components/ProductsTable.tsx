import {
  Chip,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useGetProducts } from "@products/hooks/useGetProducts.ts";
import { TableActions } from "@/shared/components/ui/TableActions.tsx";
import { useState } from "react";
import { useDeleteProduct } from "@products/hooks/useDeleteProduct.ts";
import { PaginationControls } from "@/shared/components/ui/PaginationControls.tsx";
import { TableLoading } from "@/shared/components/ui/TableLoading.tsx";

const columns = [
  {
    key: "actions",
    label: "ACTIONS",
  },
  {
    key: "name",
    label: "NAME",
    width: 300,
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "price",
    label: "PRICE",
  },
  {
    key: "stock",
    label: "STOCK",
  },
  {
    key: "color",
    label: "COLOR",
  },
  {
    key: "size",
    label: "SIZE",
  },
  {
    key: "variantOf",
    label: "VARIANT OF",
  },
];

export function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { deleteProduct } = useDeleteProduct();
  const { productResponse, isLoading } = useGetProducts({
    page: currentPage,
  });

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  async function handleDelete(productId: string) {
    await deleteProduct(productId);
  }

  return (
    <Table
      aria-label="List of products"
      bottomContentPlacement={"outside"}
      classNames={{
        table: "min-w-[1280px]",
      }}
      bottomContent={
        productResponse &&
        productResponse.content.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            labelName={"products"}
            paginatedResponse={productResponse}
          />
        )
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} width={column.width}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"There are no products to show"}
        items={productResponse?.content || []}
        loadingContent={<TableLoading />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(product) => (
          <TableRow key={product.productId}>
            <TableCell>
              <TableActions
                confirmModalProps={{
                  title: "Delete product",
                  description: `Are you sure you want to delete the product ${product.name}?`,
                }}
                deleteContent={"Delete product"}
                editContent={"Edit product"}
                onDelete={() => handleDelete(product.productId)}
                allowDelete
              />
            </TableCell>

            <TableCell>
              <div className={"flex items-center gap-4"}>
                <Image
                  alt={`${product.name} image`}
                  className={"object-cover"}
                  src={product.imagesURLS[0]}
                  width={50}
                  height={50}
                />
                <span>{product.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className={"line-clamp-2 max-w-fit"}>
                {product.description ?? (
                  <i className="text-gray-500">{"<No description>"}</i>
                )}
              </span>
            </TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={product.stock > 0 ? "success" : "danger"}
                variant={"flat"}
              >
                {product.stock}
              </Chip>
            </TableCell>
            <TableCell>
              <div
                style={{
                  backgroundColor: product.color,
                  borderRadius: "50%",
                  height: 30,
                  width: 30,
                }}
              ></div>
            </TableCell>

            <TableCell>{product.sizeName}</TableCell>
            <TableCell>
              {product.variantOfName ?? (
                <span className={"text-gray-400"}>No variant</span>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
