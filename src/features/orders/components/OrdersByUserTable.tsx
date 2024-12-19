import { TableCell, TableRow } from "@nextui-org/react";

import { GenericTable } from "@shared/components/ui/GenericTable.tsx";
import { FINAL_ORDER_STATES, ORDERS_TABLE_COLUMNS } from "@/features/orders/constants.ts";
import { OrderStateChip } from "@/features/orders/components/OrderStateChip.tsx";
import { ProductOrderPreview } from "@/features/orders/components/ProductOrderPreview.tsx";
import { UserOrderTableActions } from "@/features/orders/components/UserOrderTableActions.tsx";
import { currencyFormatter } from "@shared/utils/currencyFormatter.ts";
import { dateFormatter } from "@shared/utils/dateFormatter.ts";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore.ts";
import { useGetOrdersByUser } from "@/features/users/hooks/useGetOrdersByUser.ts";

export function OrdersByUserTable() {
  const username = useAuthStore((state) => state.authResponse?.username);
  const { ordersByUser, isLoading } = useGetOrdersByUser(username!);

  return (
    <GenericTable
      aria-label={"Orders table"}
      columns={ORDERS_TABLE_COLUMNS}
      items={ordersByUser || []}
      tableBodyProps={{
        isLoading,
        emptyContent: "There are no orders to show",
      }}
    >
      {(order) => (
        <TableRow key={order.orderId}>
          <TableCell>
            <UserOrderTableActions
              orderId={order.orderId}
              allowCancel={!FINAL_ORDER_STATES.includes(order.state)}
            />
          </TableCell>
          <TableCell>
            <OrderStateChip state={order.state} />
          </TableCell>
          <TableCell>{order.number}</TableCell>
          <TableCell>{dateFormatter(order.date)}</TableCell>
          <TableCell>{currencyFormatter(order.total, "es-AR", "ARS")}</TableCell>
          <TableCell>
            <ProductOrderPreview products={order.orderDetails.map((detail) => detail.product)} />
          </TableCell>
        </TableRow>
      )}
    </GenericTable>
  );
}
