import { Navigate, Route, Routes } from "react-router-dom";

import { AVAILABLE_CATEGORIES } from "@/features/categories/constants.ts";
import { AllCategoriesPage } from "@shared/pages/home/AllCategoriesPage.tsx";
import { OuterwearPage } from "@shared/pages/home/OutwearPage.tsx";
import { PantsPage } from "@shared/pages/home/PantsPage.tsx";
import { ShirtsPage } from "@shared/pages/home/ShirtsPage.tsx";

export function CategoriesRoutes() {
  return (
    <Routes>
      <Route path={AVAILABLE_CATEGORIES.TSHIRTS} element={<ShirtsPage />} />
      <Route path={AVAILABLE_CATEGORIES.PANTS} element={<PantsPage />} />
      <Route path={AVAILABLE_CATEGORIES.OUTERWEAR} element={<OuterwearPage />} />
      <Route path={"all"} element={<AllCategoriesPage />} />
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  );
}
