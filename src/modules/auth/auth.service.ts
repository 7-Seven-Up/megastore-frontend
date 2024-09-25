import { httpClient } from "@/shared/lib/httpClient.ts";
import { ActivateUserRequest } from "@auth/interfaces/requests/activate-user.interface.ts";
import { SignUpRequest } from "@auth/interfaces/requests/sign-up.interface.ts";
import { SignInRequest } from "@auth/interfaces/requests/sign-in.interface.ts";
import { AuthResponse } from "@auth/interfaces/responses/auth.interface.ts";

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

export async function signInUser(params: SignInRequest) {
  const response = await httpClient.post<AuthResponse>(
    `${BACKEND_URL}/auth/signin`,
    null,
    {
      headers: {
        Authorization: "Basic " + btoa(`${params.username}:${params.password}`),
      },
    },
  );

  return response.data;
}
