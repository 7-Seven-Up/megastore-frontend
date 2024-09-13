import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponse } from "@/shared/interfaces/error-response.interface.ts";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    toast.error(error.response?.data.message ?? "An unknown error occurred.");
    return Promise.reject(error);
  },
);
