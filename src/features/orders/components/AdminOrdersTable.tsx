import { useState } from "react";
import { TableCell, TableRow } from "@nextui-org/react";

import { ADMIN_ORDERS_TABLE_COLUMNS } from "@/features/orders/constants.ts";
import { AdminOrderTableActions } from "@/features/orders/components/AdminOrderTableActions.tsx";
import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { OrderStateChip } from "@/features/orders/components/OrderStateChip.tsx";
import { ProductOrderPreview } from "@/features/orders/components/ProductOrderPreview.tsx";
import { TablePagination } from "@shared/components/ui/TablePagination.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { dateFormatter } from "@shared/utils/dateFormatter.ts";
import { denormalizeOrderProducts } from "@/features/orders/utils/denormalizeOrderProducts.ts";
import { useGetOrders } from "@/features/orders/hooks/useGetOrders.ts";

export function AdminOrdersTable() {
  const [page, setPage] = useState(1);
  const { orders, isLoading } = useGetOrders({
    page,
  });

  function handlePageChange(page: number) {
    setPage(page);
  }

  return (
    <GenericTable
      aria-label={"List of orders"}
      bottomContent={
        <TablePagination
          handlePageChange={handlePageChange}
          items={orders}
          labelName={"orders"}
          page={page}
        />
      }
      columns={ADMIN_ORDERS_TABLE_COLUMNS}
      items={orders?.content || []}
      tableBodyProps={{
        isLoading,
        emptyContent: "There are no orders to show",
      }}
    >
      {(order) => (
        <TableRow key={order.orderId}>
          <TableCell>
            <AdminOrderTableActions order={order} />
          </TableCell>
          <TableCell>
            <OrderStateChip state={order.state} />
          </TableCell>
          <TableCell>{order.number}</TableCell>
          <TableCell>{dateFormatter(order.date)}</TableCell>
          <TableCell>{currencyFormatter(order.total, "es-AR", "ARS")}</TableCell>
          <TableCell>
            <ProductOrderPreview products={denormalizeOrderProducts(order)} />
          </TableCell>
          <TableCell>{order.clientName}</TableCell>
        </TableRow>
      )}
    </GenericTable>
  );
}
