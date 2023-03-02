import { useEffect, useState } from "react";
import { useMatch, useSearchParams } from "react-router-dom";
import { getRequest } from "../../utils/API/api.ts";
import Badge from "./Badge";
import Schedule from "./Schedule";
import SpeakersTab from "./Speakers";
import SponsorsTab from "./Sponsors";

const UserEvents = () => {
  const [showUserEvent, setShowUserEvent] = useState(false);
  const [showComponent, setShowComponent] = useState("badge");
  const [event, setEvent] = useState({});
  const [searchParams] = useSearchParams();
  useEffect(() => {
    async function fetchData() {
      const data = await getRequest(`/event/${searchParams.get("eventId")}`);
      setEvent(data.data.savedEventConfig);
    }
    if (searchParams.get("eventId")) {
      fetchData();
    }
  }, [searchParams]);

  console.log(showUserEvent, "showUserEvent");
  return (
    <div className="mx-auto w-full px-[16px] md:hidden">
      <div className="w-full mt-[15px]">
        <div
          className="flex justify-between cursor-pointer items-center"
          onClick={() => setShowUserEvent(!showUserEvent)}
        >
          <span className="font-[600] text-[20px]">{event.title}</span>
          {showUserEvent ? (
            <img src="/svgs/arrow.svg" className="rotate-90" alt="UpArrow" />
          ) : (
            // <img src="/svgs/bottom.svg" className="rotate-90" alt="UpArrow" />
            <i className="fa-solid fa-chevron-down text-gray-400 text-[20px] relative right-[10px]"></i>
          )}
        </div>
        {showUserEvent && (
          <div className="w-full">
            <div className="flex flex-col">
              {/* <span className="font-normal text-sm text-[#1C1C1E] text-opacity-60 mt-2.5">
                By Chinmay, Crystal Innovations
              </span> */}
              {/* <div className="flex mt-5 gap-x-2 items-center">
                {tags.map((tag) => (
                  <span className="w-[85px] py-1 text-center text-[11px] font-semibold bg-[#F4F6F9] h-6 rounded-[11px]">
                    {tag}
                  </span>
                ))}
              </div> */}
              <img
                src={
                  event.coverImage ? `${event.coverImage}` : "/svgs/events.svg"
                }
                alt="event Image"
                className="w-full h-[157px] rounded-[10px] mt-5 object-cover"
              />
              <p className="text-sm mt-5 text-[#1C1C1E] text-opacity-60 whitespace-pre-wrap">
                {event.shortDescription}
              </p>
              <div className="mt-5 w-full">
                <hr />
              </div>
              <img
                src="/svgs/Address.svg"
                alt="Address"
                className="w-full h-[128px] rounded-[10px] mt-5"
              />
              <div className="mt-5 text-[14px] text-[#1C1C1E] text-opacity-60">
                <span className="font-[600] text-[13px] text-black text-opacity-60">
                  Address:{" "}
                </span>
                {event.location?.addressLine1}, {event.location?.addressLine2},{" "}
                {event.location?.state}, {event.location?.pincode},{" "}
                {event.location?.city}
              </div>
            </div>
          </div>
        )}

        <div className="text-[13px] w-full mt-[14px] font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex w-full">
            <li className="mr-2" onClick={() => setShowComponent("badge")}>
              <a
                className={`inline-block px-2 py-[10px] rounded-t-lg border-b-2 ${
                  showComponent === "badge"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600"
                }`}
              >
                Badge
              </a>
            </li>
            <li className="mr-2" onClick={() => setShowComponent("speakers")}>
              <a
                className={`inline-block px-2 py-[10px] rounded-t-lg border-b-2 ${
                  showComponent === "speakers"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600"
                }`}
              >
                Speakers
              </a>
            </li>
            <li className="mr-2" onClick={() => setShowComponent("schedule")}>
              <a
                className={`inline-block px-2 py-[10px] rounded-t-lg border-b-2 ${
                  showComponent === "schedule"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600"
                }`}
                aria-current="page"
              >
                Schedule
              </a>
            </li>
            <li className="mr-2" onClick={() => setShowComponent("sponsors")}>
              <a
                className={`inline-block px-2 py-[10px] rounded-t-lg border-b-2 ${
                  showComponent === "sponsors"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600"
                }`}
              >
                Exhibitors
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full pb-14">
          {showComponent === "badge" && <Badge />}
          {showComponent === "speakers" && (
            <SpeakersTab speakers={event?.speakers} />
          )}
          {showComponent === "schedule" && (
            <Schedule schedule={event?.schedule} singleEvent={event} />
          )}
          {showComponent === "sponsors" && (
            <SponsorsTab exhibitors={event.exhibitorAndSponsors} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEvents;
