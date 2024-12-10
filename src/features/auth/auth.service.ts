import { ActivateUserRequest } from "@/features/auth/interfaces/requests/activate-user.interface.ts";
import { AuthResponse } from "@/features/auth/interfaces/responses/auth.interface.ts";
import { SignInRequest } from "@/features/auth/interfaces/requests/sign-in.interface.ts";
import { SignUpRequest } from "@/features/auth/interfaces/requests/sign-up.interface.ts";
import { httpClient } from "@shared/lib/httpClient.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const activateUser = async (params: ActivateUserRequest) => {
  const { userId, activationToken } = params;

  await httpClient.post<void>(`${BACKEND_URL}/api/v1/users/${userId}/activate`, {
    activationToken,
  });
};

export async function sendNewActivationToken(params: { activationToken: string }) {
  await httpClient.post<void>(`${BACKEND_URL}/api/v1/users/send-new-activation-token`, params);
}

export async function signUpUser(params: SignUpRequest) {
  await httpClient.post(`${BACKEND_URL}/auth/signup`, params);
}

export async function signInUser(params: SignInRequest) {
  const response = await httpClient.post<AuthResponse>(`${BACKEND_URL}/auth/signin`, null, {
    headers: {
      Authorization: "Basic " + btoa(`${params.username}:${params.password}`),
    },
  });

  return response.data;
}
