import React from "react";
import { useNavigate } from "react-router-dom";

const AttendeeAttendees = ({ singleEvent }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[60px] md:relative">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/events")}
        />
        <span className="ml-2 text-[22px] font-[500]">Attendees</span>
      </div>
    </div>
  );
};

export default AttendeeAttendees;
