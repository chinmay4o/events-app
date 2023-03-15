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

function getDayWiseRegistrations(arr, eventId = null, entity) {
  if (arr.length === 0) {
    return "arr has no elements";
  }
  if (!eventId) {
    return "can't find event id";
  }
  // param is array of attendees with obj inside
  //will have attendee property that property has property named eventSpecificData
  //which had set of objects where each object is entry of attendee registering to te particular event
  // that object further has property named timeStamp which is UTC ISO date format
  //now this function will match the eventId and will create an array of objects with properties as date and registrations
  // which signifies number of registrations on a certain date
  const resultsArray = [];

  for (let i = 0; i < arr.length; i++) {
    // let ele;
    // if (entity === "attendees") {
    //   ele = arr[i].attendees[0].eventSpecificData;
    // }
    // if (entity === "exhibitorAndSponsors") {
    //   ele = arr[i].exhibitorAndSponsors[0].eventSpecificData;
    // }
    const ele = arr[i].attendee[0].eventSpecificData;
    for (let f = 0; f < ele.length; f++) {
      if (ele[f].eventId === eventId) {
        const date = new Date(ele[f].timeStamp);

        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          /* hour: 'numeric',
         minute: 'numeric', */
          /* hour12: true, */
          timeZone: "Asia/Kolkata",
        };
        const dateString = date.toLocaleDateString("en-IN", options);

        let obj = {
          date: dateString,
          registrations: 1,
        };

        let index = null;
        for (let s = 0; s < resultsArray.length; s++) {
          if (resultsArray[s].date === dateString) {
            index = s;
          }
        }

        if (index) {
          resultsArray[index].registrations =
            resultsArray[index].registrations + 1;
        } else {
          resultsArray.push(obj);
        }
      }
      // else {
      //   console.log("event id can not be found");
      // }
    }
  }
  return getLabels(resultsArray);
}

function getLabels(arr) {
  let arrLabels = [];
  let arrDataPoints = [];
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    arrLabels.push(ele.date);
    arrDataPoints.push(ele.registrations);
  }
  return;
}

const Analytics = () => {
  const [attendees, setAttendees] = useState([]);
  const [exhibitors, setExhibitors] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [attendedRegistrations, setAttendedRegistrations] = useState([]);
  const singleEvent = useSelector((state) => state.eventData);
  const eventsId = useMatch("/events/:eventId");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllEventAttendees(`/attendee/${eventsId.params.eventId}`);
    getAttendedAttendees();
    // if (singleEvent.exhibitorAndSponsor?.length) {
    //   setExhibitors(singleEvent.exhibitorAndSponsors);
    // }
  }, []);

  useEffect(() => {
    getDayWiseRegistrations(attendees, singleEvent._id, "attendees");
  }, [attendees]);

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
        // attendees: [...attendees, response.data.attendees],
        attendees: [...response.data.attendees],
      },
    });
    console.log(response.data.attendees, "response.data.attendees");
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
      <p className="font-[600] w-full mx-auto md:w-full text-[24px] pt-2.5 text-black">
        Analytics
      </p>

      <div className="mt-[20px] flex justify-between">
        <FintechCard10 attendees={attendees.length} />
        <FintechCard11 exhibitors={exhibitors.length} />
        <FintechCard12 speakers={speakers.length} />
      </div>

      {/* Checkin-Checkouts : Number of participants day wise */}
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
