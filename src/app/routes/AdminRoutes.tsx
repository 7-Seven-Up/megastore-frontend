import { Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "@shared/pages/layouts/AdminLayout.tsx";
import { CategoriesAdminPage } from "@shared/pages/admin/categories/CategoriesAdminPage.tsx";
import { CreateCategoryPage } from "@shared/pages/admin/categories/CreateCategoryPage.tsx";
import { CreateProductPage } from "@shared/pages/admin/products/CreateProductPage.tsx";
import { CreateSizePage } from "@shared/pages/admin/sizes/CreateSizePage.tsx";
import { ProductsAdminPage } from "@shared/pages/admin/products/ProductsAdminPage.tsx";
import { ProtectedRoute } from "@shared/pages/routes/ProtectedRoute.tsx";
import { ReportsPage } from "@shared/pages/admin/reports/ReportsPage.tsx";
import { Role } from "@/features/users/enums/role.enum.ts";
import { SizesAdminPage } from "@shared/pages/admin/sizes/SizesAdminPage.tsx";

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={[Role.ADMIN]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path={"categories"} element={<CategoriesAdminPage />}>
          <Route path={"create"} element={<CreateCategoryPage />} />
        </Route>

        <Route path={"sizes"} element={<SizesAdminPage />}>
          <Route path={"create"} element={<CreateSizePage />} />
        </Route>

        <Route path={"products"} element={<ProductsAdminPage />}>
          <Route path={"create"} element={<CreateProductPage />} />
        </Route>

        <Route path={"reports"} element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate replace to="/admin/products" />} />
    </Routes>
  );
}
