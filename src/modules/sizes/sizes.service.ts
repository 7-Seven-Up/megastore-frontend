import { httpClient } from "@/shared/lib/httpClient.ts";
import { Size } from "./interfaces/responses/size.interface";
import { SizeRequest } from "./interfaces/requests/size-request.interface";

const SIZES_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/sizes`;

export async function createSize(params: SizeRequest) {
  const response = await httpClient.post<Size>(SIZES_URL, {
    ...params,
  });
  return response.data;
}
