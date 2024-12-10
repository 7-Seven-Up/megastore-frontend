import { httpClient } from "@shared/lib/httpClient.ts";
import { RecoverPasswordRequest } from "@/features/users/interfaces/requests/recover-password.interface.ts";
import { SendEmailRequest } from "@/features/users/interfaces/requests/send-email.interface.ts";

const USER_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`;
export const recoverPassword = async ({
  newPassword,
  confirmNewPassword,
  token,
}: RecoverPasswordRequest) => {
  await httpClient.post<void>(`${USER_ENDPOINT}/recover-password`, {
    password: newPassword,
    confirmPassword: confirmNewPassword,
    recoverPasswordToken: token,
  });
};

export const sendEmail = async ({ email, path }: SendEmailRequest) => {
  await httpClient.post<void>(`${USER_ENDPOINT}${path}`, {
    email,
  });
};
