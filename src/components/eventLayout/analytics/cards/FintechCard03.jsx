import React from 'react';
import BarChart from '../charts/BarChart05';

// Import utilities
import { tailwindConfig } from "../../../../utils/Utils";

function FintechCard03({attendees}) {

  const chartData = {
    labels: [
      '01-01-2023', '01-02-2023', '01-03-2023',
      '01-04-2023', '01-05-2023', '01-06-2023'
    ],
    datasets: [
      // Indigo bars
      {
        label: 'Check-ins',
        data: [800, 2600, 3700, 1200, 3200, 1700],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Grey bars
      {
        label: 'Check-outs',
        data: [2800, 1700, 900, 2900, 1950, 3100],
        backgroundColor: tailwindConfig().theme.colors.slate[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.slate[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="my-[40px] flex flex-col col-span-full sm:col-span-6 bg-[#f9fbff] shadow-lg rounded-sm">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-[600] text-[#000]">Number of participants - Day Wise</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} toolTip="Attendees" attendees={attendees}/>
    </div>
  );
}

export default FintechCard03;
