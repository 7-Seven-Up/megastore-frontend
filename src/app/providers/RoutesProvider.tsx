import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { AdminRoutes } from "@/app/routes/AdminRoutes.tsx";
import { AppLayout } from "@shared/pages/layouts/AppLayout.tsx";
import { AuthRoutes } from "@/app/routes/AuthRoutes.tsx";
import { CheckoutPage } from "@shared/pages/cart/CheckoutPage.tsx";
import { HomePage } from "@shared/pages/HomePage.tsx";
import { NotFoundPage } from "@shared/pages/NotFoundPage.tsx";
import { ProductRoutes } from "@/app/routes/ProductRoutes.tsx";
import { UserRoutes } from "@/app/routes/UserRoutes.tsx";
import { CategoriesRoutes } from "@/app/routes/CategoriesRoutes.tsx";
import { SearchProductRoutes } from "@/app/routes/SearchProductRoutes.tsx";
import { UserOrGuestRoute } from "@shared/pages/routes/UserOrGuestRoute.tsx";

export default function RoutesProvider() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} locale="es-AR">
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path={"user/*"} element={<UserRoutes />} />
          <Route path={"admin/*"} element={<AdminRoutes />} />
          <Route path={"products/*"} element={<ProductRoutes />} />
          <Route path={"categories/*"} element={<CategoriesRoutes />} />
          <Route path={"search/*"} element={<SearchProductRoutes />} />
          <Route
            path={"checkout"}
            element={
              <UserOrGuestRoute>
                <CheckoutPage />
              </UserOrGuestRoute>
            }
          />
        </Route>

        <Route path={"/auth/*"} element={<AuthRoutes />} />

        <Route path={"not-found"} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </NextUIProvider>
  );
}
