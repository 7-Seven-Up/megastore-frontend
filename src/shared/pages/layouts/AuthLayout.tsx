import { Outlet } from "react-router-dom";
import Logo from "@/shared/components/ui/Logo.tsx";

export default function AuthLayout() {
  return (
    <main className={"flex min-h-screen"}>
      <section
        className={
          "hidden min-h-screen flex-1 items-center justify-center bg-[#053262] lg:flex"
        }
      >
        <Logo />
      </section>
      <section className={"flex flex-1 items-center justify-center"}>
        <Outlet />
      </section>
    </main>
  );
}
