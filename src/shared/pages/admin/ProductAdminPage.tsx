import { Outlet } from "react-router-dom";
import { Button, Link } from "@nextui-org/react";
import { PlusIcon } from "@/shared/components/icons/PlusIcon.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { ProductsTable } from "@products/components/ProductsTable.tsx";

export function ProductAdminPage() {
  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header
        className={"flex w-full flex-wrap items-center justify-between gap-2"}
      >
        <Title>List of products</Title>
        <Button
          as={Link}
          className={"w-full sm:w-auto"}
          color={"primary"}
          href={"/admin/products/create"}
          startContent={<PlusIcon width={18} height={18} fill={"white"} />}
        >
          Create new
        </Button>
      </header>
      <ProductsTable />
      <Outlet />
    </div>
  );
}
