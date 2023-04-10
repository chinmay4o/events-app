import React from "react";
import LineChart from "../charts/LineChart09";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../../../utils/Utils";

function FintechCard11() {
  const chartData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      // Line
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.emerald[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.emerald[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-[#f9fbff] shadow-lg rounded-sm">
      <div className="px-5 pt-5">
        <header>
          <h3 className="text-[15px] font-[600] mb-1">
            <span className="text-[#000]">Exhibitors</span>
          </h3>
          <div className="text-[22px] font-[600] text-[#000] mb-1">{0}</div>
          <div className="text-sm">
            <span className="font-medium text-emerald-500">0</span> - Today
          </div>
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart
          data={chartData}
          width={260}
          height={98}
          toolTip="Exhibitors"
        />
      </div>
    </div>
  );
}

export default FintechCard11;
