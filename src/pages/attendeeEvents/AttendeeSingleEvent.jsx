import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useSearchParams } from "react-router-dom";
import AttendeeAbout from "../../components/attendeeEvent/AttendeeAbout";
import AttendeeAttendees from "../../components/attendeeEvent/AttendeeAttendees";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";
import AttendeeMeetings from "../../components/attendeeEvent/AttendeeMeetings";
import AttendeeSchedule from "../../components/attendeeEvent/AttendeeSchedule";
import AttendeeSideMenu from "../../components/attendeeEvent/AttendeeSideMenu";
import AttendeeSpeakers from "../../components/attendeeEvent/AttendeeSpeakers";
import { getSingleEvent } from "../../redux/actions/eventActions";

function AttendeeSingleEvent() {
  const [searchParams] = useSearchParams();
  const eventsId = useMatch("attendee/:eventId/*");
  const dispatch = useDispatch();
  const singleEvent = useSelector((state) => state.eventData);
  useEffect(() => {
    dispatch(getSingleEvent({ eventId: eventsId.params.eventId }));
    return () => {};
  }, []);
  console.log(singleEvent);
  switch (searchParams.get("tab")) {
    case "about":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeAbout singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "speakers":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeSpeakers singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "schedule":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeSchedule singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "attendees":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeAttendees singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "meetings":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeMeetings singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    default:
      return (
        <>
          <AttendeeSideMenu />
          <AttendeeAbout singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
  }
}

export default AttendeeSingleEvent;
