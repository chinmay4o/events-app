import React, { useEffect, useState } from "react";
import LineChart from "../charts/LineChart09";
// Import utilities
import { tailwindConfig, hexToRGB } from "../../../../utils/Utils";

function getDayWiseRegistrations(arr, eventId = null, entity) {
  if (arr.length === 0) {
    return "arr has no elements";
  }
  if (!eventId) {
    return "can't find event id";
  }

  const resultsArray = [];

  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i].speaker.eventSpecificData;
    for (let f = 0; f < ele.length; f++) {
      if (ele[f].eventId === eventId) {
        const utcDate = new Date(ele[f].timeStamp);
        const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        };
        const dateString = utcDate.toLocaleDateString("en-IN", options);

        let obj = {
          date: dateString,
          registrations: 1,
        };

        let index = null;
        for (let s = 0; s < resultsArray.length; s++) {
          console.log(new Date(resultsArray[s].date).getDate(), "result Date");
          // console.log(new Date(dateString).toISOString(), "new Date");
          if (resultsArray[s].date === dateString) {
            index = s;
          }
        }

        if (index === 0 || index) {
          resultsArray[index].registrations =
            resultsArray[index].registrations + 1;
        } else {
          resultsArray.push(obj);
        }
      } else {
        console.log("event id is different");
      }
    }
  }
  return resultsArray;
}

function getDetailedLabels(startDate, endDate) {
  // let newEndDate = endDate;
  // if (new Date() < endDate) {
  //   newEndDate = endDate;
  // }
  const startDate1 = new Date(startDate);
  const endDate1 = new Date(endDate);
  const dateArray = [];
  let currentDate1 = startDate1;
  while (currentDate1 <= endDate1) {
    // dateArray.push(
    //   `${currentDate1.getDate()}/0${
    //     currentDate1.getMonth() + 1
    //   }/${currentDate1.getFullYear()}`
    // );
    // currentDate1.setDate(currentDate1.getDate() + 1);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    const dateString = currentDate1.toLocaleDateString("en-IN", options);
    dateArray.push(dateString);
    currentDate1.setDate(currentDate1.getDate() + 1);
  }
  console.log(dateArray);
  //   console.log(new Date("2023-03-20").toISOString())
  return dateArray;
}

function FintechCard12({ speakers, singleEvent }) {
  const [resultsArray, setResultsArray] = useState([]);
  const [yAxis, setYaxis] = useState([]);
  const [xAxis, setXaxis] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      // Line
      {
        data: [0, 10, 2, 1, 0, 0, 12, 1, 3],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.indigo[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  });

  useEffect(() => {
    if (speakers?.length > 0) {
      setResultsArray(
        getDayWiseRegistrations(speakers, singleEvent._id, "speakers")
      );
    }
  }, [singleEvent._id, speakers]);

  let lineChartEndDate = singleEvent.endDate;
  const dateArray = getDetailedLabels(singleEvent.createdAt, lineChartEndDate);

  function generateXAxis(dateArray) {
    let arr = [];
    for (let i = 0; i < dateArray.length; i++) {
      arr.push(i);
    }
    return arr;
  }

  function generateYAxis(resultsArray, dateArray) {
    let dataArr = [];
    for (let i = 0; i < dateArray.length; i++) {
      let count = 0;
      for (let j = 0; j < resultsArray.length; j++) {
        if (dateArray[i] === resultsArray[j].date) {
          dataArr.push(resultsArray[j].registrations);
          count++;
        }
      }
      if (count === 0) {
        dataArr.push(0);
        count = 0;
      }
    }
    console.log(dataArr);
    return dataArr;
  }

  useEffect(() => {
    setYaxis(generateYAxis(resultsArray, dateArray));
    setXaxis(generateXAxis(dateArray));
    setChartData({
      ...chartData,
      datasets: [{ ...chartData.datasets[0], data: generateYAxis(resultsArray, dateArray) }],
    });
  }, [resultsArray]);

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
  }, [yAxis,xAxis]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-[#f9fbff] shadow-lg rounded-sm">
      <div className="px-5 pt-5">
        <header>
          <h3 className="text-[15px] font-[600] mb-1">
            <span className="text-[#000]">Speakers</span>
          </h3>
          <div className="text-[22px] font-[600] text-[#000] mb-1">
            {yAxis.reduce((accumulator, currentValue) => {
              return accumulator + currentValue;
            }, 0)}
          </div>
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart
          data={chartData}
          width={256}
          height={98}
          toolTip="Speakers"
        />
      </div>
    </div>
  );
}

export default FintechCard12;
