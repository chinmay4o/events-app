import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DemoEventBar = () => {
  const navigate = useNavigate();
  const singleEvent = useSelector((state) => state.eventData);
  return (
    <>
      {singleEvent.isMockEvent && (
        <div className="bg-primary z-50 fixed top-0 w-full flex flex-col sm:flex-row justify-center items-center h-10 text-white text-[16px] font-[600]">
          <div>This is a demo event.</div>
          <div
            className="underline pl-1.5 cursor-pointer"
            onClick={() => navigate("/createvent")}
          >
            Create your new event now
          </div>
        </div>
      )}
    </>
  );
};

export default DemoEventBar;
