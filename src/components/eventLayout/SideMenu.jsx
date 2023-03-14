import React from "react";
import { useSelector } from "react-redux";
import {
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Home from "../../svg/Home";
import Speakers from "../../svg/Speakers";
import Sponsors from "../../svg/Sponsors";
import Form from "../../svg/Form";
import Schedule from "../../svg/Schedule";
import Communication from "../../svg/Communication";
import CheckIn from "../../svg/CheckIn";
function SideMenu({ eventTitle, organizer }) {
  const singleEvent = useSelector((state) => state.eventData);

  const [searchParams] = useSearchParams();
  // const { eventId } = useParams();
  const eventsId = useMatch("events/:eventId/*");
  const navigate = useNavigate();
  const navbarContent = [
    {
      name: "Event Info",
      imageUrl: (
        <Home
          color={searchParams.get("show") === "eventInfo" ? "#A55EEA" : ""}
        />
      ),
      pathName: "eventInfo",
      comingSoon: false,
    },
    {
      name: "Speakers",
      imageUrl: <Speakers color={"#A55EEA"} />,
      pathName: "speakers",
      comingSoon: false,
    },
    {
      name: "Schedule",
      imageUrl: <Schedule color={"#A55EEA"} />,
      pathName: "schedule",
      comingSoon: false,
    },
    {
      name: "Sponsors",
      imageUrl: <Sponsors color={"#A55EEA"} />,
      pathName: "sponsors",
      comingSoon: false,
    },
    {
      name: "Registrations",
      imageUrl: <Form color={"#A55EEA"} />,
      pathName: "registrations",
      comingSoon: false,
    },
    {
      name: "Analytics",
      imageUrl: <Form color={"#A55EEA"} />,
      pathName: "analytics",
      comingSoon: false,
    },
    {
      name: "Communications",
      imageUrl: <Communication color={"#A55EEA"} />,
      pathName: "communications",
      comingSoon: true,
    },
    // {
    //   name: "Team",
    //   imageUrl: <People color={"#A55EEA"} />,
    //   pathName: "team",
    //   comingSoon: false,
    // },
    {
      name: "Settings",
      imageUrl: <Sponsors color={"#A55EEA"} />,
      pathName: "settings",
      comingSoon: true,
    },
  ];
  // ${
  //     singleEvent.isMockEvent ? "h-[calc(100vh_-_98px)]" : " h-[calc(100vh_-_58px)]"
  // }
  return (
    <aside
      className={`hidden md:block w-[228px] fixed h-screen border-r border-[#C5C5C766] border-opacity-40 rounded bg-white aria-label=Sidebar md:h-[90%] overflow-y-scroll overflow-x-hidden scrollbar-hide md:pb-7`}
    >
      <div className="bg-white">
        {/* <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="w-[90%] block mx-auto relative top-[20px] text-[#171717] font-[600] text-[14px] hover:bg-[#e9e9e9] focus:outline-none rounded-lg text-sm px-4 py-2 text-center flex items-center"
          type="button"
        >
         {eventTitle}
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button> */}
        <div>
          <p
            className="text-[18px] font-[600] relative left-[25px] top-[25px] break-normal w-[200px] hover:underline cursor-pointer relative  "
            onClick={() =>
              window.open(
                `${window.location.origin}/event/${eventsId.params.eventId}`,
                "_blank"
              )
            }
          >
            {eventTitle
              ? eventTitle.charAt(0).toUpperCase() +
                eventTitle.slice(1, eventTitle.length)
              : null}
          </p>
          <i
            className="fa-solid fa-up-right-from-square absolute right-[50px] mt-1.5 cursor-pointer text-primary"
            onClick={() =>
              window.open(
                `${window.location.origin}/event/${eventsId.params.eventId}`,
                "_blank"
              )
            }
          ></i>

          <i
            className="fa-regular fa-copy absolute right-[15px] mt-1.5 cursor-pointer text-primary "
            onClick={() =>
              navigator.clipboard.writeText(
                `${window.location.origin}/event/${singleEvent._id}`
              )
            }
          ></i>
        </div>

        <p className="text-[10px] font-[500] relative left-[27px] top-[25px] text-gray-400">
          By {organizer ? organizer : null}
        </p>

        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="font-[600] text-[13px] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                MakerMea
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-[600] text-[13px] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Riidl
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-[600] text-[13px] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dubai Expo
              </a>
            </li>
          </ul>
        </div>

        {/* <p className="">{}</p> */}
        <ul className="pt-10">
          {navbarContent &&
            navbarContent.length > 0 &&
            navbarContent.map((navbar, index) => (
              <li key={index} className="relative">
                <a
                  onClick={() => {
                    navigate(
                      `/events/${eventsId.params.eventId}?show=${navbar.pathName}`
                    );
                  }}
                  className={`flex cursor-pointer text-[#9a9a9a] items-center pl-5 py-3.5 text-[11px] font-[500] border-b border-[#C5C5C766] border-opacity-40 ${
                    searchParams.get("show") === navbar.pathName
                      ? "text-primary"
                      : ""
                  }`}
                >
                  <>{navbar?.imageUrl}</>
                  <span
                    className={`pl-[7px] pt-[2px] font-[600] ${
                      searchParams.get("show") === navbar.pathName
                        ? "text-primary"
                        : ""
                    }`}
                  >
                    {navbar.name}
                  </span>
                  {navbar.comingSoon ? (
                    <span className="absolute bottom-[4px] right-[0px] bg-blue-100 text-blue-800 text-[7px] font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      coming soon
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          <li key={"checkIn"}>
            <a
              onClick={() => {
                window.open(
                  `${window.location.origin}/events/${eventsId.params.eventId}/registrations?tab=ViewAll`,
                  "_blank"
                );
              }}
              className={`flex cursor-pointer text-[#9a9a9a] items-center pl-5 py-3.5 text-[11px] font-[500] border-b border-[#C5C5C766] border-opacity-40 ${
                // searchParams.get("show") === navbar.pathName ? "text-primary" : ""
                ""
              }`}
            >
              {/* <img
                  src={navbar.imageUrl}
                  alt={navbar.name}
                  className="h-6 w-6 text-primary"
                /> */}
              <CheckIn />
              <span
                className={`pl-[7px]  font-[600] ${
                  //   searchParams.get("show") === navbar.pathName ? "text-primary" : ""
                  ""
                }`}
              >
                Check In
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideMenu;
