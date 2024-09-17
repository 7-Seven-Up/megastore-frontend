import { Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { ActivateUserPage } from "@/shared/pages/auth/ActivateUserPage.tsx";
import { AppLayout } from "@/shared/pages/layouts/AppLayout.tsx";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout.tsx";
import { HomePage } from "@/shared/pages/HomePage.tsx";
import { ProductsPage } from "@/shared/pages/ProductsPage.tsx";
import { SignInPage } from "@/shared/pages/auth/SignInPage.tsx";
import { SignUpPage } from "@/shared/pages/auth/SignUpPage.tsx";
import { EmailSent } from "@/shared/pages/auth/EmailSent.tsx";
import { UnauthenticatedRoute } from "@/shared/pages/routes/UnauthenticatedRoute.tsx";

export default function RoutesProvider() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path={"products"} element={<ProductsPage />} />
        </Route>
        <Route path={"/auth"} element={<AuthLayout />}>
          <Route
            path={"signup"}
            element={
              <UnauthenticatedRoute>
                <SignUpPage />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path={"signin"}
            element={
              <UnauthenticatedRoute>
                <SignInPage />
              </UnauthenticatedRoute>
            }
          />
          <Route path={"activate"} element={<ActivateUserPage />} />
          <Route path={"email-sent"} element={<EmailSent />} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}
