import { Navigate, Route, Routes } from "react-router-dom";
import { OrderDetailPage } from "@shared/pages/orders/OrderDetailPage.tsx";
import { ProtectedRoute } from "@shared/pages/routes/ProtectedRoute.tsx";
import { Role } from "@/features/users/enums/role.enum.ts";
import { UserAccountLayout } from "@shared/pages/layouts/UserAccountLayout.tsx";
import { UserOrdersPage } from "@shared/pages/user/UserOrdersPage.tsx";

export function UserRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={[Role.USER]}>
            <UserAccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={"orders"} element={<UserOrdersPage />} />
        <Route path={"orders/:orderId"} element={<OrderDetailPage />} />
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
