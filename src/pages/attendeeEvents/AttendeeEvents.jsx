import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEvents } from "../../redux/actions/userActions";
import { EVENT_CREATE_DESTROY } from "../../redux/constants/eventConstants";
import moment from "moment";

const AttendeeEvents = () => {
  const userEventsData = useSelector((state) => state.userEvents);
  const { error, loading, userEvents } = userEventsData;
  const userLogin = useSelector((state) => state.userLogin);
  const { errorA, loadingA, userInfo } = userLogin;
  const dispatch = useDispatch();
  const [allEvents, setAllEvents] = useState([]);

  // console.log(userEvents);
  const navigate = useNavigate();

  useEffect(() => {
    const eventData = userEvents?.filter((events) => {
      return events?.eventRole === "attendee";
    });
    setAllEvents(eventData);
  }, [userEvents]);

  let accessToken;
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
  return (
    <div className="w-full h-[100vh] bg-[#F5F5F5]">
      <div className="w-full h-[60px] fixed top-0 bg-[#F5F5F5] flex items-center justify-between px-[16px]">
        <div className="flex items-center text-[22px] font-[500]">
          <img src="/svgs/logo.svg" alt="logo" className="w-[30px] mr-[5px]" />{" "}
          Warpbay
        </div>
        <div className="flex items-center">
          <img
            src="/svgs/Search.svg"
            className="w-[20px] h-[20px] object-cover cursor-pointer"
          />
          <img
            src="/svgs/Notifications.svg"
            className="w-[19px] h-[19px] object-cover cursor-pointer mx-[20px]"
          />
          <img
            src="/svgs/profile.svg"
            className="w-[24px] h-[24px] object-cover cursor-pointer"
            onClick={() => navigate("/attendee/profile")}
          />
        </div>
      </div>
      <div className="w-full mt-[60px] pb-[80px] bg-[#F5F5F5]">
        <div className="mx-[16px] pt-[5px]">
          <span className="text-[#727374] text-[12px]">
            Hello <span className="text-black font-[500] ">Pulkit,</span> here's
            all your events ...
          </span>
          {allEvents?.map((event) => {
            return (
              <div
                className="cursor-pointer bg-white"
                onClick={() => navigate(`/attendee/${event._id}?tab=about`)}
              >
                <img
                  src={event.coverImage}
                  alt=""
                  className="h-[184px] w-full rounded-t-[10px] mt-[16px] shadow"
                />
                <div className="h-[96px] w-full border-x-[1px] border-b-[1px] rounded-b-[10px] shadow">
                  <div className="font-medium text-[16px] pt-[8px] text-[#1C1C1E] ml-[16px]">
                    {event.title}
                  </div>
                  <div className="flex text-[12px] text-[#727374] ml-[16px] font-normal my-[8px]">
                    <span>
                      {event.startDate === event.endDate ? (
                        <>
                          {new Date(event.startDate).getDate()}{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                          }).format(new Date(event.startDate))}
                        </>
                      ) : (
                        <>
                          {new Date(event.startDate).getDate()}{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                          }).format(new Date(event.startDate))}{" "}
                          to {new Date(event.endDate).getDate()}{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                          }).format(new Date(event.endDate))}
                        </>
                      )}
                    </span>
                    <span>
                      &nbsp;| {moment(event?.startDate).format("LT")} |&nbsp;
                    </span>
                    <span className="font-semibold text-[#2ECC71]">
                      Ongoing
                    </span>
                  </div>

                  <div className="flex text-[12px] text-[#727374] ml-[13px] font-normal my-[8px] items-center">
                    <img
                      src="/svgs/Location.svg"
                      alt="location"
                      className="h-[16px] mr-[5px]"
                    />
                    {event.location?.addressLine1}, {event.location?.pincode},{" "}
                    {event.location?.city}, {event.location?.state}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 h-[76px] z-20 w-full rounded-t-[10px] border items-center justify-center flex shadow md:hidden bg-white">
        <button className="h-[40px] bg-primary w-[90%] m-auto text-white text-[12px] rounded-[4px]">
          Scan a badge
        </button>
      </div>
    </div>
  );
};

export default AttendeeEvents;
