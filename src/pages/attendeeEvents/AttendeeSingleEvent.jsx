import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useSearchParams } from "react-router-dom";
import AttendeeAbout from "../../components/attendeeEvent/AttendeeAbout";
import AttendeeAttendees from "../../components/attendeeEvent/AttendeeAttendees";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";
import AttendeeMeetings from "../../components/attendeeEvent/AttendeeMeetings";
import AttendeeSchedule from "../../components/attendeeEvent/AttendeeSchedule";
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
          <AttendeeAbout singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "speakers":
      return (
        <>
          <AttendeeSpeakers singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "schedule":
      return (
        <>
          <AttendeeSchedule singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "attendees":
      return (
        <>
          <AttendeeAttendees singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    case "meetings":
      return (
        <>
          <AttendeeMeetings singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
    default:
      return (
        <>
          <AttendeeAbout singleEvent={singleEvent} />
          <AttendeeBottomBar />
        </>
      );
  }
}

export default AttendeeSingleEvent;
