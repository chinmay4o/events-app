import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENT_CREATE_DESTROY } from "../../../redux/constants/eventConstants";
import EditEvent from "./EditEvent";
import SpeakersTab from "../../home/Speakers";
import Schedule from "../../home/Schedule";
import SponsorsTab from "../../home/Sponsors";
import Badge from "../../home/Badge";
import moment from "moment";

function EventHome() {
  const dispatch = useDispatch();
  // console.log(window.location, "window.location");
  const singleEvent = useSelector((state) => state.eventData);
  // const { loading, error, singleEvent } = singleEventConfig;
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showComponent, setShowComponent] = useState("speakers");
  const [readMore, setReadMore] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [showEventContent, setShowEventContent] = useState(true);

  useEffect(() => {
    dispatch({
      type: EVENT_CREATE_DESTROY,
    });
    if (window.innerWidth) setisMobile(window.innerWidth <= 768);
  }, []);
  return (
    <div className="w-full md:w-[422px] md:ml-[30px] md:mt-[25px]">
      <div className="py-0 pb-[25px]">
        <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] md:w-[314px] font-[600]">
            {singleEvent.title}
          </span>
          <div className="flex gap-x-2.5">
            <img
              src="/svgs/Edit.svg"
              alt="edit"
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            />
            {isMobile ? (
              showEventContent ? (
                <img
                  src="/svgs/arrow.svg"
                  className="rotate-90 cursor-pointer"
                  alt="UpArrow"
                  onClick={() => setShowEventContent(!showEventContent)}
                />
              ) : (
                <img
                  src="/svgs/bottom.svg"
                  className="rotate-90 cursor-pointer"
                  alt="UpArrow"
                  onClick={() => setShowEventContent(!showEventContent)}
                />
              )
            ) : (
              <img
                src="/svgs/Settings.svg"
                alt="Settings"
                className="w-6 h-6 cursor-pointer"
              />
            )}
          </div>
        </div>
        {showEventContent ? (
          <>
            <div className="w-[335px] md:w-[422px] mx-auto md:mx-0 pt-0 font-normal text-[14px] text-[#4F4F4F] flex items-center">
              <a
                onClick={() =>
                  window.open(
                    `${window.location.origin}/event/${singleEvent._id}`,
                    "_blank"
                  )
                }
                className="cursor-pointer w-[120px] h-[30px] bg-gray-200 py-[6px] px-[8px] rounded-[10px] text-[12px] font-[600] text-[#000] tracking-wide text-center"
              >
                Event Page <i className="fa-solid fa-up-right-from-square"></i>
              </a>
              <a
                className="text-[15px] font-[600] text-primary p-3 cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/event/${singleEvent._id}`
                  )
                }
              >
                <i className="fa-regular fa-copy"></i>
              </a>
            </div>
            <div className="w-[335px] md:w-[422px] mx-auto md:mx-0 flex my-2 flex-wrap">
              {singleEvent.eventTag?.length > 0 ? (
                <>
                  {singleEvent.eventTag.map((tag, index) => {
                    return (
                      <div
                        className="px-1.5 gap-x-[6px] py-1 mr-[10px] mb-3 rounded-full text-black bg-[#F4F6F9] text-[11px] font-semibold flex align-center w-max cursor-pointer "
                        key={index}
                      >
                        <span>{tag}</span>
                        <img src="/Close.svg" alt="close" />
                      </div>
                    );
                  })}
                  <img
                    src="/svgs/Add.svg"
                    alt="close"
                    className="h-6 w-6 rounded-full cursor-pointer bg-[#F4F6F9]"
                  />
                </>
              ) : (
                <>
                  {/* {tags.map((tag, index) => (
                <div
                  className="px-1.5 gap-x-[6px] py-1 mr-[10px] mb-3 rounded-full text-black bg-[#F4F6F9] text-[11px] font-semibold flex align-center w-max cursor-pointer "
                  key={index}
                >
                  <span>{tag}</span>
                  <img src="/svgs/Close.svg" alt="close" />
                </div>
              ))}
              <img
                src="/svgs/Add.svg"
                alt="close"
                className="h-6 w-6 rounded-full cursor-pointer bg-[#F4F6F9]"
              /> */}
                </>
              )}
            </div>
            <div className="w-[335px] md:w-[422px] mx-auto md:mx-0 relative">
              <img
                src={singleEvent.coverImage ?? `/Cross.png`}
                alt="event-pic"
                className="rounded-[10px] w-[335px] md:w-[422px] h-[179px]"
              />
              <div className="w-auto bg-[#F4F6F9] rounded-xl text-black px-3 py-1 font-semibold absolute bottom-[10px] left-[10px] text-[11px]">
                {moment(singleEvent.startDate).format("LLL")}
              </div>
            </div>
            <div className="flex w-[335px] md:w-[422px] mt-5 mx-auto md:mx-0">
              {!isEdit && (
                <>
                  <p className="text-[#1C1C1E] w-[335px] md:w-[422px] text-opacity-60 font-normal text-[13px] whitespace-pre-wrap">
                    {!readMore ? (
                      singleEvent.shortDescription ? (
                        <>
                          {singleEvent.shortDescription.slice(0, 100)}
                          <span
                            className="text-primary font-semibold text-[12px] cursor-pointer"
                            onClick={() => setReadMore(true)}
                          >
                            &nbsp;... Read More
                          </span>
                        </>
                      ) : (
                        <>
                          {singleEvent?.shortDescription?.slice(0, 100)}
                          <span
                            className="text-primary font-semibold text-[12px] cursor-pointer"
                            onClick={() => setReadMore(true)}
                          >
                            &nbsp;...Read More
                          </span>
                        </>
                      )
                    ) : singleEvent.shortDescription ? (
                      <>
                        {singleEvent.shortDescription}
                        <span
                          className="text-primary font-semibold text-[12px] cursor-pointer"
                          onClick={() => setReadMore(false)}
                        >
                          &nbsp;Read Less
                        </span>
                      </>
                    ) : (
                      <>
                        {singleEvent.shortDescription}
                        <span
                          className="text-primary font-semibold text-[12px] cursor-pointer"
                          onClick={() => setReadMore(false)}
                        >
                          &nbsp;Read Less
                        </span>
                      </>
                    )}
                  </p>
                  {/* <img
                src="/svgs/Edit.svg"
                alt="edit"
                className="cursor-pointer"
                //  onClick={() => setIsEdit(true)}
              /> */}
                </>
              )}
            </div>

            <div className="w-0 mt-5  md:block md:w-[422px] mx-auto md:mx-0">
              <hr />
            </div>

            <div className="w-[335px] mt-5  md:block md:w-[422px] mx-auto md:mx-0">
              <img src="/svgs/Address.svg" alt="address" className="mt-5" />
            </div>

            <div className=" md:flex w-[335px] md:w-[422px] my-5 mx-auto md:mx-0 ">
              {!isEdit && (
                <>
                  <p className="text-[#1C1C1E] w-[335px] md:w-[422px] text-opacity-60 font-normal text-[13px]">
                    <span className="font-bold">Address</span>:{" "}
                    {singleEvent.location?.addressLine1},
                    {singleEvent.location?.addressLine2},
                    {singleEvent.location?.state},{" "}
                    {singleEvent.location?.pincode},{" "}
                    {singleEvent.location?.city}
                    <a
                      onClick={() => {
                        window.open(singleEvent.location?.landmark, "_blank");
                      }}
                      className="block text-[12px] text-primary cursor-pointer font-[500]"
                    >
                      Check on Google Maps{" "}
                      <i className="fa-solid fa-up-right-from-square"></i>
                    </a>
                  </p>
                  {/* <img
                src="/svgs/Edit.svg"
                alt="edit"
                className="cursor-pointer"
                //  onClick={() => setIsEdit(true)}
              /> */}
                </>
              )}
            </div>

            <div className="w-[335px] block md:hidden mt-5 mx-auto md:mx-0">
              <hr />
            </div>
          </>
        ) : (
          []
        )}

        <div className="text-sm w-[335px] md:hidden mx-auto font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2" onClick={() => setShowComponent("badge")}>
              <a
                className={`inline-block px-2 py-4 rounded-t-lg border-b-2 ${
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
                className={`inline-block px-2 py-4 rounded-t-lg border-b-2 ${
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
                className={`inline-block px-2 py-4 rounded-t-lg border-b-2 ${
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
                className={`inline-block px-2 py-4 rounded-t-lg border-b-2 ${
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
        <div className="w-[335px] mx-auto md:hidden">
          {showComponent === "badge" && (
            <Badge />
            // <div></div>
          )}
          {showComponent === "speakers" && (
            <SpeakersTab speakers={singleEvent?.speakers} />
          )}
          {showComponent === "schedule" && (
            <Schedule schedule={singleEvent?.schedule} />
          )}
          {showComponent === "sponsors" && (
            <SponsorsTab exhibitors={singleEvent.exhibitorAndSponsors} />
          )}
        </div>
      </div>
      <EditEvent
        open={open}
        setOpen={setOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        singleEvent={singleEvent}
      />
    </div>
    // </div>
  );
}

export default EventHome;
