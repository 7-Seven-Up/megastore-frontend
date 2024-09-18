import { Outlet } from "react-router-dom";
import { Navbar } from "@/shared/components/ui/Navbar.tsx";

export function AppLayout() {
  return (
    <>
      <Navbar />
      <main
        className={
          "min-h-screenMinusNavbar mx-auto flex items-center justify-center"
        }
      >
        <Outlet />
      </main>
    </>
  );
}
