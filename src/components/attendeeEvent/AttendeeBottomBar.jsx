import React from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";

const AttendeeBottomBar = ({ singleEvent }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 h-[65px] z-20 w-full items-center flex shadow md:hidden bg-white justify-evenly">
      <span
        className={`${
          searchParams.get("tab") === "about"
            ? "text-primary"
            : "text-[#C5C5C7]"
        } flex flex-col justify-center items-center  cursor-pointer`}
        onClick={() => navigate(`/attendee/${singleEvent?._id}?tab=about`)}
      >
        <img
          src="/svgs/Clipboard.svg"
          alt="Clipboard"
          className="h-[21px] w-[21px]"
        />
        <span className="text-[11px] font-[600]">About</span>
      </span>

      <span
        className={`${
          searchParams.get("tab") === "schedule"
            ? "text-primary"
            : "text-[#C5C5C7]"
        } flex flex-col justify-center items-center  cursor-pointer`}
        onClick={() => navigate(`/attendee/${singleEvent?._id}?tab=schedule`)}
      >
        <img
          src="/svgs/calender.svg"
          alt="Clipboard"
          className="h-[22px] w-[22px]"
        />
        <span className="text-[11px] font-[600]">Schedule</span>
      </span>

      <span
        className={`${
          searchParams.get("tab") === "speakers"
            ? "text-primary"
            : "text-[#C5C5C7]"
        } flex flex-col justify-center items-center  cursor-pointer`}
        onClick={() => navigate(`/attendee/${singleEvent?._id}?tab=speakers`)}
      >
        <img
          src="/svgs/Speakers.svg"
          alt="Clipboard"
          className="h-[22px] w-[22px]"
        />
        <span className="text-[11px] font-[600]">Speakers</span>
      </span>

      <span
        className={`${
          searchParams.get("tab") === "people"
            ? "text-primary"
            : "text-[#C5C5C7]"
        } flex flex-col justify-center items-center  cursor-pointer`}
        onClick={() => navigate(`/attendee/${singleEvent?._id}?tab=people`)}
      >
        <img
          src="/svgs/People.svg"
          alt="Clipboard"
          className="h-[22px] w-[22px]"
        />
        <span className="text-[11px] font-[600]">Attendees</span>
      </span>

      <span
        className={`${
          searchParams.get("tab") === "meetings"
            ? "text-primary"
            : "text-[#C5C5C7]"
        } flex flex-col justify-center items-center  cursor-pointer`}
        onClick={() => navigate(`/attendee/${singleEvent?._id}?tab=meetings`)}
      >
        <img
          src="/svgs/Meetings.svg"
          alt="Clipboard"
          className="h-[22px] w-[22px]"
        />
        <span className="text-[11px] font-[600]">Meetings</span>
      </span>
    </div>
  );
};

export default AttendeeBottomBar;
