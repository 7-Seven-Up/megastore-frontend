import { useState } from 'react';
import { OrderByStateChart } from './charts/OrderByStateChart';
import { MostSoldProductChart } from './charts/MostSoldProductChart';

export function ReportsPage() {

  const [selectedReport, setSelectedReport] = useState<string>('Orders by state')
  const reports = {
    "Orders by state": <OrderByStateChart />,
    "Most sold products": <MostSoldProductChart />
  }

  return (
    <div className={"flex flex-col gap-6 p-6"}>
      <header
        className={"flex w-full flex-wrap items-center gap-5"}
      >
        <div>
          <p className={"text-4xl"}>Report</p>
        </div>
        <div>
          <select 
            className={"text-xl"}
            onChange={(event) => { setSelectedReport(event.target.value) }}>
            {
              Object.keys(reports).map(reportType =>  <option key={reportType}>{reportType}</option>)
            }
          </select>
        </div>
      </header>
      <div>
        { reports[selectedReport] }
      </div>
    </div>
  );
}
