import React from "react";

const AttendeesSent = ({
  settrigger,
  trigger,
  isEdit,
  setIsEdit,
  isCancelled,
  setisCancelled,
}) => {
  return (
    <>
      <div
        // key={key}
        className="bg-[#FFFFFF] mb-4 rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[220px] mt-3"
      >
        <div className="flex items-center relative">
          {/* {speakerData.profilePicture ? (
        <img
          src={speakerData.profilePicture}
          className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
        />
      ) : ( */}
          <div
            className={`sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] rounded-full bg-${
              ["red", "green", "blue", "yellow", "indigo"][
                Math.floor(Math.random() * 5)
              ]
            }-500 flex items-center justify-center mr-2 text-white text-lg font-medium uppercase`}
          >
            {/* {speakerData.firstName.slice(0, 1)}
              {speakerData.lastName.slice(0, 1)} */}
            PT
          </div>
          {/* )} */}

          <div className="">
            <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] md:font-semibold">
              {/* {speakerData.firstName} {speakerData.lastName} */}
              Parth Thakkar
            </div>
            <div className="text-[12px] font-medium py-[0px] text-gray-500">
              {/* {speakerData.jobTitle}, {speakerData.organization} */}
              Product Designer, Ream Design
            </div>
          </div>
        </div>
        <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 italic pb-2">
          “Hello Pulkit, I request a brief meeting to discuss some design ideas
          and to express my admiration for the inspiring work you have done for
          Warpbay. Thank you.”
          {/* {speakerData.speaker.eventSpecificData[0].bio.split("")
            .length > 150 ? (
            <>
              {speakerData.speaker.eventSpecificData[0].bio.slice(
                0,
                130
              )}
              ...
            </>
          ) : (
            <>
              {" "}
              {speakerData.speaker.eventSpecificData[0].bio.slice(
                0,
                150
              )}
            </>
          )} */}
        </div>
        <span className="text-[#727374] text-[12px] font-[500] flex ">
          Tomorrow | 10:00 am
        </span>
        <span className="text-[#727374] text-[12px] font-[500] flex my-3">
          <img
            src="/svgs/Location.svg"
            alt="location"
            className="h-[18px] w-[18px] mx-[5px] ml-[-3px] "
          />
          Cubic #5, Networking Dorm
        </span>

        <div className="mymd:mt-3 mt-1 flex justify-between">
          <span
            className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[500] text-[12px] border h-[32px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
            onClick={() => {
              setisCancelled(true);
              settrigger(true);
            }}
          >
            Cancel
          </span>

          <span
            className="flex items-center cursor-pointer text-[#1C1C1E] text-[12px] font-[500] text-[12px] border h-[32px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
            onClick={() => {
              settrigger(true);
              setIsEdit(true);
            }}
          >
            Edit request
          </span>
        </div>
      </div>
    </>
  );
};

export default AttendeesSent;
