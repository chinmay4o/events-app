import React, { useEffect, useState } from "react";
import LineChart from "../charts/LineChart09";
import { Utils } from "chart.js";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../../../utils/Utils";

function FintechCard10({ resultsArray, dateArray }) {
  const [yAxis, setYaxis] = useState([]);
  const [xAxis, setXaxis] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      // Line
      {
        data: [0, 1, 2, 0, 40, 0, 9, 0, 4],
        // data: yAxis,
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
  });
  const [todayReg, setTodayReg] = useState(0);

  useEffect(() => {
    setYaxis(generateYAxis(resultsArray, dateArray));
    setXaxis(generateXAxis(dateArray));
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: generateYAxis(resultsArray, dateArray),
        },
      ],
    });
    const utcDate = new Date();
    // const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    const dateString = utcDate.toLocaleDateString("en-IN", options);

    for (let j = 0; j < resultsArray.length; j++) {
      if (dateString === resultsArray[j].date) {
        setTodayReg(resultsArray[j].registrations);
      }
    }
  }, [dateArray, resultsArray]);

  function generateYAxis(resultsArray, dateArray) {
    console.log(resultsArray, "64  = 64");
    const registrations = [];
    for (let i = 0; i < dateArray.length; i++) {
      const date = dateArray[i];
      const result = resultsArray.find((r) => r.date === date);
      registrations.push(result ? result.registrations : 0);
    }
    console.log(registrations, "registrations = registrations");
    return registrations;
  }

  function generateXAxis(dateArray) {
    let arr = [];
    for (let i = 0; i < dateArray.length; i++) {
      arr.push(i);
    }
    return arr;
  }

  useEffect(() => {
    setChartData({
      labels: xAxis,
      datasets: [
        // Line
        {
          data: yAxis,
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
    });
  }, [yAxis, xAxis]);

  // const chartData = {
  //   labels: dateArray,
  //   datasets: [
  //     // Line
  //     {
  //       // data: [
  //       //   0, 5, 0, 0, 0, 60, 0, 30, 6, 20, 100, 30, 50, 40, 60, 120, 30, 56, 10,
  //       // ],
  //       data: xAxis,
  //       fill: true,
  //       backgroundColor: `rgba(${hexToRGB(
  //         tailwindConfig().theme.colors.orange[500]
  //       )}, 0.08)`,
  //       borderColor: tailwindConfig().theme.colors.orange[500],
  //       borderWidth: 2,
  //       tension: 0,
  //       pointRadius: 0,
  //       pointHoverRadius: 3,
  //       pointBackgroundColor: tailwindConfig().theme.colors.orange[500],
  //       clip: 20,
  //     },
  //   ],
  // };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-[#f9fbff] shadow-lg rounded-sm">
      <div className="px-5 pt-5">
        <header>
          <h3 className="text-[15px] font-[600] mb-1">
            <span className="text-[#000]">Attendees</span>
          </h3>
          <div className="text-[22px] font-[600] text-[#000] mb-1">
            {yAxis.reduce((accumulator, currentValue) => {
              return accumulator + currentValue;
            }, 0)}
          </div>
          <div className="text-sm">
            <span className="font-medium text-emerald-500">+{todayReg}</span> -
            Today
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
