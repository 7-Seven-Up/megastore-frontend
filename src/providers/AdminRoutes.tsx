import { lazy } from "react";
import { Route } from "react-router-dom";

import { ProtectedRoute } from "@/shared/pages/routes/ProtectedRoute.tsx";
import { Role } from "@/modules/users/enums/role.enum.ts";

const AdminLayout = lazy(() => import("@/shared/pages/layouts/AdminLayout"));
const AdminPage = lazy(() => import("@/shared/pages/admin/AdminPage"));
const CategoryAdminPage = lazy(() => import("@/shared/pages/admin/CategoryAdminPage"));
const CreateCategoryPage = lazy(() => import("@/shared/pages/admin/CreateCategoryPage"));
const CreateProductPage = lazy(() => import("@/shared/pages/admin/CreateProductPage"));
const CreateSizePage = lazy(() => import("@/shared/pages/admin/CreateSizePage"));
const ProductAdminPage = lazy(() => import("@/shared/pages/admin/ProductAdminPage"));
const SizeAdminPage = lazy(() => import("@/shared/pages/admin/SizeAdminPage"));

export function AdminRoutes() {
  return (
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

      <Route path={"sizes"} element={<SizeAdminPage />}>
        <Route path={"create"} element={<CreateSizePage />} />
      </Route>

      <Route path={"products"} element={<ProductAdminPage />}>
        <Route path={"create"} element={<CreateProductPage />} />
      </Route>
    </Route>
  );
}
