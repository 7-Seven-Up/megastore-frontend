import { httpClient } from "@/shared/lib/httpClient.ts";
import { RecoverPasswordRequest } from "@/modules/user/interfaces/requests/recover-password.interface.ts";
import { SendEmailRequest } from "@/modules/user/interfaces/requests/send-email.interface.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const recoverPassword = async ({
  email,
  newPassword,
  confirmNewPassword,
  token,
}: RecoverPasswordRequest) => {
  await httpClient.post<void>(
    `${BACKEND_URL}/api/v1/auth/recover-password/${email}`,
    {
      password: newPassword,
      confirmPassword: confirmNewPassword,
      recoverPasswordToken: token,
    },
  );
};

export const sendRecoverPasswordEmail = async ({ email }: SendEmailRequest) => {
  await httpClient.post<void>(
    `${BACKEND_URL}/api/v1/users/recover-password/send-email`,
    {
      email,
    },
  );
};
