import { useState } from "react";
import { Chip, Image, TableCell, TableRow } from "@nextui-org/react";

import { EditDeleteActions } from "@shared/components/ui/EditDeleteActions.tsx";
import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { PRODUCTS_TABLE_COLUMNS } from "@products/constants.ts";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { useDeleteProduct } from "@products/hooks/useDeleteProduct.ts";
import { useGetProducts } from "@products/hooks/useGetProducts.ts";

export function ProductsOverviewTable() {
  const [page, setPage] = useState(1);
  const { deleteProduct } = useDeleteProduct();
  const { productResponse, isLoading } = useGetProducts({ page });

  function handlePageChange(page: number) {
    setPage(page);
  }

  async function handleDelete(productId: string) {
    await deleteProduct(productId);
  }

  return (
    <>
      <GenericTable
        aria-label={"List of products"}
        bottomContent={
          <TablePagination
            handlePageChange={handlePageChange}
            items={productResponse}
            labelName={"products"}
            page={page}
          />
        }
        tableBodyProps={{
          isLoading,
          emptyContent: "There are no products to show",
        }}
        columns={PRODUCTS_TABLE_COLUMNS}
        items={productResponse?.content || []}
      >
        {(product) => (
          <TableRow key={product.productId}>
            <TableCell>
              <EditDeleteActions
                confirmModalProps={{
                  title: "Delete product",
                  description: `Are you sure you want to delete the product ${product.name}?`,
                }}
                deleteContent={"Delete product"}
                editContent={"Edit product"}
                onDelete={
                  !product.hasVariants
                    ? () => handleDelete(product.productId)
                    : undefined
                }
                disableEdit={true}
                disableDelete={product.hasVariants}
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
                {product.description || (
                  <p className="text-content4-foreground">No description</p>
                )}
              </span>
            </TableCell>
            <TableCell>
              {currencyFormatter(product.price, "es-AR", "ARS")}
            </TableCell>
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
              {product.variantOfName ? (
                <span>{product.variantOfName}</span>
              ) : (
                <span className={"italic text-gray-400"}>No variant</span>
              )}
            </TableCell>
          </TableRow>
        )}
      </GenericTable>
    </>
  );
}
