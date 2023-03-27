import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookMeeting from "../../people/BookMeeting";
import AttendeeContactDetails from "./AttendeeContactDetails";
import MeetingsNotes from "./MeetingsNotes";
import { getAuthenticatedRequest } from "../../../utils/API/api.ts";

const AttendeeMeetings = ({ singleEvent }) => {
  const navigate = useNavigate();
  const [trigger, settrigger] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [isCancelled, setisCancelled] = useState(false);
  const [viewContact, setViewContact] = useState(false);
  const [notes, setNotes] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState([]);
  useEffect(() => {
    async function fetch() {
      const response = await getAuthenticatedRequest("/user/meeting-details");
      console.log(response);
      setMeetingDetails(response?.data.user.scheduledMeetings);
    }
    fetch();
  }, []);
  console.log(meetingDetails);
  if (notes) {
    return <MeetingsNotes setNotes={setNotes} />;
  }

  const cancelScheduledMeeting = async (user) => {
    const updatedmeetingDetails = meetingDetails.map((meeting) => {
      if (meeting.meetingID === user.meetingID) {
        return { ...meeting, meetingStatus: "Cancelled" };
      }
      return meeting;
    });
    setMeetingDetails(updatedmeetingDetails);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Unauthorised User");
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/cancel-ScheduledMeetings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meetingID: user.meetingID,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[60px] md:relative z-10">
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
          meetingDetails={meetingDetails[0].meetingWith[0]}
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
          event={singleEvent}
        />
      )}

      <div className="mt-[60px] mx-[16px] pt-[16px] pb-[80px] md:pt-0 md:mt-[140px] md:w-[65%] md:flex flex-wrap justify-between">
        {meetingDetails.length > 0 ? (
          meetingDetails?.map((meeting) => {
            return (
              <>
                <div
                  key={meeting.meetingID}
                  className="bg-[#FFFFFF] mb-4 rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[220px]"
                >
                  <div className="flex items-center relative">
                    {meeting.meetingWith[0]?.profilePicture ? (
                      <img
                        src={meeting.meetingWith[0]?.profilePicture}
                        className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
                      />
                    ) : (
                      <div
                        className={`sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] rounded-full bg-${
                          ["red", "green", "blue", "yellow", "indigo"][
                            Math.floor(Math.random() * 5)
                          ]
                        }-500 flex items-center justify-center mr-2 text-white text-lg font-medium uppercase`}
                      >
                        {meeting.meetingWith[0]?.firstName.slice(0, 1)}
                        {meeting.meetingWith[0]?.lastName.slice(0, 1)}
                      </div>
                    )}

                    <div className="">
                      <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] md:font-semibold">
                        {meeting.meetingWith[0].firstName}{" "}
                        {meeting.meetingWith[0].lastName}
                      </div>
                      <div className="text-[12px] font-medium py-[0px] text-gray-500">
                        {meeting.meetingWith[0].jobTitle},{" "}
                        {meeting.meetingWith[0].organization}
                      </div>
                    </div>
                    {meeting.meetingStatus === "Cancelled" ? (
                      <></>
                    ) : (
                      <img
                        src="/svgs/Phone.svg"
                        alt=""
                        className="right-[10px] absolute cursor-pointer"
                        onClick={() => setViewContact(true)}
                      />
                    )}
                  </div>
                  <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 italic pb-2">
                    {meeting?.mettingMessage.split("").length > 130 ? (
                      <>
                        {meeting?.mettingMessage.slice(0, 130)}
                        ...
                      </>
                    ) : (
                      <> {meeting?.mettingMessage.slice(0, 130)}</>
                    )}
                  </div>
                  <span className="text-[#727374] text-[12px] font-[500] flex ">
                    {meeting.meetingDate} | {meeting.meetingTime}
                  </span>
                  <span className="text-[#727374] text-[12px] font-[500] flex my-3">
                    <img
                      src="/svgs/Location.svg"
                      alt="location"
                      className="h-[18px] w-[18px] mx-[5px] ml-[-3px] "
                    />
                    Cubic #5, Networking Dorm
                  </span>
                  {meeting.meetingStatus === "Cancelled" ? (
                    <>
                      <div className="text-[#E74C3C] text-[12px] font-[500] italic my-[10px]">
                        The meeting was cancelled.
                      </div>
                      <span
                        className="flex items-center cursor-pointer text-white text-[12px] font-[500] text-[12px] h-[32px] w-[100%] justify-center rounded-[4px] bg-primary md:w-[140px]"
                        onClick={() => setNotes(true)}
                      >
                        Notes
                      </span>
                    </>
                  ) : (
                    <div className="mymd:mt-3 mt-1 flex justify-between">
                      <span
                        className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[500] text-[12px] border h-[32px] w-[30%] justify-center rounded-[4px] md:w-[140px]"
                        onClick={() => cancelScheduledMeeting(meeting)}
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
                  )}
                </div>
              </>
            );
          })
        ) : (
          <div className="grid w-full place-items-center h-[250px]">
            <div>
              <img
                src="/svgs/Meeting_Empty_State.svg"
                alt=""
                className="w-full h-[340px]"
              />
              <p className="text-[15px] font-[500] text-[#717171]  text-center">
                You haven't scheduled any meeting yet.You can be the one to
                break the ice though!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeMeetings;
