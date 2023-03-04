import React from "react";
import LineChart from "../charts/LineChart09";
import { Utils } from "chart.js";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../../../utils/Utils";

function FintechCard10({attendees}) {
  function generateArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr;
  }

  // const newArray = generateArray(9);

  const labels = generateArray(18);
  const chartData = {
    labels: labels,
    datasets: [
      // Line
      {
        data: [
          0, 100, 30, 50, 0, 60, 220, 30, 6, 20, 100, 30, 50, 40, 60, 120,
          30, 56, 10,
          //20, 30, 20, 100, 30, 50, 40, 200, 400, 600, 100,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.orange[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.orange[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-[#f9fbff] shadow-lg rounded-sm">
      <div className="px-5 pt-5">
        <header>
          <h3 className="text-[15px] font-[600] mb-1">
            <span className="text-[#000]">Attendees</span>
          </h3>
          <div className="text-[22px] font-[600] text-[#000] mb-1">{attendees}</div>
          <div className="text-sm">
            <span className="font-medium text-emerald-500">+49</span> - Today
          </div>
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow w-full">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart
          data={chartData}
          width={286}
          height={98}
          toolTip="Attendees"
        />
      </div>
    </div>
  );
}

export default FintechCard10;
