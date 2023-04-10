import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../redux/actions/userActions";
import AttendeesReceived from "./AttendeesReceived";
import AttendeesSent from "./AttendeesSent";
import BookMeeting from "./BookMeeting";
import { cancelMeeting } from "../../redux/actions/meetingActions";
import { getAuthenticatedRequest } from "../../utils/API/api.ts";
import AllAttendees from "./AllAttendees";
import SuggestedAttendees from "./SuggestedAttendees";
const Attendees = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("suggested");
  const [trigger, settrigger] = useState(false);
  const [isCancelled, setisCancelled] = useState(false);
  const [singleAttendee, setsingleAttendee] = useState([]);
  const dispatch = useDispatch();
  const event = useSelector((state) => state.eventData);
  const userDetails = useSelector((state) => state.userDetails);
  const [sentMeetings, setSentMeetings] = useState([]);
  const [receivedMeetings, setReceivedMeetings] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [scheduledMeeting, setScheduledMeeting] = useState([]);
  const cancelledMeeting = useSelector((state) => state.cancelledMeeting);
  const { savedUserConfig } = userDetails;

  useEffect(() => {
    if (cancelledMeeting.error) {
      alert("Please Cancel again!! Some error occurred");
    }
  }, [cancelledMeeting]);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(getUserDetails({ accessToken: accessToken }));
  }, [savedUserConfig?._id]);

  useEffect(() => {
    async function fetch() {
      const meetingDetails = await getAuthenticatedRequest(
        "/user/userMeeting-details"
      );
      const { meetingRequestSent, meetingRequestReceived, scheduledMeetings } =
        meetingDetails?.data?.user;
      console.log(meetingDetails);
      const filteredSentMeetings = meetingRequestSent.filter(
        (meeting) => meeting.eventId === event?._id
      );
      const filteredReceivedMeetings = meetingRequestReceived.filter(
        (meeting) => meeting.eventId === event?._id
      );

      const filteredscheduledMeetings = scheduledMeetings.filter(
        (meeting) => meeting.eventId === event?._id
      );

      setScheduledMeeting(filteredscheduledMeetings);
      setSentMeetings(filteredSentMeetings);
      setReceivedMeetings(filteredReceivedMeetings);
    }
    fetch();
  }, [meetingDetails, event]);

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
  };

  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white md:min-h-full">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[59px] z-10 md:hidden">
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
          isCancelled={isCancelled}
          setisCancelled={setisCancelled}
          event={event}
          singleAttendee={singleAttendee}
          setMeetingDetails={setMeetingDetails}
          meetingDetails={meetingDetails}
          deleteMeeting={deleteMeeting}
          receivedMeetings={receivedMeetings}
          sentMeetings={sentMeetings}
        />
      )}
      <div className="mt-[60px] pb-[70px] md:mt-[70px]">
        <div className="mx-[16px] ">
          <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-between items-center md:w-[55%]">
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
        </div>
        {activeTab === "allAttendees" ? (
          <AllAttendees
            event={event}
            settrigger={settrigger}
            setsingleAttendee={setsingleAttendee}
            savedUserConfig={savedUserConfig}
            scheduledMeeting={scheduledMeeting}
            receivedMeetings={receivedMeetings}
            sentMeetings={sentMeetings}
          />
        ) : activeTab === "suggested" ? (
          <SuggestedAttendees
            event={event}
            settrigger={settrigger}
            setsingleAttendee={setsingleAttendee}
            savedUserConfig={savedUserConfig}
            scheduledMeeting={scheduledMeeting}
            receivedMeetings={receivedMeetings}
            sentMeetings={sentMeetings}
          />
        ) : activeTab === "received" ? (
          <AttendeesReceived
            receivedMeetings={receivedMeetings}
            sentMeetings={sentMeetings}
            deleteMeeting={deleteMeeting}
            setReceivedMeetings={setReceivedMeetings}
            event={event}
          />
        ) : activeTab === "sent" ? (
          <AttendeesSent
            sentMeetings={sentMeetings}
            receivedMeetings={receivedMeetings}
            deleteMeeting={deleteMeeting}
            setSentMeetings={setSentMeetings}
            event={event}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Attendees;
