import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { ErrorResponse } from "@/shared/interfaces/ErrorResponse.ts";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    toast.error(error.response?.data.message ?? "Error desconocido");
    return Promise.reject(error);
  },
);
