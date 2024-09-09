import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className={"flex min-h-screen"}>
      <section
        className={"hidden min-h-screen flex-1 bg-primary lg:block"}
      ></section>
      <section className={"flex flex-1 items-center justify-center"}>
        <Outlet />
      </section>
    </main>
  );
}
