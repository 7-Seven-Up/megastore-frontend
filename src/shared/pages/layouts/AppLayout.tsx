import { Outlet } from "react-router-dom";
import Navbar from "../../components/ui/Navbar.tsx";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main
        className={
          "mx-auto flex min-h-[calc(100dvh_-_88px)] max-w-screen-2xl items-center justify-center p-6"
        }
      >
        <Outlet />
      </main>
    </>
  );
}
