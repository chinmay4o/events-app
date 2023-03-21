import React from "react";
import { useNavigate } from "react-router-dom";

const AttendeeMeetings = ({ singleEvent }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5]">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED]">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/attendee")}
        />
        <span className="ml-2 text-[22px] font-[500]">Meetings</span>
      </div>
    </div>
  );
};

export default AttendeeMeetings;
