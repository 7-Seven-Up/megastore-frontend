import { useGetMostSoldProducts } from '@/modules/reports/hooks/useGetMostSoldProducts';
import { BetweenDatesSelector } from '@/shared/components/ui/BetweenDatesSelector';
import { PieChart } from '@mui/x-charts';
import { DateValue } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export function MostSoldProductChart() {

  const [dateFrom, setDateFrom] = useState<DateValue>()
  const [dateTo, setDateTo] = useState<DateValue>()
  const { mostSoldProducts, refetch } = useGetMostSoldProducts(dateFrom, dateTo)

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
        mostSoldProducts && <PieChart
          series={[
            {
              data: 
                mostSoldProducts.map((product) => ({
                    id: product.name,
                    value: product.quantity,
                    label: product.name
                })),
            },
          ]}
          height={600}
        />
      }
    </div>
  );
}
