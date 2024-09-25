import { Button, Link } from "@nextui-org/react";
import { PlusIcon } from "@/shared/components/icons/PlusIcon.tsx";
import { Title } from "@/shared/components/typography/Title.tsx";
import { Outlet } from "react-router-dom";
import { SizesTable } from "@/modules/sizes/components/SizesTable";

export function SizeAdminPage() {
  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header
        className={"flex w-full flex-wrap items-center justify-between gap-2"}
      >
        <Title>List of sizes</Title>
        <Button
          as={Link}
          href={"/admin/sizes/create"}
          color={"primary"}
          className={"w-full sm:w-auto"}
          startContent={<PlusIcon width={18} height={18} fill={"white"} />}
        >
          Create new
        </Button>
      </header>
      <SizesTable />
      <Outlet />
    </div>
  );
}
