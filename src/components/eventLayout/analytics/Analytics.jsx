import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequest } from "../../../utils/API/api.ts";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";

import FintechCard10 from "./cards/FintechCard10";
import FintechCard11 from "./cards/FintechCard11";
import FintechCard12 from "./cards/FintechCard12";
import FintechCard03 from "./cards/FintechCard03";
import FintechCard09 from "./cards/FintechCard09";
import FintechCard01 from "./cards/FintechCard01";
import AnalyticsCard02 from "./cards/AnalyticsCard02";
import { useMatch } from "react-router-dom";
import FintechCard04 from "./cards/FintechCard04";

function getDayWiseRegistrations(arr, eventId = null, entity) {
  if (arr.length === 0) {
    console.log("arr has no elements");
    return [];
  }
  if (!eventId) {
    console.log("can't find event id");
    return [];
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

function getDaysBetweenDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const oneDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
  const timeDiff = end.getTime() - start.getTime(); // Difference in milliseconds
  const daysDiff = Math.round(timeDiff / oneDay); // Round to nearest integer
  return daysDiff;
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

const Analytics = () => {
  const [attendees, setAttendees] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [resultsArray, setResultsArray] = useState([]);
  const [attendedRegistrations, setAttendedRegistrations] = useState([]);
  const singleEvent = useSelector((state) => state.eventData);
  const eventsId = useMatch("/events/:eventId");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
    getAttendedAttendees();
  }, []);

  useEffect(() => {
    setSpeakers(singleEvent.speakers);
  }, [singleEvent._id]);

  useEffect(() => {
    setResultsArray(
      getDayWiseRegistrations(attendees, singleEvent._id, "attendees")
    );
  }, [attendees, singleEvent._id]);

  let lineChartEndDate = singleEvent.endDate;
  const dateArray = getDetailedLabels(singleEvent.createdAt, lineChartEndDate);

  // useEffect(() => {
  //   getDayWiseRegistrations(
  //     exhibitors,
  //     singleEvent._id,
  //     "exhibitorAndSponsors"
  //   );
  // }, [exhibitors]);

  const getAllEventAttendees = async (route) => {
    const response = await getRequest(route);
    setAttendees([...response.data.attendees]);
    dispatch({
      type: UPDATE_EVENT,
      payload: {
        attendees: [...response.data.attendees],
      },
    });
  };

  const getAttendedAttendees = async () => {
    const response = await getRequest(
      `attendee/${eventsId.params.eventId}/attended/?hasAttended=true`
    );
    setAttendedRegistrations(response?.data?.registrations);
    console.log(response, "response.attended");
  };

  return (
    <div className="w-full md:w-[85%] md:ml-[0px] md:mt-[25px] min-h-[1260px">
      <p className="font-[600] w-full mx-auto md:w-full text-[22px] pt-2.5 text-black">
        Analytics
      </p>

      <div className="mt-[20px] flex justify-between">
        <FintechCard10 resultsArray={resultsArray} dateArray={dateArray} />
        <FintechCard11 />
        <FintechCard12 speakers={speakers} singleEvent={singleEvent} />
      </div>

      {/* attendee-registrations : Number of participants day wise  single bar*/}
      <div className="">
        <FintechCard04
          attendees={attendees}
          singleEvent={singleEvent}
          checkIns={true}
          checkOuts={false}
        />
      </div>

      {/* Checkin-Checkouts : Number of participants day wise 2 bars*/}
      <div className="">
        <FintechCard03
          attendees={attendees.length}
          checkIns={true}
          checkOuts={false}
        />
      </div>

      <div className="grid grid-cols-12 gap-[20px]">
        {/* Live active users */}
        <AnalyticsCard02 />
        {/* Gender ratio pie chart */}
        <FintechCard09 />
      </div>

      {/* Event attendees */}
      {/* <div className="">
        <FintechCard01 />
      </div> */}
    </div>
  );
};

export default Analytics;
