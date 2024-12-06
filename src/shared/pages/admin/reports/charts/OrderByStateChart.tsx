import { useOrderByState } from '@/modules/reports/hooks/useOrderByState';
import { BetweenDatesSelector } from '@/shared/components/ui/BetweenDatesSelector';
import { reportNameFormatter } from '@/shared/utils/reportNameFormatter';
import { BarChart } from '@mui/x-charts/BarChart/BarChart';
import { DatePicker, DateValue } from '@nextui-org/react';
import {  useEffect, useState } from 'react';

export function OrderByStateChart() {

  const [dateFrom, setDateFrom] = useState<DateValue>()
  const [dateTo, setDateTo] = useState<DateValue>()
  const { ordersByState, refetch } = useOrderByState(dateFrom, dateTo)

  useEffect(() => {
    refetch()
  }, [dateFrom, dateTo, refetch])
   
  return (
    <div className={"flex flex-col gap-6 p-6"}>
      <BetweenDatesSelector 
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
      />

      {
        ordersByState && 
        <BarChart
          xAxis={[{ scaleType: 'band', data: Object.keys(ordersByState).map(name => reportNameFormatter(name)) }]}
          series={[{ data: Object.values(ordersByState) }]}
          height={600}
        />
      }
    </div>
  );
}
