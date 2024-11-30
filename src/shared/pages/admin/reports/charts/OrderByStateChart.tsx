import { useOrderByState } from '@/modules/reports/hooks/useOrderByState';
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
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <div className={"flex gap-6 p-2"}>
        <div>
          <p>Date from</p>
          <DatePicker value={dateFrom} onChange={setDateFrom} label={'Date from'}/>
        </div>
        <div>
          <p>Date to</p>
          <DatePicker value={dateTo} onChange={setDateTo} label={'Date to'}/>
        </div>
      </div>

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
