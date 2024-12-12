import { OrdersByUserTable } from "@/features/orders/components/OrdersByUserTable.tsx";
import { Title } from "@shared/components/typography/Title.tsx";

export function UserOrdersPage() {
  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header>
        <Title>Orders</Title>
      </header>
      <OrdersByUserTable />
    </div>
  );
}
