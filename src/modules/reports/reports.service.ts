import { httpClient } from '@/shared/lib/httpClient';
import { OrdersByState } from './responses/OrdersByState.interface';
import { DateValue } from '@nextui-org/react';
import { MostSoldProduct } from './responses/MostSoldProduct.interface';

const REPORTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports`;

export async function getOrdersByState(dateFrom: DateValue | undefined, dateTo: DateValue | undefined) {
  const response = await httpClient.get<OrdersByState>(`${REPORTS_URL}/orders-by-state`, { params: { dateFrom, dateTo }});
  return response.data;
}

export async function getMostSoldProducts(dateFrom: DateValue | undefined, dateTo: DateValue | undefined) {
  const response = await httpClient.get<MostSoldProduct[]>(`${REPORTS_URL}/most-sold-products`, { params: { dateFrom, dateTo }});
  return response.data;
}