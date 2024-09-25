import { httpClient } from "@/shared/lib/httpClient.ts";
import { Size } from "./interfaces/responses/size.interface";
import { CreateSizeRequest } from "./interfaces/requests/create-size.interface";
import { PaginationRequest } from "@/shared/interfaces/pagination/pagination-request.interface";
import { SizeResponse } from "./interfaces/responses/size-response.interface";
import { UpdateSizeRequest } from "./interfaces/requests/update-size.interface";

const SIZES_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/sizes`;

export async function createSize(params: CreateSizeRequest) {
  const response = await httpClient.post<Size>(SIZES_URL, {
    ...params,
  });
  return response.data;
}

export async function getSizes(params: PaginationRequest) {
  const response = await httpClient.get<SizeResponse[]>(SIZES_URL, {
    params,
  });
  return response.data;
}

export async function updateSize(params: UpdateSizeRequest) {
  const response = await httpClient.put<Size>(`${SIZES_URL}/${params.sizeId}`, {
    ...params,
  });
  return response.data;
}

export async function deleteSize(sizeId: string) {
  await httpClient.delete(`${SIZES_URL}/${sizeId}`);
}
