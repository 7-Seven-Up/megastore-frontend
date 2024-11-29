import { Button, Link } from "@nextui-org/react";
import { Outlet } from "react-router-dom";

import RenderIf from "@shared/components/RenderIf.tsx";
import { CategoriesOverviewTable } from "@categories/components/CategoriesOverviewTable.tsx";
import { DeletedCategoriesTable } from "@categories/components/DeletedCategoriesTable.tsx";
import { PlusIcon } from "@/shared/components/icons/PlusIcon.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { ToggleDeletedButton } from "@shared/components/ui/ToggleDeletedButton.tsx";
import { useCategoriesStore } from "@categories/hooks/useCategoriesStore.ts";

export function CategoriesAdminPage() {
  const showDeleted = useCategoriesStore((state) => state.showDeleted);
  const setShowDeleted = useCategoriesStore((state) => state.setShowDeleted);

  function handleShowDeleted() {
    setShowDeleted(!showDeleted);
  }

  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header
        className={"flex w-full flex-wrap items-center justify-between gap-2"}
      >
        <Title>List of categories</Title>
        <div className={"flex flex-wrap gap-2"}>
          <ToggleDeletedButton
            onClick={handleShowDeleted}
            showDeleted={showDeleted}
          />

          <Button
            as={Link}
            href={"/admin/categories/create"}
            color={"primary"}
            className={"w-full sm:w-auto"}
            startContent={<PlusIcon width={18} height={18} fill={"white"} />}
          >
            Create new
          </Button>
        </div>
      </header>

      <CategoriesOverviewTable />

      <div className={"mt-2 flex flex-col gap-3"}>
        <RenderIf condition={showDeleted}>
          <Subtitle>List of deleted categories</Subtitle>
          <DeletedCategoriesTable />
        </RenderIf>
      </div>
      <Outlet />
    </div>
  );
}
