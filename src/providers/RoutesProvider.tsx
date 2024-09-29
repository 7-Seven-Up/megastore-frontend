import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { ActivateUserPage } from "@/shared/pages/auth/ActivateUserPage.tsx";
import { AdminLayout } from "@/shared/pages/layouts/AdminLayout.tsx";
import { AdminPage } from "@/shared/pages/admin/AdminPage.tsx";
import { AppLayout } from "@/shared/pages/layouts/AppLayout.tsx";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout.tsx";
import { EmailSent } from "@/shared/pages/auth/EmailSent.tsx";
import { HomePage } from "@/shared/pages/HomePage.tsx";
import { ProtectedRoute } from "@/shared/pages/routes/ProtectedRoute.tsx";
import { Role } from "@/modules/user/enums/role.enum.ts";
import { SignInPage } from "@/shared/pages/auth/SignInPage.tsx";
import { SignUpPage } from "@/shared/pages/auth/SignUpPage.tsx";
import RecoverPasswordPage from "@/shared/pages/user/RecoverPasswordPage.tsx";
import SendEmailToRecoverPasswordPage from "@/shared/pages/user/SendEmailToRecoverPasswordPage.tsx";
import EmailSentToRecoverPassword from "@/modules/user/components/EmailSentToRecoverPassword.tsx";
import NotFoundPage from "@/shared/pages/NotFoundPage.tsx";
import { UnauthenticatedRoute } from "@/shared/pages/routes/UnauthenticatedRoute.tsx";
import { CategoryAdminPage } from "@/shared/pages/admin/CategoryAdminPage.tsx";
import { CreateCategoryPage } from "@/shared/pages/admin/CreateCategoryPage.tsx";
import { SizeAdminPage } from "@/shared/pages/admin/SizeAdminPage";
import { CreateSizePage } from "@/shared/pages/admin/CreateSizePage";
import { ProductAdminPage } from "@/shared/pages/admin/ProductAdminPage.tsx";
import { CreateProductPage } from "@/shared/pages/admin/CreateProductPage.tsx";
import { ResendActivationEmailPage } from "@/shared/pages/user/ResendActivationEmailPage.tsx";
import { ActivationEmailResent } from "@/shared/pages/auth/ActivationEmailResent.tsx";

export default function RoutesProvider() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<HomePage />} />
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
          <Route
            path={"activation-email-resent"}
            element={<ActivationEmailResent />}
          />
          <Route path={"recover-password"} element={<RecoverPasswordPage />} />
          <Route
            path={"send-email"}
            element={<SendEmailToRecoverPasswordPage />}
          />
          <Route
            path={"recover-password-email-sent"}
            element={<EmailSentToRecoverPassword />}
          />
          <Route
            path={"resend-activation-email"}
            element={<ResendActivationEmailPage />}
          />
        </Route>
        <Route path={"not-found"} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </NextUIProvider>
  );
}
