import React, { useEffect, useState } from "react";
import Primarybtn from "../../common/buttons/Primarybtn";
import { useSelector, useDispatch } from "react-redux";
import { getUserEvents } from "../../redux/actions/userActions";
import { eventsTab, tags } from "../../helper/constant";
import { EVENT_CREATE_DESTROY } from "../../redux/constants/eventConstants";
import Loader from "../../common/loader/Loader";
import moment from "moment";
import { useNavigate } from "react-router";

function AllEvents() {
  const navigate = useNavigate();

  let accessToken;

  const dispatch = useDispatch();
  const userEventsData = useSelector((state) => state.userEvents);
  const { error, loading, userEvents } = userEventsData;
  const userLogin = useSelector((state) => state.userLogin);
  const { errorA, loadingA, userInfo } = userLogin;

  const [eventTab, setEventTab] = useState("My Events");

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
    <div className="w-full md:w-[713px] md:pb-5 md:mt-7 px-[16px] flex flex-col">
      <div className="mx-auto text-[24px] font-bold md:hidden w-full md:w-[335px] mt-6">
        All Events
      </div>
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-x-11 h-[60px]">
        <form className="flex items-center my-4 w-full md:w-[335px]">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              placeholder="Search"
              required={true}
            ></input>
          </div>
        </form>
        <div className="hidden md:flex  md:items-center md:my-4 w-full md:w-[335px]">
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
        <div className="grid grid-cols-1 md:px-0 place-content-center justify-items-center md:grid-cols-2 gap-x-[65px] gap-y-[35px] mt-7 md:mt-[46px]">
          {userEvents?.length === 0 ? (
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
            <h3 className="text-[25px] font-[600] text-center text-gray-500">
              Loading...
            </h3>
          ) : (
            userEvents?.map((ele, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (
                      ele?.eventRole === "attendee" ||
                      ele?.eventRole === "speaker" ||
                      ele?.eventRole === "exhibitorAndSponsor"
                    ) {
                      navigate(`/home/events?eventId=${ele._id}`);
                    } else {
                      navigate(`/events/${ele._id}?show=eventInfo`);
                    }
                  }}
                  className="w-full"
                >
                  <div className="cursor-pointer relative rounded-[10px] w-full md:w-[335px] h-[157px] bg-cover">
                    <div className="flex justify-between w-full items-center absolute top-2.5 font-bold text-[20px] text-white">
                      <div className="pl-2.5">{ele?.title}</div>
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
                    <div className="w-auto bg-[#F4F6F9] rounded-xl text-black px-3 py-1 font-semibold absolute bottom-[10px] left-[10px] text-[11px]">
                      {moment(ele.startDate).format("LLL")}
                    </div>
                    <img
                      src={ele?.coverImage}
                      alt={ele?.title}
                      className="w-full object-cover h-[157px] rounded-[10px]"
                    />
                  </div>
                  {/* <div className="flex gap-x-2.5 mt-5 mb-2.5">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#F4F6F9] rounded-xl px-3 py-1 text-[11px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div> */}
                  <div className="text-[10px] font-semibold text-[#1C1C1E] opacity-60 w-[335px] mt-[16px]">
                    {ele?.shortDescription.slice(0, 100)}...
                  </div>
                </div>
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
  );
}

export default AllEvents;
