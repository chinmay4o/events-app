import React, { useEffect, useState } from "react";
import BarChart from "../charts/BarChart05";

// Import utilities
import { tailwindConfig } from "../../../../utils/Utils";

function getDayWiseRegistrations(arr, eventId = null, entity) {
  if (arr.length === 0) {
    return "arr has no elements";
  }
  if (!eventId) {
    return "can't find event id";
  }

  const resultsArray = [];

  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i].attendee[0].eventSpecificData;
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

function FintechCard04({ attendees, singleEvent }) {
  const [resultsArray, setResultsArray] = useState([]);
  const [yAxis, setYaxis] = useState([]);
  const [xAxis, setXaxis] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [
      "01-01-2023",
      "01-02-2023",
      "01-03-2023",
      "01-04-2023",
      "01-05-2023",
      "01-06-2023",
    ],
    datasets: [
      // Indigo bars
      {
        label: "Attendees",
        data: [800, 2600, 3700, 1200, 3200, 1700],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  });

  useEffect(() => {
    if (attendees?.length > 0) {
      setResultsArray(
        getDayWiseRegistrations(attendees, singleEvent._id, "attendees")
      );
    }
  }, [singleEvent._id, attendees]);

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
      datasets: [
        {
          ...chartData.datasets[0],
          data: generateYAxis(resultsArray, dateArray),
        },
      ],
    });
  }, [resultsArray]);

  useEffect(() => {
    setChartData({
      labels: dateArray,
      datasets: [
        // Indigo bars
        {
          label: "Attendees",
          data: yAxis,
          backgroundColor: tailwindConfig().theme.colors.indigo[500],
          hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
          barPercentage: 0.66,
          categoryPercentage: 0.66,
        },
      ],
    });
  }, [yAxis, xAxis]);

  return (
    <div className="my-[40px] flex flex-col col-span-full sm:col-span-6 bg-[#f9fbff] shadow-lg rounded-sm">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-[600] text-[#000]">
          Attendee Registrations - Day Wise
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart
        data={chartData}
        width={595}
        height={248}
        toolTip="Attendees"
        attendees={attendees.length}
      />
    </div>
  );
}

export default FintechCard04;
