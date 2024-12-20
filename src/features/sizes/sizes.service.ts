import { CreateSizeRequest } from "./interfaces/requests/create-size.interface.ts";
import { PaginationRequest } from "@shared/interfaces/pagination/pagination-request.interface.ts";
import { Size } from "./interfaces/responses/size.interface.ts";
import { SizeResponse } from "./interfaces/responses/size-response.interface.ts";
import { httpClient } from "@shared/lib/httpClient.ts";

const SIZES_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/sizes`;

export async function createSize(params: CreateSizeRequest) {
  const response = await httpClient.post<Size>(SIZES_URL, {
    ...params,
  });
  return response.data;
}

export async function getSizes(params: PaginationRequest) {
  const response = await httpClient.get<SizeResponse>(SIZES_URL, {
    params,
  });
  return response.data;
}

export async function getDeletedSizes(params: PaginationRequest) {
  const response = await httpClient.get<SizeResponse>(`${SIZES_URL}/deleted`, {
    params,
  });
  return response.data;
}

export async function restoreSize(sizeId: string) {
  const response = await httpClient.post<Size>(`${SIZES_URL}/${sizeId}/restore`);
  return response.data;
}

export async function updateSize(params: Size) {
  const response = await httpClient.put<Size>(`${SIZES_URL}/${params.sizeId}`, {
    ...params,
  });
  return response.data;
}

export async function deleteSize(sizeId: string) {
  await httpClient.delete(`${SIZES_URL}/${sizeId}`);
}
