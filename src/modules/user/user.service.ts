import { httpClient } from "@/shared/lib/httpClient.ts";
import { RecoverPasswordRequest } from "@/modules/user/interfaces/requests/recover-password.interface.ts";

const BACKEND_URL = import.meta.env.BASE_URL;

export const recoverPassword = async (params: RecoverPasswordRequest) => {
  const {userId, newPassword, token } = params;
  await  httpClient.post<void>(`${BACKEND_URL}/api/v1/users/${userId}/recover-password`, undefined, {
    params: {
      newPassword,
      token
    }
  })
}