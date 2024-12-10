import { Navigate, Route, Routes } from "react-router-dom";

import { ProductDetailPage } from "@/features/products/components/detail/ProductDetailPage.tsx";

export function ProductRoutes() {
  return (
    <Routes>
      <Route path={":productId"} element={<ProductDetailPage />} />
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  );
}
