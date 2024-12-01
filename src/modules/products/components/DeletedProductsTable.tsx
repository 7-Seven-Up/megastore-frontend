import { Chip, Image, TableCell, TableRow } from "@nextui-org/react";

import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { PRODUCTS_TABLE_COLUMNS } from "@products/constants.ts";
import { Product } from "@products/interfaces/responses/product-response.interface.ts";
import { RestoreActions } from "@shared/components/ui/RestoreActions.tsx";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { useGetDeletedProducts } from "@products/hooks/useGetDeletedProducts.ts";
import { usePagination } from "@shared/hooks/usePagination.ts";
import { useRestoreProduct } from "@products/hooks/useRestoreProduct.ts";

export function DeletedProductsTable() {
  const { page, handlePageChange } = usePagination();
  const { deletedProducts, isLoading } = useGetDeletedProducts({ page });
  const { restoreProduct } = useRestoreProduct();

  async function handleRestoreProduct(product: Product) {
    await restoreProduct(product);
  }

  return (
    <GenericTable
      aria-label={"List of deleted products"}
      bottomContent={
        <TablePagination
          handlePageChange={handlePageChange}
          items={deletedProducts}
          labelName={"products"}
          page={page}
        />
      }
      columns={PRODUCTS_TABLE_COLUMNS}
      items={deletedProducts?.content || []}
      tableBodyProps={{
        isLoading,
        emptyContent: "There are no deleted products to show",
      }}
    >
      {(product) => (
        <TableRow key={product.productId}>
          <TableCell>
            <RestoreActions onRestore={() => handleRestoreProduct(product)} />
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
              {product.description || <p className="text-content4-foreground">No description</p>}
            </span>
          </TableCell>
          <TableCell>{currencyFormatter(product.price, "es-AR", "ARS")}</TableCell>
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
            {product.variantOfName || <span className={"text-gray-400"}>No variant</span>}
          </TableCell>
        </TableRow>
      )}
    </GenericTable>
  );
}
