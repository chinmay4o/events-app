import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useSearchParams } from "react-router-dom";
import AttendeeAbout from "../../components/attendeeEvent/AttendeeAbout";
import AttendeeAttendees from "../../components/attendeeEvent/AttendeeAttendees";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";
import AttendeeMeetings from "../../components/attendeeEvent/attendeeMeetings/AttendeeMeetings";
import AttendeeSchedule from "../../components/attendeeEvent/AttendeeSchedule";
import AttendeeSideMenu from "../../components/attendeeEvent/AttendeeSideMenu";
import AttendeeSpeakers from "../../components/attendeeEvent/AttendeeSpeakers";
import Attendees from "../../components/people/Attendees";
import { getSingleEvent } from "../../redux/actions/eventActions";
import People from "../people/People";

function AttendeeSingleEvent() {
  const [searchParams] = useSearchParams();
  const eventsId = useMatch("/attendee/:eventId/*");
  const event = useSelector((state) => state.eventData);
  console.log(event);
  // const peopleId = useMatch("/people/:eventId");
  // console.log(peopleId);
  // let id = eventsId.params.eventId
  //   ? eventsId.params.eventId
  //   : peopleId.params.eventId;
  // console.log(id);
  // const dispatch = useDispatch();
  // const singleEvent = useSelector((state) => state.eventData);
  // useEffect(() => {
  //   dispatch(getSingleEvent({ eventId: eventsId.params.eventId }));
  //   return () => {};
  // }, []);
  // console.log(singleEvent);
  switch (searchParams.get("tab")) {
    case "about":
      return (
        <>
          <AttendeeSideMenu singleEvent={event} />
          <AttendeeAbout singleEvent={event} />
          <AttendeeBottomBar singleEvent={event} />
        </>
      );
    case "speakers":
      return (
        <>
          <AttendeeSideMenu singleEvent={event} />
          <AttendeeSpeakers singleEvent={event} />
          <AttendeeBottomBar singleEvent={event} />
        </>
      );
    case "schedule":
      return (
        <>
          <AttendeeSideMenu singleEvent={event} />
          <AttendeeSchedule singleEvent={event} />
          <AttendeeBottomBar singleEvent={event} />
        </>
      );
    case "attendees":
      return (
        <>
          <AttendeeSideMenu singleEvent={event} />
          <People singleEvent={event} />
          <AttendeeBottomBar singleEvent={event} />
        </>
      );
    case "meetings":
      return (
        <>
          <AttendeeSideMenu singleEvent={event} />
          <AttendeeMeetings singleEvent={event} />
          <AttendeeBottomBar singleEvent={event} />
        </>
      );
    default:
      return (
        <>
          <AttendeeSideMenu singleEvent={event} />
          <AttendeeAbout singleEvent={event} />
          <AttendeeBottomBar singleEvent={event} />
        </>
      );
  }
}

export default AttendeeSingleEvent;
