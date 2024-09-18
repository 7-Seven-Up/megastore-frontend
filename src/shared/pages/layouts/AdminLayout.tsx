import { Outlet, useLocation } from "react-router-dom";
import { Link } from "@nextui-org/react";
import { CategoryIcon } from "@/shared/components/icons/CategoryIcon.tsx";

export function AdminLayout() {
  const { pathname } = useLocation();
  const adminItems = [
    {
      path: "/admin/categories",
      label: "Categories",
    },
  ];

  return (
    <section className={"min-h-screenMinusNavbar w-full"}>
      <aside
        className={
          "w-adminSidebar fixed flex h-full flex-col gap-2 border-1 border-b-0 border-t-0 border-r-default/50 bg-background p-2 md:p-6"
        }
      >
        {adminItems.map((item) => {
          const { label, path } = item;
          const isActive = pathname === path;

          return (
            <Link
              className={`flex items-center justify-center gap-4 rounded-md p-2 text-lg text-foreground transition-all duration-75 ease-linear md:p-3 ${isActive ? "bg-primary/10 font-medium" : ""}`}
              href={path}
              key={path}
            >
              <span className={"hidden md:block"}>{label}</span>
              <div className={"md:hidden"}>
                <CategoryIcon />
              </div>
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
