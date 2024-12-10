import { Button, Link } from "@nextui-org/react";
import { Outlet } from "react-router-dom";

import RenderIf from "@shared/components/RenderIf.tsx";
import { DeletedSizesTable } from "@/features/sizes/components/DeletedSizesTable.tsx";
import { PlusIcon } from "@shared/components/icons/PlusIcon.tsx";
import { SizesOverviewTable } from "@/features/sizes/components/SizesOverviewTable.tsx";
import { Subtitle } from "@shared/components/typography/Subtitle.tsx";
import { Title } from "@shared/components/typography/Title.tsx";
import { ToggleDeletedButton } from "@shared/components/ui/ToggleDeletedButton.tsx";
import { useSizesStore } from "@/features/sizes/hooks/useSizesStore.ts";

export function SizesAdminPage() {
  const { showDeleted, setShowDeleted } = useSizesStore();

  function handleShowDeleted() {
    setShowDeleted(!showDeleted);
  }

  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header className={"flex w-full flex-wrap items-center justify-between gap-2"}>
        <Title>List of sizes</Title>

        <div className={"flex flex-wrap gap-2"}>
          <ToggleDeletedButton onClick={handleShowDeleted} showDeleted={showDeleted} />

          <Button
            as={Link}
            href={"/admin/sizes/create"}
            color={"primary"}
            className={"w-full sm:w-auto"}
            startContent={<PlusIcon width={18} height={18} fill={"white"} />}
          >
            Create new
          </Button>
        </div>
      </header>

      <SizesOverviewTable />

      <div className={"mt-2 flex flex-col gap-3"}>
        <RenderIf condition={showDeleted}>
          <Subtitle>List of deleted sizes</Subtitle>
          <DeletedSizesTable />
        </RenderIf>
      </div>

      <Outlet />
    </div>
  );
}
