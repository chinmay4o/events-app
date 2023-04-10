import React from "react";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import Home from "../../svg/Home";
import Speakers from "../../svg/Speakers";
import Sponsors from "../../svg/Sponsors";
import Form from "../../svg/Form";
import Schedule from "../../svg/Schedule";
import Clipboard from "../../svg/Clipboard";
import People from "../../svg/People";
import Meetings from "../../svg/Meetings";

function AttendeeSideMenu({ singleEvent }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navbarContent = [
    {
      name: "About",
      imageUrl: (
        <Clipboard
          color={searchParams.get("tab") === "about" ? "#A55EEA" : ""}
        />
      ),
      pathName: "about",
      comingSoon: false,
    },

    {
      name: "Schedule",
      imageUrl: (
        <Schedule
          color={searchParams.get("tab") === "schedule" ? "#A55EEA" : ""}
        />
      ),
      pathName: "schedule",
      comingSoon: false,
    },
    {
      name: "Speakers",
      imageUrl: (
        <Speakers
          color={searchParams.get("tab") === "speakers" ? "#A55EEA" : ""}
        />
      ),
      pathName: "speakers",
      comingSoon: false,
    },
    {
      name: "Networking",
      imageUrl: (
        <People color={searchParams.get("tab") === "people" ? "#A55EEA" : ""} />
      ),
      pathName: "people",
      comingSoon: false,
    },
    {
      name: "Meetings",
      imageUrl: (
        <Meetings
          color={searchParams.get("tab") === "meetings" ? "#A55EEA" : ""}
        />
      ),
      pathName: "meetings",
      comingSoon: false,
    },
  ];
  return (
    <aside
      className={`hidden md:block w-[17%] fixed h-screen border-r border-[#C5C5C766] border-opacity-40 rounded bg-white aria-label=Sidebar md:h-[100%] overflow-y-scroll overflow-x-hidden scrollbar-hide md:pb-7`}
    >
      <div className="bg-white mt-[60px]">
        <div className="">
          <p
            className="text-[18px] font-[600] relative left-[25px] top-[25px] break-normal w-[140px] hover:underline cursor-pointer relative"
            onClick={() =>
              window.open(
                `${window.location.origin}/event/${singleEvent._id}`,
                "_blank"
              )
            }
          >
            {singleEvent?.title
              ? singleEvent?.title.charAt(0).toUpperCase() +
                singleEvent?.title.slice(1, singleEvent?.title.length)
              : null}
          </p>
          <i
            className="fa-solid fa-up-right-from-square absolute right-[43px] mt-1 cursor-pointer text-primary ml-2"
            onClick={() =>
              window.open(
                `${window.location.origin}/event/${singleEvent._id}`,
                "_blank"
              )
            }
          ></i>

          <i
            className="fa-regular fa-copy absolute right-[13px] mt-1 cursor-pointer text-primary "
            onClick={() =>
              navigator.clipboard.writeText(
                `${window.location.origin}/event/${singleEvent._id}`
              )
            }
          ></i>
        </div>

        <p className="text-[10px] font-[500] relative left-[27px] top-[25px] text-gray-400">
          By {singleEvent?.organizer ? singleEvent?.organizer.firstName : null}
        </p>

        {/* <p className="">{}</p> */}
        <ul className="pt-10">
          {navbarContent &&
            navbarContent.length > 0 &&
            navbarContent.map((navbar, index) => (
              <li key={index} className="relative">
                <a
                  onClick={() => {
                    navigate(
                      `/attendee/${singleEvent?._id}?tab=${navbar.pathName}`
                    );
                  }}
                  className={`flex cursor-pointer text-[#9a9a9a] items-center pl-5 py-3.5 text-[11px] font-[500] border-b border-[#C5C5C766] border-opacity-40 ${
                    searchParams.get("tab") === navbar.pathName
                      ? "text-primary"
                      : ""
                  }`}
                >
                  <>{navbar?.imageUrl}</>
                  <span
                    className={`pl-[7px] pt-[2px] font-[600] ${
                      searchParams.get("tab") === navbar.pathName
                        ? "text-primary"
                        : ""
                    }`}
                  >
                    {navbar.name}
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}

export default AttendeeSideMenu;
