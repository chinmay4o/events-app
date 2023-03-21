import { useSearchParams } from "react-router-dom";
import AttendeeAbout from "../../components/attendeeEvent/AttendeeAbout";
import AttendeeAttendees from "../../components/attendeeEvent/AttendeeAttendees";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";
import AttendeeMeetings from "../../components/attendeeEvent/AttendeeMeetings";
import AttendeeSchedule from "../../components/attendeeEvent/AttendeeSchedule";
import AttendeeSpeakers from "../../components/attendeeEvent/AttendeeSpeakers";

function AttendeeSingleEvent() {
  const [searchParams] = useSearchParams();
  switch (searchParams.get("tab")) {
    case "about":
      return (
        <>
          <AttendeeAbout />
          <AttendeeBottomBar />
        </>
      );
    case "speakers":
      return (
        <>
          <AttendeeSpeakers />
          <AttendeeBottomBar />
        </>
      );
    case "schedule":
      return (
        <>
          <AttendeeSchedule />
          <AttendeeBottomBar />
        </>
      );
    case "attendees":
      return (
        <>
          <AttendeeAttendees />
          <AttendeeBottomBar />
        </>
      );
    case "meetings":
      return (
        <>
          <AttendeeMeetings />
          <AttendeeBottomBar />
        </>
      );
    default:
      return (
        <>
          <AttendeeAbout />
          <AttendeeBottomBar />
        </>
      );
  }
}

export default AttendeeSingleEvent;
