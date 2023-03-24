import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookMeeting from "../../people/BookMeeting";
import AttendeeContactDetails from "./AttendeeContactDetails";
import MeetingsNotes from "./MeetingsNotes";

const AttendeeMeetings = ({ singleEvent }) => {
  const navigate = useNavigate();
  const [trigger, settrigger] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [isCancelled, setisCancelled] = useState(false);
  const [viewContact, setViewContact] = useState(false);
  const [notes, setNotes] = useState(false);
  if (notes) {
    return <MeetingsNotes setNotes={setNotes} />;
  }
  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[60px] md:relative">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/events")}
        />
        <span className="ml-2 text-[22px] font-[500]">Meetings</span>
      </div>
      {viewContact && (
        <AttendeeContactDetails
          setViewContact={setViewContact}
          viewContact={viewContact}
        />
      )}
      {trigger && (
        <BookMeeting
          trigger={trigger}
          settrigger={settrigger}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          isReschedule={isReschedule}
          setIsReschedule={setIsReschedule}
          isCancelled={isCancelled}
          setisCancelled={setisCancelled}
        />
      )}

      <div className="mt-[60px] mx-[16px] pt-[16px] pb-[80px] md:pt-0 md:mt-[140px] md:w-[65%] md:flex flex-wrap justify-between">
        {/* {
          singleEvent.speakers.map((speakerData, key) => ( */}
        <>
          <div
            // key={key}
            className="bg-[#FFFFFF] mb-4 h-[250px] rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[220px]"
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
              <img
                src="/svgs/Phone.svg"
                alt=""
                className="right-[10px] absolute cursor-pointer"
                onClick={() => setViewContact(true)}
              />
            </div>
            <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 min-h-[70px] italic">
              “Hello Pulkit, I request a brief meeting to discuss some design
              ideas and to express my admiration for the inspiring work you have
              done for Warpbay. Thank you.”
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
                className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[500] text-[12px] border h-[32px] w-[30%] justify-center rounded-[4px] md:w-[140px]"
                onClick={() => {
                  setisCancelled(true);
                  settrigger(true);
                }}
              >
                Cancel
              </span>

              <span
                className="flex items-center cursor-pointer text-[#1C1C1E] text-[12px] font-[500] text-[12px] border h-[32px] w-[30%] justify-center rounded-[4px] md:w-[140px]"
                onClick={() => {
                  settrigger(true);
                  setIsReschedule(true);
                }}
              >
                Reschedule
              </span>
              <span
                className="flex items-center cursor-pointer text-white text-[12px] font-[500] text-[12px] h-[32px] w-[30%] justify-center rounded-[4px] bg-primary md:w-[140px]"
                onClick={() => setNotes(true)}
              >
                Notes
              </span>
            </div>
          </div>
        </>
        <>
          <div
            // key={key}
            className="bg-[#FFFFFF] mb-4 h-[160px] rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[220px]"
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
              <img
                src="/svgs/Phone.svg"
                alt=""
                className="right-[10px] absolute cursor-pointer"
                onClick={() => setViewContact(true)}
              />
            </div>
            <div className="text-[#2ECC71] text-[12px] font-[500] italic my-[17px]">
              You had a meeting on 20 Feb 2023
            </div>
            <span className="flex items-center cursor-pointer text-white text-[12px] font-[500] text-[12px] h-[32px] w-[100%] justify-center rounded-[4px] bg-primary md:w-[140px]">
              <a
                // href={speakerData.linkedinUrl}
                className="flex items-center "
                target="_blank"
              >
                Notes
              </a>
            </span>
          </div>
        </>
      </div>
    </div>
  );
};

export default AttendeeMeetings;
