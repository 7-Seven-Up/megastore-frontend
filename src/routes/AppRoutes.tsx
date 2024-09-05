import { Route, Routes, useNavigate } from "react-router-dom";

import AppLayout from "../shared/pages/layouts/AppLayout.tsx";
import HomePage from "../shared/pages/HomePage.tsx";
import ProductsPage from "../shared/pages/ProductsPage.tsx";
import { NextUIProvider } from "@nextui-org/react";

export default function AppRoutes() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path={"products"} element={<ProductsPage />} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}
