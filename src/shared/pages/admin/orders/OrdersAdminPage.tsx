import { AdminOrdersTable } from "@/features/orders/components/AdminOrdersTable.tsx";
import { Title } from "@shared/components/typography/Title.tsx";

export function OrdersAdminPage() {
  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header className={"flex w-full flex-wrap items-center justify-between gap-2"}>
        <Title>List of orders</Title>
      </header>

      <div className={"mt-2 flex flex-col gap-3"}>
        <AdminOrdersTable />
      </div>
    </div>
  );
}
