import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../redux/actions/userActions";
import { getRequest } from "../../utils/API/api.ts";
import AttendeesReceived from "./AttendeesReceived";
import AttendeesSent from "./AttendeesSent";
import BookMeeting from "./BookMeeting";
import { cancelMeeting } from "../../redux/actions/meetingActions";

import { getAuthenticatedRequest } from "../../utils/API/api.ts";
const Attendees = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("suggested");
  const [attendeesData, setAttendeesData] = useState([]);
  const [trigger, settrigger] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [isCancelled, setisCancelled] = useState(false);
  const [singleAttendee, setsingleAttendee] = useState([]);
  const dispatch = useDispatch();
  const event = useSelector((state) => state.eventData);
  const userDetails = useSelector((state) => state.userDetails);
  const [sentMeetings, setSentMeetings] = useState([]);
  const [receivedMeetings, setreceivedMeetings] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState([]);
  const cancelledMeeting = useSelector((state) => state.cancelledMeeting);
  console.log(cancelledMeeting);
  const { savedUserConfig } = userDetails;

  useEffect(() => {
    if (cancelledMeeting.error) {
      alert("Please Cancel again!! Some error occurred");
    }
  }, [cancelledMeeting]);

  useEffect(() => {
    if (event?._id && event?.title) {
      getAllEventAttendees(`/attendee/${event?._id}`);
    }
  }, [event, event?.title]);

  const getAllEventAttendees = async (route) => {
    const response = await getRequest(route);
    setAttendeesData(response.data.attendees);
  };

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(getUserDetails({ accessToken: accessToken }));
  }, [savedUserConfig?._id]);

  useEffect(() => {
    async function fetch() {
      const meetingDetails = await getAuthenticatedRequest(
        "/user/meeting-details"
      );
      setSentMeetings(meetingDetails?.data.user.meetingRequestSent);
      setreceivedMeetings(meetingDetails?.data.user.meetingRequestReceived);
    }
    fetch();
  }, [meetingDetails]);

  const deleteMeeting = async (meetingData, singleAttendee) => {
    console.log(meetingData);
    const cancelMeetings = sentMeetings.filter((meeting) => {
      return meeting.meetingID !== meetingData.meetingID;
    });
    setSentMeetings(cancelMeetings);
    dispatch(cancelMeeting({ meetingID: meetingData.meetingID }));
    setsingleAttendee(singleAttendee);
    setMeetingDetails(meetingData);
    setisCancelled(true);
    settrigger(true);
    setIsEdit(false);
    setIsReschedule(false);
  };
  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[59px] z-10">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/events")}
        />
        <span className="ml-2 text-[22px] font-[500]">Attendees</span>
      </div>
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
          event={event}
          singleAttendee={singleAttendee}
          setMeetingDetails={setMeetingDetails}
          meetingDetails={meetingDetails}
          deleteMeeting={deleteMeeting}
        />
      )}
      <div className="mx-[16px] mt-[60px] pb-[70px]">
        <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-between items-center">
          <div
            onClick={() => setActiveTab("suggested")}
            className={`grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
              activeTab === "suggested" ? "primary" : "[#F4F6F9]"
            } p-2 rounded-[17px] text-${
              activeTab === "suggested" ? "white" : "[#F4F6F9]"
            }`}
          >
            Suggested
          </div>
          <div
            onClick={() => setActiveTab("allAttendees")}
            className={`grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
              activeTab === "allAttendees" ? "primary" : "[#F4F6F9]"
            } p-2 rounded-[17px] text-${
              activeTab === "allAttendees" ? "white" : "[#F4F6F9]"
            }`}
          >
            All Attendees
          </div>
          <div
            onClick={() => setActiveTab("received")}
            className={`grid place-items-center whitespace-nowrap w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] bg-${
              activeTab === "received" ? "primary" : "[#F4F6F9]"
            } p-2 rounded-[17px] text-${
              activeTab === "received" ? "white" : "[#F4F6F9]"
            }`}
          >
            Received ({receivedMeetings?.length})
          </div>

          <div
            onClick={() => setActiveTab("sent")}
            className={`grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
              activeTab === "sent" ? "primary" : "[#F4F6F9]"
            } p-2 rounded-[17px] text-${
              activeTab === "sent" ? "white" : "[#F4F6F9]"
            }`}
          >
            Sent ({sentMeetings?.length})
          </div>
        </div>
        {activeTab === "suggested" || activeTab === "allAttendees" ? (
          attendeesData?.length > 0 ? (
            attendeesData?.map((attendee, key) => (
              <>
                <div
                  key={key}
                  className="bg-[#FFFFFF] mb-4 h-[130px] rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[220px] mt-[10px]"
                >
                  <div className="flex items-center">
                    {attendee.profilePicture ? (
                      <img
                        src={attendee.profilePicture}
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
                        {attendee.firstName.slice(0, 1)}
                        {attendee.lastName.slice(0, 1)}
                      </div>
                    )}

                    <div className="">
                      <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] md:font-semibold">
                        {attendee.firstName} {attendee.lastName}
                      </div>
                      <div className="text-[12px] font-medium py-[0px] text-gray-500">
                        {attendee.jobTitle}, {attendee.organization}
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 min-h-[80px] hidden">
                  {attendee.eventSpecificData[0].bio.split("").length > 150 ? (
                    <>
                      {attendee.speaker.eventSpecificData[0].bio.slice(0, 130)}
                      ...
                    </>
                  ) : (
                    <>
                      {" "}
                      {attendee.speaker.eventSpecificData[0].bio.slice(0, 150)}
                    </>
                  )}
                </div> */}
                  <span
                    className="flex items-center cursor-pointer text-white text-[12px] font-[500] h-[32px] w-[100%] justify-center rounded-[4px] bg-primary md:w-[140px] mt-[25px]"
                    onClick={() => {
                      setsingleAttendee(attendee);
                      settrigger(true);
                    }}
                  >
                    Book a meeting
                  </span>
                </div>
              </>
            ))
          ) : (
            <div className="grid w-full place-items-center h-[250px]">
              <div>
                <img
                  src="/svgs/nullState.svg"
                  alt=""
                  className="w-[200px] h-[200px]"
                />
                <p className="text-[15px] font-[500] text-[#717171]  text-center">
                  Nothing here...
                </p>
              </div>
            </div>
          )
        ) : activeTab === "received" ? (
          <AttendeesReceived
            settrigger={settrigger}
            isReschedule={isReschedule}
            setIsReschedule={setIsReschedule}
            receivedMeetings={receivedMeetings}
            deleteMeeting={deleteMeeting}
            savedUserConfig={savedUserConfig}
            setreceivedMeetings={setreceivedMeetings}
          />
        ) : activeTab === "sent" ? (
          <AttendeesSent
            settrigger={settrigger}
            setIsEdit={setIsEdit}
            sentMeetings={sentMeetings}
            deleteMeeting={deleteMeeting}
            setsingleAttendee={setsingleAttendee}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Attendees;
