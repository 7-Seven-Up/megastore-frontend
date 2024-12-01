import { Outlet, useLocation } from "react-router-dom";
import { Link, Tooltip } from "@nextui-org/react";
import { CategoryIcon } from "@/shared/components/icons/CategoryIcon.tsx";
import { SizeIcon } from "@/shared/components/icons/SizeIcon";
import { ShirtFoldedIcon } from "@/shared/components/icons/ShirtFoldedIcon.tsx";
import { ReportIcon } from '@/shared/components/icons/ReportIcon';

export function AdminLayout() {
  const { pathname } = useLocation();
  const adminItems = [
    {
      icon: ShirtFoldedIcon,
      label: "Products",
      path: "/admin/products",
    },
    {
      icon: CategoryIcon,
      label: "Categories",
      path: "/admin/categories",
    },
    {
      icon: SizeIcon,
      label: "Sizes",
      path: "/admin/sizes",
    },
    {
      icon: ReportIcon,
      label: "Reports",
      path: "/admin/reports",
    },
    
  ];

  return (
    <section className={"min-h-screenMinusNavbar w-full"}>
      <aside
        className={
          "fixed flex h-full w-adminSidebar flex-col gap-2 border-1 border-b-0 border-t-0 border-r-default/50 bg-background p-2 lg:p-4 2xl:p-6"
        }
      >
        {adminItems.map((item) => {
          const { icon, label, path } = item;
          const isActive = pathname === path;

          return (
            <Tooltip
              key={path}
              className={"font-medium 2xl:hidden"}
              closeDelay={0}
              content={label}
              placement={"right"}
            >
              <Link
                className={`flex flex-col items-center justify-center rounded-md px-1 py-2 text-medium text-foreground transition-all duration-75 ease-linear md:justify-start 2xl:flex-row 2xl:gap-3 2xl:px-4 2xl:py-3 ${isActive ? "bg-primary/10 2xl:font-medium" : "hover:bg-primary/5 hover:font-medium"} transition-all duration-75 ease-linear`}
                href={path}
              >
                <div>{icon()}</div>
                <span className={"hidden 2xl:block"}>{label}</span>
                <span
                  className={
                    "w-full break-words text-center text-tiny lg:hidden"
                  }
                >
                  {label}
                </span>
              </Link>
            </Tooltip>
          );
        })}
      </aside>

      <div className={"pl-adminSidebar"}>
        <Outlet />
      </div>
    </section>
  );
}
