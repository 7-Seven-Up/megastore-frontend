import { useState } from 'react';
import { OrderByStateChart } from './charts/OrderByStateChart';
import { TopClientsChart } from './charts/TopClientsChart';

export function ReportsPage() {

  const [selectedReport, setSelectedReport] = useState<string>('Orders by state')
  const reports = {
    "Orders by state": <OrderByStateChart />,
    "Top clients chart": <TopClientsChart />
  }

  return (
    <div className={"flex min-h-screenMinusNavbar flex-col gap-6 p-6"}>
      <header
        className={"flex w-full flex-wrap items-center justify-between gap-2"}
      >
        <div>
          <h1>Reports</h1>
        </div>
        <div>
          <select onChange={(event) => { setSelectedReport(event.target.value) }}>
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
