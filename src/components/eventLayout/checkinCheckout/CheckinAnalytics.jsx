import React, { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { getRequest } from "../../../utils/API/api.ts";

function CheckinAnalytics() {
  const eventsid = useMatch("events/:eventId/*");
  const navigate = useNavigate();
  const location = useLocation();
  const [options, setOptions] = useState({
    total: { value: 0, title: "Total Registrations" },
    attended: { value: 0, title: "Total Attended" },
    notAttended: {
      value: 0,
      title: "Yet to Attend",
    },
    checkedIn: {
      value: 0,
      title: "Checked In",
    },
    checkedOut: {
      value: 0,
      title: "Checked Out",
    },
  });

  useEffect(() => {
    console.log(
      eventsid.params.eventId,
      options,
      "eventsid.params.eventId && options"
    );

    if (eventsid.params.eventId && options) {
      getAttendeeStats();
    }
  }, [eventsid.params.eventId]);

  const getAttendeeStats = async () => {
    const response = await getRequest(
      `attendee/${eventsid.params.eventId}/stats`
    );

    const newOptions = { ...options };

    Object.keys(newOptions).forEach((stat) => {
      newOptions[stat].value = response?.data?.registrations[stat];
    });

    setOptions(newOptions);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {options &&
          Object.keys(options).length > 0 &&
          Object.keys(options).map((key, index) => {
            return (
              <SingleAnalytics
                key={key}
                index={index}
                title={options[key].title}
                value={options[key].value}
              />
            );
          })}
      </div>
      <div className="flex flex-col items-center m-10 ">
        <div
          className="px-5 grid place-items-center cursor-pointer"
          onClick={() => navigate(`${location.pathname}/scan`)}
        >
          <img src="/svgs/qr.svg" alt="QR" className="" />
          <div>Scan QR</div>
        </div>
      </div>
    </div>
  );
}

const SingleAnalytics = ({ index, title, value }) => {
  return (
    <div
      id={`${index}`}
      key={index}
      className="border-2 w-36 h-36 mx-6 mb-4 rounded-lg bg-[#C5C5C7] flex items-center justify-around flex-col"
    >
      <div className="font-[500] text-[#2b2b2b] text-center text-[16px]">
        {title}
      </div>
      <div className="font-[700] text-[#2b2b2b] text-[22px] pb-5">{value}</div>
    </div>
  );
};

export default CheckinAnalytics;
