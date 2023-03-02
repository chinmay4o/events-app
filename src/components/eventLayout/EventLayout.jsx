import { useSearchParams } from "react-router-dom";
import Communications from "./communications/Communications";
import Analytics from "./analytics/Analytics";
import EventHome from "./eventHome/EventHome";
import Registrations from "./registrations/Registrations";
import Speakers from "./speakers/Speakers";
import Sponsors from "./sponsors/Sponsors";
import Settings from "./settings/Settings";
import Schedule from "./schedule/Schedule";

function EventLayout() {
  const [searchParams] = useSearchParams();
  switch (searchParams.get("show")) {
    case "eventHome":
      return <EventHome />;
    case "speakers":
      return <Speakers />;
    case "schedule":
      return <Schedule />;
    case "sponsors":
      return <Sponsors />;
    case "registrations":
      return <Registrations />;
    case "communications":
      return <Communications />;
    case "settings":
      return <Settings />;
    case "analytics":
      return <Analytics />;
    default:
      return <EventHome />;
  }
}

export default EventLayout;
