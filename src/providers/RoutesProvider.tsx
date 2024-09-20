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
import RecoverPasswordPage from "@/shared/pages/user/RecoverPasswordPage.tsx";
import SendEmailToRecoverPasswordPage from "@/shared/pages/user/SendEmailToRecoverPasswordPage.tsx";
import EmailSentToRecoverPassword from "@/modules/user/components/EmailSentToRecoverPassword.tsx";
import NotFoundPage from "@/shared/pages/NotFoundPage.tsx";

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
          <Route path={"signup"} element={<SignUpPage />} />
          <Route path={"signin"} element={<SignInPage />} />
          <Route path={"activate"} element={<ActivateUserPage />} />
          <Route path={"email-sent"} element={<EmailSent />} />
          <Route path={"recover-password"} element={<RecoverPasswordPage />} />
          <Route
            path={"send-email"}
            element={<SendEmailToRecoverPasswordPage />}
          />
          <Route
            path={"recover-password-email-sent"}
            element={<EmailSentToRecoverPassword />}
          />
        </Route>
        <Route path={"/not-found"} element={<NotFoundPage />} />
      </Routes>
    </NextUIProvider>
  );
}
