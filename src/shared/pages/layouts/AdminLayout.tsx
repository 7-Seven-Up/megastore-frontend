import { Outlet, useLocation } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { CategoryIcon } from "@/shared/components/icons/CategoryIcon.tsx";
import { HomeIcon } from "@/shared/components/icons/HomeIcon.tsx";
import { SizeIcon } from "@/shared/components/icons/SizeIcon";
import { ShirtFoldedIcon } from "@/shared/components/icons/ShirtFoldedIcon.tsx";

export function AdminLayout() {
  const { pathname } = useLocation();
  const adminItems = [
    {
      icon: HomeIcon,
      label: "Dashboard",
      path: "/admin",
    },
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
  ];

  return (
    <section className={"min-h-screenMinusNavbar w-full"}>
      <aside
        className={
          "fixed flex h-full w-adminSidebar flex-col gap-2 border-1 border-b-0 border-t-0 border-r-default/50 bg-background p-2 md:p-6"
        }
      >
        {adminItems.map((item) => {
          const { icon, label, path } = item;
          const isActive = pathname === path;

          return (
            <Link
              className={`flex items-center justify-center gap-3 rounded-md px-4 py-2 text-medium text-foreground transition-all duration-75 ease-linear md:justify-start md:px-4 md:py-3 ${isActive ? "bg-primary/10 font-medium" : "hover:bg-primary/5 hover:font-medium"} transition-all duration-75 ease-linear`}
              href={path}
              key={path}
            >
              <div>{icon()}</div>
              <span className={"hidden md:block"}>{label}</span>
            </Link>
          );
        })}
      </aside>

      <div className={"pl-adminSidebar"}>
        <Outlet />
      </div>
    </section>
  );
}
