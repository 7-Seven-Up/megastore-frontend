import { Suspense } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { AdminRoutes } from "@/providers/AdminRoutes.tsx";
import { AppLayout } from "@/shared/pages/layouts/AppLayout.tsx";
import { AuthRoutes } from "@/providers/AuthRoutes.tsx";
import { FullscreenLoading } from "@/shared/components/ui/FullscreenLoading.tsx";
import { HomePage } from "@/shared/pages/HomePage.tsx";
import { NotFoundPage } from "@/shared/pages/NotFoundPage.tsx";

export default function RoutesProvider() {
  const navigate = useNavigate();
  
  return (
    <NextUIProvider navigate={navigate}>
      <Suspense fallback={<FullscreenLoading />}>
        <Routes>
          <Route path={"/"} element={<AppLayout />}>
            <Route index element={<HomePage />} />
            {AdminRoutes()}
          </Route>

          {AuthRoutes()}

          <Route path={"not-found"} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </Suspense>
    </NextUIProvider>
  );
}
