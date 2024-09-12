import { httpClient } from "@/shared/lib/httpClient.ts";
import { ActivateUserRequest } from "@auth/interfaces/requests/activate-user.interface.ts";
import { SignUpRequest } from "@auth/interfaces/requests/sign-up.interface.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const activateUser = async (params: ActivateUserRequest) => {
  const { userId, activationToken } = params;

  await httpClient.post<void>(
    `${BACKEND_URL}/api/v1/users/${userId}/activate`,
    {
      activationToken,
    },
  );
};

export async function signUpUser(params: SignUpRequest) {
  await httpClient.post(`${BACKEND_URL}/auth/signup`, params);
}
