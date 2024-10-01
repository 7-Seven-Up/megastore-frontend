import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponse } from "@/shared/interfaces/error-response.interface.ts";
import { EXCLUDED_BEARER_ROUTES } from "@/shared/lib/constants.ts";
import { useAuthStore } from "@auth/hooks/useAuthStore.ts";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const errorMessage =
      error.response?.data.message ??
      (error.status === 403 || error.status === 401
        ? "You are not authorized to access this resource."
        : "An unknown error occurred.");

    toast.error(errorMessage);

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use(function (config) {
  const { authResponse } = useAuthStore.getState();
  if (!authResponse) return config;

  const { accessToken } = authResponse;
  const shouldExclude = EXCLUDED_BEARER_ROUTES.some((path) =>
    config.url?.includes(path),
  );

  if (!shouldExclude && accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});
