import { Navigate, Route, Routes } from "react-router-dom";
import { SearchProductPage } from "@shared/pages/products/SearchProductPage.tsx";

export function SearchProductRoutes() {
  return (
    <Routes>
      <Route index={true} element={<SearchProductPage />} />
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  );
}
