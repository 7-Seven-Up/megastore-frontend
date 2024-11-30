import { getOrdersByState } from '../reports.service';
import { GET_ORDERS_BY_STATE } from '../constants';
import { useQuery } from '@tanstack/react-query';
import { DateValue } from '@nextui-org/react';

export function useOrderByState(dateFrom: DateValue | undefined, dateTo: DateValue | undefined) {
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getOrdersByState(dateFrom, dateTo),
    queryKey: [GET_ORDERS_BY_STATE],
    staleTime: Infinity,
  });

  return {
    ordersByState: data,
    isLoading,
    isError,
    refetch
  };
}
