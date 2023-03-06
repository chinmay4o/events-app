import React from 'react';
import PieChart from '../charts/PieChart';

// Import utilities
import { tailwindConfig, hexToRGB } from "../../../../utils/Utils";

function FintechCard09() {
  
  const chartData = {
    labels: ['Male', 'Female', "Did not answer"],
    datasets: [
      {
        label: 'Sessions By Device',
        data: [12, 13, 4],
        backgroundColor: [
          tailwindConfig().theme.colors.emerald[400],
          tailwindConfig().theme.colors.amber[400],
          tailwindConfig().theme.colors.sky[400],
          tailwindConfig().theme.colors.indigo[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.emerald[500],
          tailwindConfig().theme.colors.amber[500],
          tailwindConfig().theme.colors.sky[500],
          tailwindConfig().theme.colors.indigo[600],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    // <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
    <div className="my-[40px] flex flex-col col-span-full sm:col-span-6 bg-[#f9fbff] shadow-lg rounded-sm">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Gender Ratio</h2>
      </header>
      <div className="px-5 py-3">
        {/* <div className="text-sm italic mb-2">Hey Mark, here is the value of your portfolio:</div> */}
        {/* <div className="text-3xl font-bold text-slate-800">$224,807.27</div> */}
      </div>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <PieChart data={chartData} width={389} height={220} />
    </div>
  );
}

export default FintechCard09;
