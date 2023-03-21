import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const AttendeeAbout = ({ singleEvent }) => {
  const navigate = useNavigate();
  const [tab, settab] = useState("");

  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5]">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED]">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/attendee")}
        />
        <span className="ml-2 text-[22px] font-[500]">
          {singleEvent?.title}
        </span>
      </div>
      <div className="mt-[60px] mx-[16px] pt-[16px]">
        <img
          src={singleEvent?.coverImage}
          alt="coverimage"
          className="h-[194px] w-full rounded-[10px] shadow"
        />
        <div className=" w-full">
          <div className="font-[500] text-[22px] mt-[8px] text-[#121212] ">
            {singleEvent?.title}
          </div>
          <div className="flex text-[12px] text-[#727374] font-normal mt-[4px]">
            <span>
              {singleEvent.startDate === singleEvent.endDate ? (
                <>
                  {new Date(singleEvent.startDate).getDate()}{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                  }).format(singleEvent.startDate)}
                </>
              ) : (
                <>
                  {new Date(singleEvent.startDate).getDate()}{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                  }).format(new Date(singleEvent.startDate))}{" "}
                  to {new Date(singleEvent.endDate).getDate()}{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                  }).format(new Date(singleEvent.endDate))}
                </>
              )}
            </span>
            <span>
              &nbsp;| {moment(singleEvent?.startDate).format("LT")} |&nbsp;
            </span>
            <span className="font-semibold text-[#2ECC71]">Ongoing</span>
          </div>

          <div className="flex text-[12px] text-[#727374] font-normal my-[9px] items-center">
            <img
              src="/svgs/Location.svg"
              alt="location"
              className="h-[18px] w-[18px] mr-[5px] ml-[-3px]"
            />
            {singleEvent.location?.addressLine1},{" "}
            {singleEvent.location?.pincode}, {singleEvent.location?.city},{" "}
            {singleEvent.location?.state}
          </div>
        </div>

        <div className="h-[130px] w-full bg-gradient-to-b from-primary to-[#7F2ECD] p-[16px] rounded-[10px] mt-[24px] shadow cursor-pointer">
          <span className="text-sm font-[400] text-white">
            Tap to expand your badge
          </span>
          <div className="flex mt-[10px]">
            <div className="border h-[64px] w-[64px] rounded-[10px]"></div>
            <div className="h-[64px] flex flex-col justify-between ml-3">
              <span className="text-white font-500 text-[16px]">
                Pulkit Madan
              </span>
              <span className="text-white font-400 text-[12px]">
                Event badge
              </span>
              <span className="text-white font-400 text-[12px]">
                {" "}
                {singleEvent.startDate === singleEvent.endDate ? (
                  <>
                    {new Date(singleEvent.startDate).getDate()}{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    }).format(singleEvent.startDate)}
                  </>
                ) : (
                  <>
                    {new Date(singleEvent.startDate).getDate()}{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    }).format(new Date(singleEvent.startDate))}{" "}
                    to {new Date(singleEvent.endDate).getDate()}{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    }).format(new Date(singleEvent.endDate))}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className=" w-full flex my-[20px] ">
          <span
            className={
              tab === "about" || tab === ""
                ? `font-[700] text-[#1C1C1E] text-[16px] underline underline-offset-8 cursor-pointer decoration-black decoration-2`
                : `font-[500] text-[#C5C5C7] text-[16px]  cursor-pointer`
            }
            onClick={() => settab("about")}
          >
            About
          </span>
          <span
            className={
              tab === "exhibitors"
                ? `font-[700] text-[#1C1C1E] text-[16px] underline underline-offset-8 cursor-pointer decoration-black decoration-2 mx-[30px]`
                : `font-[500] text-[#C5C5C7] text-[16px]  cursor-pointer mx-[30px]`
            }
            onClick={() => settab("exhibitors")}
          >
            Exhibitors
          </span>
          <span
            className={
              tab === "sponsors"
                ? `font-[700] text-[#1C1C1E] text-[16px] underline underline-offset-8 cursor-pointer decoration-black decoration-2`
                : `font-[500] text-[#C5C5C7] text-[16px]  cursor-pointer`
            }
            onClick={() => settab("sponsors")}
          >
            Sponsors
          </span>
        </div>
        {tab === "about" ? (
          <div className="text-[#1C1C1E] font-[400] text-sm  whitespace-pre-wrap">
            {singleEvent?.shortDescription}
          </div>
        ) : tab === "exhibitors" ? (
          <></>
        ) : tab === "sponsors" ? (
          <></>
        ) : (
          <div className="text-[#1C1C1E] font-[400] text-sm  whitespace-pre-wrap">
            {singleEvent?.shortDescription}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeAbout;
