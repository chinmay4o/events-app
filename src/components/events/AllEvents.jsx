import React, { useEffect, useState } from "react";
import Primarybtn from "../../common/buttons/Primarybtn";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, getUserEvents } from "../../redux/actions/userActions";
import { eventsTab, tags } from "../../helper/constant";
import { EVENT_CREATE_DESTROY } from "../../redux/constants/eventConstants";
import Loader from "../../common/loader/Loader";
import moment from "moment";
import { useNavigate } from "react-router";
import useDebounce from "../../helper/hooks/useDebounce";
import AttendeeProfile from "../attendeeEvent/AttendeeProfile";
import ScanPopup from "../../pages/connections/ScanPopup";

function AllEvents() {
  const navigate = useNavigate();

  let accessToken;

  const dispatch = useDispatch();
  const userEventsData = useSelector((state) => state.userEvents);
  const { error, loading, userEvents } = userEventsData;
  const userLogin = useSelector((state) => state.userLogin);
  const { errorA, loadingA, userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { savedUserConfig } = userDetails;
  const [search, setSearch] = useState("");
  const [mobileSeacrh, setMobileSeacrh] = useState(false);
  const debouncedSearch = useDebounce(search, 700);
  const [eventTab, setEventTab] = useState("My Events");
  const [triggerProfile, settriggerProfile] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [qrscan, setQrscan] = useState(false);

  useEffect(() => {
    let sortedEvents = userEvents;
    sortedEvents = sortedEvents.filter((event) =>
      event.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    console.log(sortedEvents);
    setAllEvents(sortedEvents);
  }, [debouncedSearch]);

  useEffect(() => {
    setAllEvents(userEvents);
  }, [userEvents]);

  useEffect(() => {
    // generateText(prompt);
    let accessToken = localStorage.getItem("accessToken");
    dispatch(getUserDetails({ accessToken: accessToken }));
  }, [savedUserConfig?._id]);

  useEffect(() => {
    accessToken = localStorage.getItem("accessToken");
    // setTimeout(() => {
    if (userInfo?.firstName) {
      dispatch(getUserEvents({ accessToken: userInfo.accessToken }));
    } else if (accessToken) {
      dispatch(getUserEvents({ accessToken }));
    } else {
      alert("Please Login"); //AccessToken not available.
      navigate("/login");
    }
    dispatch({
      type: EVENT_CREATE_DESTROY,
    });
    // }, 2000);
  }, []); //ReRun
  // Run for error in JWT
  // useEffect(() => {
  //   alert("Please Login"); //JWT expired
  //   router.push("/login");
  // }, [error])
  return (
    <div className="w-full flex justify-center">
      {mobileSeacrh ? (
        <form
          className="flex items-center w-full md:hidden fixed top-0 z-30 justify-center h-[60px] bg-[#F5F5F5]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="relative w-[90%] mt-3">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <img src="/svgs/Search.svg" className="h-[19px]" />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-[#F5F5F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 pr-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Search"
              autoComplete="off"
              required={true}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <div
              className="flex absolute inset-y-0 right-0 items-center pr-3  cursor-pointer z-40"
              onClick={() => {
                setMobileSeacrh(false);
                setSearch("");
              }}
            >
              <img src="/svgs/Cross.svg" className="h-[19px] cursor-pointer" />
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full h-[60px] fixed top-0 bg-[#F5F5F5] flex items-center justify-between px-[16px] z-30 md:hidden">
          <div className="flex items-center text-[22px] font-[500]">
            <img
              src="/svgs/logo.svg"
              alt="logo"
              className="w-[30px] mr-[5px]"
            />{" "}
            Warpbay
          </div>
          <div className="flex items-center">
            <img
              src="/svgs/Search.svg"
              className="w-[20px] h-[20px] object-cover cursor-pointer"
              onClick={() => setMobileSeacrh(true)}
            />
            <img
              src="/svgs/Notifications.svg"
              className="w-[19px] h-[19px] object-cover cursor-pointer mx-[20px]"
            />
            {savedUserConfig?.profilePicture ? (
              <img
                src={savedUserConfig?.profilePicture}
                alt=""
                className=" w-[24px] h-[24px] rounded-full cursor-pointer"
                onClick={() => settriggerProfile(true)}
              />
            ) : (
              <div
                onClick={() => settriggerProfile(true)}
                className={` w-[24px] h-[24px] rounded-full bg-${
                  ["red", "green", "blue", "yellow", "indigo"][
                    Math.floor(Math.random() * 5)
                  ]
                }-500 flex items-center justify-center mr-2 text-white text-sm font-medium uppercase cursor-pointer`}
              >
                {savedUserConfig?.firstName.slice(0, 1)}
                {savedUserConfig?.lastName.slice(0, 1)}
              </div>
            )}
          </div>
        </div>
      )}
      {triggerProfile && (
        <AttendeeProfile
          settriggerProfile={settriggerProfile}
          triggerProfile={triggerProfile}
        />
      )}
      {qrscan && <ScanPopup qrscan={qrscan} setQrscan={setQrscan} />}
      <div className="w-full md:w-[750px] md:pb-5 md:mt-7 px-[16px] flex flex-col md:bg-white bg-[#F5F5F5]">
        <span className="text-[#727374] text-[12px] block md:hidden my-[12px]">
          Hello{" "}
          <span className="text-black font-[500] ">
            {savedUserConfig?.firstName},
          </span>{" "}
          here's all your events ...
        </span>
        <div className="hidden md:grid grid-cols-1 justify-items-center md:grid-cols-2 gap-x-12 h-[60px]">
          <form
            className="flex items-center my-4 w-full md:w-[350px] "
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full ">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Search"
                autoComplete="off"
                required={true}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <div className="hidden md:flex  md:items-center md:my-4 w-full md:w-[350px]">
            <Primarybtn
              onClick={() => {
                navigate("/createvent");
              }}
            >
              Create Event
            </Primarybtn>
          </div>
        </div>
        <div className="hidden md:flex md:justify-center md:mt-11 md:gap-x-5">
          {eventsTab.map((event, index) => (
            <>
              <div
                key={index}
                className={`${
                  eventTab === event
                    ? "pb-2.5 border-b-2 border-primary text-primary font-bold cursor-pointer text-[15px]"
                    : "cursor-pointer pb-2.5 border-b-2 text-[15px]"
                }`}
                onClick={() => setEventTab(event)}
              >
                {event}
              </div>
            </>
          ))}
        </div>
        {eventTab === "My Events" ? (
          <div className="grid grid-cols-1 md:px-0 place-content-center justify-items-center md:grid-cols-2 gap-x-[65px] md:gap-y-[30px] gap-y-[14px] mt-1 md:mt-[46px]">
            {allEvents?.length === 0 ? (
              <div className="grid w-full place-items-center h-[350px]">
                <div>
                  <p className="text-[15px] font-[500] text-[#717171] text-center">
                    No Events Found
                  </p>
                  <img
                    src="/svgs/nullState.svg"
                    alt=""
                    className="w-[230px] h-[230px]"
                  />
                </div>
              </div>
            ) : error ? (
              <h3 className="text-[25px] font-[600] text-center text-gray-500">
                Some error occurred...
              </h3>
            ) : loading ? (
              <h3 className="text-[25px] font-[500] md:font-[600] text-center text-gray-500 mt-[50%] md:mt-0">
                Loading...
              </h3>
            ) : (
              allEvents?.map((ele, index) => {
                return (
                  <div
                    className="cursor-pointer bg-white w-full md:md:w-[350px]"
                    onClick={() => {
                      if (
                        ele?.eventRole === "attendee" ||
                        ele?.eventRole === "speaker" ||
                        ele?.eventRole === "exhibitorAndSponsor"
                      ) {
                        navigate(`/attendee/${ele._id}?tab=about`);
                      } else {
                        navigate(`/events/${ele._id}?show=eventInfo`);
                      }
                    }}
                  >
                    <div className="relative">
                      <img
                        src={ele.coverImage}
                        alt={ele.title}
                        className="h-[184px] w-full md:h-[150px] rounded-t-[10px] md:mt-0 md:w-[350px] object-cover shadow border-x-[1px] border-t-[1px] border-[#EDEDED]"
                      />
                      <div className="flex justify-end w-full items-center absolute top-4 font-bold text-[20px] text-white">
                        <div
                          className={`w-[92px] flex justify-center items-center gap-x-[5px] rounded-xl h-6 text-[#fff] text-sm ${
                            ele?.eventRole === "attendee"
                              ? "bg-[#2D9CDB]"
                              : ele?.eventRole === "speaker"
                              ? "bg-[#17c53a]"
                              : "bg-[#F2994A]"
                          } text-center mr-2.5`}
                        >
                          <div>{ele?.eventRole || "organizer"}</div>
                          {ele?.eventRole === "attendee" ||
                          ele?.eventRole === "speaker" ? (
                            ""
                          ) : (
                            <img src="/svgs/grade.svg" alt="Star" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="h-[96px] w-full md:h-[110px] border-x-[1px] border-b-[1px] rounded-b-[10px] shadow md:w-[350px] border-[#EDEDED]">
                      <div className="font-medium md:font-[500] text-[16px] md:text-[20px] pt-[8px] text-[#1C1C1E] ml-[10px] md:w-[330px] w-[95%]">
                        <p className="overflow-hidden overflow-ellipsis  whitespace-nowrap">
                          {ele.title}
                        </p>
                      </div>
                      <div className="flex text-[12px] md:text-[14px] text-[#727374] ml-[8px] font-[400] my-[8px] items-center">
                        <img
                          src="/svgs/calender.svg"
                          alt="location"
                          className="h-[16px] mr-[5px] md:h-[21px]"
                        />
                        <span>
                          {ele.startDate === ele.endDate ? (
                            <>
                              {new Date(ele.startDate).getDate()}{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                              }).format(new Date(ele.startDate))}
                            </>
                          ) : (
                            <>
                              {new Date(ele.startDate).getDate()}{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                              }).format(new Date(ele.startDate))}{" "}
                              to {new Date(ele.endDate).getDate()}{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                              }).format(new Date(ele.endDate))}
                            </>
                          )}
                        </span>
                        <span>
                          &nbsp;| {moment(ele?.startDate).format("LT")} |&nbsp;
                        </span>
                        <span className="font-semibold text-[#2ECC71]">
                          Ongoing
                        </span>
                      </div>

                      <div className="flex text-[12px] md:text-[14px] text-[#727374] mx-[8px] font-[400] my-[8px] items-center w-[95%]">
                        <img
                          src="/svgs/Location.svg"
                          alt="location"
                          className="h-[16px] mr-[5px] md:h-[20px]"
                        />

                        <p className="overflow-hidden overflow-ellipsis  whitespace-nowrap">
                          {ele.location?.addressLine1}, {ele.location?.pincode},{" "}
                          {ele.location?.city}, {ele.location?.state}
                        </p>
                      </div>
                    </div>
                  </div>
                  // <div
                  //   key={index}
                  //   onClick={() => {
                  //     if (
                  //       ele?.eventRole === "attendee" ||
                  //       ele?.eventRole === "speaker" ||
                  //       ele?.eventRole === "exhibitorAndSponsor"
                  //     ) {
                  //       navigate(`/home/events?eventId=${ele._id}`);
                  //     } else {
                  //       navigate(`/events/${ele._id}?show=eventInfo`);
                  //     }
                  //   }}
                  //   className="w-full"
                  // >
                  //   <div className="cursor-pointer relative rounded-[10px] w-full md:w-[335px] h-[157px] bg-cover">
                  //     <div className="flex justify-between w-full items-center absolute top-2.5 font-bold text-[20px] text-white">
                  //       <div className="pl-2.5">{ele?.title}</div>
                  //       <div
                  //         className={`w-[92px] flex justify-center items-center gap-x-[5px] rounded-xl h-6 text-[#fff] text-sm ${
                  //           ele?.eventRole === "attendee"
                  //             ? "bg-[#2D9CDB]"
                  //             : ele?.eventRole === "speaker"
                  //             ? "bg-[#17c53a]"
                  //             : "bg-[#F2994A]"
                  //         } text-center mr-2.5`}
                  //       >
                  //         <div>{ele?.eventRole || "organizer"}</div>
                  //         {ele?.eventRole === "attendee" ||
                  //         ele?.eventRole === "speaker" ? (
                  //           ""
                  //         ) : (
                  //           <img src="/svgs/grade.svg" alt="Star" />
                  //         )}
                  //       </div>
                  //     </div>
                  //     <div className="w-auto bg-[#F4F6F9] rounded-xl text-black px-3 py-1 font-semibold absolute bottom-[10px] left-[10px] text-[11px]">
                  //       {moment(ele.startDate).format("LLL")}
                  //     </div>
                  //     <img
                  //       src={ele?.coverImage}
                  //       alt={ele?.title}
                  //       className="w-full object-cover h-[157px] rounded-[10px]"
                  //     />
                  //   </div>
                  //   {/* <div className="flex gap-x-2.5 mt-5 mb-2.5">
                  //     {tags.map((tag, index) => (
                  //       <span
                  //         key={index}
                  //         className="bg-[#F4F6F9] rounded-xl px-3 py-1 text-[11px] font-semibold"
                  //       >
                  //         {tag}
                  //       </span>
                  //     ))}
                  //   </div> */}
                  //   <div className="text-[10px] font-semibold text-[#1C1C1E] opacity-60 w-[335px] mt-[16px]">
                  //     {ele?.shortDescription.slice(0, 100)}...
                  //   </div>
                  // </div>
                );
              })
            )}
          </div>
        ) : eventTab === "Upcoming Events" ? (
          <div className="grid w-full place-items-center h-[350px]">
            <div>
              <p className="text-[15px] font-[500] text-[#717171]  text-center">
                No upcoming events found
              </p>
              <img
                src="/svgs/nullState.svg"
                alt=""
                className="w-[230px] h-[230px]"
              />
            </div>
          </div>
        ) : eventTab === "Past Events" ? (
          <div className="grid w-full place-items-center h-[350px]">
            <div>
              <p className="text-[15px] font-[500] text-[#717171] text-center">
                No past events found
              </p>
              <img
                src="/svgs/nullState.svg"
                alt=""
                className="w-[230px] h-[230px]"
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="fixed bottom-0 h-[76px] z-20 w-full rounded-t-[10px] border items-center justify-center flex shadow md:hidden bg-white">
        <button
          className="h-[40px] bg-primary w-[90%] m-auto text-white text-[12px] rounded-[4px]"
          onClick={() => setQrscan(true)}
        >
          Scan a badge
        </button>
      </div>
    </div>
  );
}

export default AllEvents;
