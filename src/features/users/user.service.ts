import { RecoverPasswordRequest } from "@/features/users/interfaces/requests/recover-password.interface.ts";
import { SendEmailRequest } from "@/features/users/interfaces/requests/send-email.interface.ts";
import { httpClient } from "@shared/lib/httpClient.ts";
import { OrderResponse } from "@/features/orders/interfaces/response/order-response.interface.ts";

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

export async function getOrders(username: string) {
  const response = await httpClient.get<OrderResponse[]>(`${USER_ENDPOINT}/${username}/orders`);
  return response.data;
}
