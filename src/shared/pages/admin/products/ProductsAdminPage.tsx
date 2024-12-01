import { Outlet } from "react-router-dom";
import { Button, Link } from "@nextui-org/react";

import RenderIf from "@shared/components/RenderIf.tsx";
import { DeletedProductsTable } from "@products/components/DeletedProductsTable.tsx";
import { PlusIcon } from "@/shared/components/icons/PlusIcon.tsx";
import { ProductsOverviewTable } from "@products/components/ProductsOverviewTable.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { ToggleDeletedButton } from "@shared/components/ui/ToggleDeletedButton.tsx";
import { useProductsStore } from "@products/hooks/useProductsStore.ts";

export function ProductsAdminPage() {
  const showDeleted = useProductsStore((state) => state.showDeleted);
  const setShowDeleted = useProductsStore((state) => state.setShowDeleted);

  function handleShowDeleted() {
    setShowDeleted(!showDeleted);
  }

  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header className={"flex w-full flex-wrap items-center justify-between gap-2"}>
        <Title>List of products</Title>

        <div className={"flex flex-wrap gap-2"}>
          <ToggleDeletedButton onClick={handleShowDeleted} showDeleted={showDeleted} />
          <Button
            as={Link}
            className={"w-full sm:w-auto"}
            color={"primary"}
            href={"/admin/products/create"}
            startContent={<PlusIcon width={18} height={18} fill={"white"} />}
          >
            Create new
          </Button>
        </div>
      </header>

      <ProductsOverviewTable />

      <div className={"mt-2 flex flex-col gap-3"}>
        <RenderIf condition={showDeleted}>
          <Subtitle>List of deleted products</Subtitle>
          <DeletedProductsTable />
        </RenderIf>
      </div>
      <Outlet />
    </div>
  );
}
