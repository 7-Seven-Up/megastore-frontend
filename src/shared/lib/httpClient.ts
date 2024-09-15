import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponse } from "@/shared/interfaces/error-response.interface.ts";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.status === 403 || error.status === 401) {
      toast.error("You are not authorized to access this resource.");
      return Promise.reject(error);
    }

    toast.error(error.response?.data.message ?? "An unknown error occurred.");
    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use(function (config) {
  const excludedPaths = ["/auth/signin", "/auth/signup"];
  const shouldExclude = excludedPaths.some((path) =>
    config.url?.includes(path),
  );

  if (shouldExclude) {
    return config;
  }

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});
