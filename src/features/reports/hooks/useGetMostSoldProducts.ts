import { getMostSoldProducts } from '../reports.service.ts';
import { GET_MOST_SOLD_PRODUCTS } from '../constants.ts';
import { useQuery } from '@tanstack/react-query';
import { DateValue } from '@nextui-org/react';

export function useGetMostSoldProducts(dateFrom: DateValue | undefined, dateTo: DateValue | undefined) {
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getMostSoldProducts(dateFrom, dateTo),
    queryKey: [GET_MOST_SOLD_PRODUCTS],
    staleTime: Infinity,
  });

  return {
    mostSoldProducts: data,
    isLoading,
    isError,
    refetch
  };
}
