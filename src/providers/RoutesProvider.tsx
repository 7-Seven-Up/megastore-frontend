import { Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { ActivateUserPage } from "@/shared/pages/auth/ActivateUserPage.tsx";
import { AdminLayout } from "@/shared/pages/layouts/AdminLayout.tsx";
import { AdminPage } from "@/shared/pages/admin/AdminPage.tsx";
import { AppLayout } from "@/shared/pages/layouts/AppLayout.tsx";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout.tsx";
import { EmailSent } from "@/shared/pages/auth/EmailSent.tsx";
import { HomePage } from "@/shared/pages/HomePage.tsx";
import { ProductsPage } from "@/shared/pages/ProductsPage.tsx";
import { ProtectedRoute } from "@/shared/pages/routes/ProtectedRoute.tsx";
import { Role } from "@/modules/users/enums/role.enum.ts";
import { SignInPage } from "@/shared/pages/auth/SignInPage.tsx";
import { SignUpPage } from "@/shared/pages/auth/SignUpPage.tsx";
import { UnauthenticatedRoute } from "@/shared/pages/routes/UnauthenticatedRoute.tsx";
import { CategoryAdminPage } from "@/shared/pages/admin/CategoryAdminPage.tsx";
import { CreateCategoryPage } from "@/shared/pages/admin/CreateCategoryPage.tsx";

export default function RoutesProvider() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path={"products"} element={<ProductsPage />} />
          <Route
            path={"admin"}
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPage />} />
            <Route path={"categories"} element={<CategoryAdminPage />}>
              <Route path={"create"} element={<CreateCategoryPage />} />
            </Route>
          </Route>
        </Route>
        <Route
          path={"/auth"}
          element={
            <UnauthenticatedRoute>
              <AuthLayout />
            </UnauthenticatedRoute>
          }
        >
          <Route path={"signup"} element={<SignUpPage />} />
          <Route path={"signin"} element={<SignInPage />} />
          <Route path={"activate"} element={<ActivateUserPage />} />
          <Route path={"email-sent"} element={<EmailSent />} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}
