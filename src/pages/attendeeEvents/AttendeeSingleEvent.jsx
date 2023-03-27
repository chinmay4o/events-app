import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useSearchParams } from "react-router-dom";
import AttendeeAbout from "../../components/attendeeEvent/AttendeeAbout";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";
import AttendeeMeetings from "../../components/attendeeEvent/attendeeMeetings/AttendeeMeetings";
import AttendeeSchedule from "../../components/attendeeEvent/AttendeeSchedule";
import AttendeeSideMenu from "../../components/attendeeEvent/AttendeeSideMenu";
import AttendeeSpeakers from "../../components/attendeeEvent/AttendeeSpeakers";
import Attendees from "../../components/people/Attendees";
import { getSingleEvent } from "../../redux/actions/eventActions";

function AttendeeSingleEvent() {
  const [searchParams] = useSearchParams();
  const eventsId = useMatch("/attendee/:eventId/*");
  const dispatch = useDispatch();
  const singleEvent = useSelector((state) => state.eventData);
  useEffect(() => {
    dispatch(getSingleEvent({ eventId: eventsId.params.eventId }));
    return () => {};
  }, []);
  switch (searchParams.get("tab")) {
    case "about":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeAbout singleEvent={singleEvent} />
          <AttendeeBottomBar singleEvent={singleEvent} />
        </>
      );
    case "speakers":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeSpeakers singleEvent={singleEvent} />
          <AttendeeBottomBar singleEvent={singleEvent} />
        </>
      );
    case "schedule":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeSchedule singleEvent={singleEvent} />
          <AttendeeBottomBar singleEvent={singleEvent} />
        </>
      );
    case "people":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <Attendees singleEvent={singleEvent} />
          <AttendeeBottomBar singleEvent={singleEvent} />
        </>
      );
    case "meetings":
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeMeetings singleEvent={singleEvent} />
          <AttendeeBottomBar singleEvent={singleEvent} />
        </>
      );
    default:
      return (
        <>
          <AttendeeSideMenu singleEvent={singleEvent} />
          <AttendeeAbout singleEvent={singleEvent} />
          <AttendeeBottomBar singleEvent={singleEvent} />
        </>
      );
  }
}

export default AttendeeSingleEvent;
