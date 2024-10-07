import { Navigate, Route } from "react-router-dom";

import { ActivateUserPage } from "@/shared/pages/auth/ActivateUserPage.tsx";
import { ActivationEmailResent } from "@/shared/pages/auth/ActivationEmailResent.tsx";
import { AuthLayout } from "@/shared/pages/layouts/AuthLayout.tsx";
import { EmailSent } from "@/shared/pages/auth/EmailSent.tsx";
import { EmailSentToRecoverPassword } from "@/modules/users/components/EmailSentToRecoverPassword.tsx";
import { RecoverPasswordPage } from "@/shared/pages/user/RecoverPasswordPage.tsx";
import { ResendActivationEmailPage } from "@/shared/pages/user/ResendActivationEmailPage.tsx";
import { SendEmailToRecoverPasswordPage } from "@/shared/pages/user/SendEmailToRecoverPasswordPage.tsx";
import { SignInPage } from "@/shared/pages/auth/SignInPage.tsx";
import { SignUpPage } from "@/shared/pages/auth/SignUpPage.tsx";
import { UnauthenticatedRoute } from "@/shared/pages/routes/UnauthenticatedRoute.tsx";

export function AuthRoutes() {
  return (
    <Route
      path={"/auth"}
      element={
        <UnauthenticatedRoute>
          <AuthLayout />
        </UnauthenticatedRoute>
      }
    >
      <Route path={""} element={<Navigate to="signin" replace />} />
      <Route path={"*"} element={<Navigate to="signin" replace />} />
      <Route path={"activate"} element={<ActivateUserPage />} />
      <Route
        path={"activation-email-resent"}
        element={<ActivationEmailResent />}
      />
      <Route path={"email-sent"} element={<EmailSent />} />
      <Route path={"recover-password"} element={<RecoverPasswordPage />} />
      <Route
        path={"recover-password-email-sent"}
        element={<EmailSentToRecoverPassword />}
      />
      <Route
        path={"resend-activation-email"}
        element={<ResendActivationEmailPage />}
      />
      <Route path={"send-email"} element={<SendEmailToRecoverPasswordPage />} />
      <Route path={"signin"} element={<SignInPage />} />
      <Route path={"signup"} element={<SignUpPage />} />
    </Route>
  );
}
