import React from "react";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../../../utils/Utils";
import LineChart08 from "../charts/LineChart08";

function FintechCard10() {
  const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
      "06-01-2021",
      "07-01-2021",
      "08-01-2021",
      "09-01-2021",
      "10-01-2021",
      "11-01-2021",
      "12-01-2021",
      "01-01-2022",
      "02-01-2022",
      "03-01-2022",
      "04-01-2022",
      "05-01-2022",
      "06-01-2022",
      "07-01-2022",
      "08-01-2022",
      "09-01-2022",
      "10-01-2022",
      "11-01-2022",
      "12-01-2022",
      "01-01-2023",
    ],
    datasets: [
      // Line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
          154, 273, 191, 191, 126, 263, 349, 252, 323, 322, 270, 232,
        ],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.rose[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.rose[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.rose[500],
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
          <div className="text-[22px] font-[600] text-[#000] mb-1">236</div>
          <div className="text-sm">
            <span className="font-medium text-emerald-500">+49 (4,7%)</span> -
            Today
          </div>
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart08 data={chartData} width={286} height={98} />
      </div>
    </div>
  );
}

export default FintechCard10;
