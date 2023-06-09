import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import SideMenu from "../../components/eventLayout/SideMenu";
import DemoEventBar from "../../components/eventLayout/DemoEventBar";
import EventLayout from "../../components/eventLayout/EventLayout";
import { useMatch } from "react-router-dom";
import RegForm from "../../components/eventLayout/settings/RegForm/RegForm";
import LinkedinAutoPost from "../../components/eventLayout/communications/marketing/LinkedinAutoPost";
import EmailMarketing from "../../components/eventLayout/communications/emailMarketing/EmailMarketing";

const EventHomeLayout = () => {
  const formBuilder = useMatch("/events/:eventId/settings/formbuilder");
  const LinkedinPost = useMatch(
    "/events/:eventId/communications/linkedin-marketing"
  );
  const emailMarketing = useMatch(
    "/events/:eventId/communications/eventMarketing"
  );

  const singleEvent = useSelector((state) => state.eventData);
  return (
    <div className="flex flex-col">
      {singleEvent.isMockEvent && (
        <div className="header h-10 w-full">
          <DemoEventBar />
        </div>
      )}
      <div className="header h-[58px] w-full">
        <Navbar />
      </div>
      <div className="w-full flex justify-center items-center flex-col ">
        <div className="w-full xl:w-[1440px] overflow-x-hidden">
          <div
            className={`grid grid-cols-[228px_1fr] ${
              singleEvent.isMockEvent
                ? "h-[calc(100vh_-_98px)]"
                : " h-[calc(100vh_-_58px)]"
            }  `}
          >
            {/* <div className="sidebar md:w-[228px]"> */}
            <div className="sidebar md:w-[228px]">
              <SideMenu
                eventTitle={singleEvent?.title}
                organizer={singleEvent?.organizer?.firstName}
              />
            </div>
            <div
              className={`container ml-[30px] w-full ${
                singleEvent.isMockEvent
                  ? "h-[calc(100vh_-_98px)]"
                  : " h-[calc(100vh_-_58px)]"
              }`}
            >
              {formBuilder ? (
                <RegForm />
              ) : LinkedinPost ? (
                <LinkedinAutoPost />
              ) : emailMarketing ? (
                <EmailMarketing />
              ) : (
                <EventLayout />
              )}

              {/* {props.children} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHomeLayout;
