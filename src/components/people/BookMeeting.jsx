import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";
import { getAuthenticatedRequest } from "../../utils/API/api.ts";

const BookMeeting = ({
  settrigger,
  isCancelled,
  setisCancelled,
  singleAttendee,
  event,
  meetingDetails,
  setMeetingDetails,
  deleteMeeting,
  receivedMeetings,
  sentMeetings,
}) => {
  const [activeDate, setActiveDate] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [isSuccess, setisSuccess] = useState(false);
  const [formattedDates, setformattedDates] = useState([]);
  const [formattedTime, setformattedTime] = useState([]);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //formating date and time: 12 Feb 10:00 am
  useEffect(() => {
    const dates = [];
    for (
      let date = new Date(event?.startDate);
      date <= new Date(event?.endDate);
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(
        `${date.getDate()} ${date.toLocaleString("default", {
          month: "short",
        })}`
      );
    }
    setformattedDates(dates);
  }, [event, meetingDetails]);

  useEffect(() => {
    const times = [];
    const startDate = new Date(event?.startDate);
    const endDate = new Date(event?.endDate);
    const maxHours = 24;
    while (startDate <= endDate && times.length < maxHours * 4) {
      times.push(
        new Date(startDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      startDate.setMinutes(startDate.getMinutes() + 15);
    }
    if (times) {
      setformattedTime(times);
    }
  }, [meetingDetails]);

  useEffect(() => {
    async function fetch() {
      const response = await getAuthenticatedRequest(
        "/user/userMeeting-details"
      );
      const { scheduledMeetings } = response?.data.user;

      const filteredscheduledMeetings = scheduledMeetings.filter(
        (meeting) => meeting.eventId === event?._id
      );

      setScheduledMeetings(filteredscheduledMeetings);
    }
    fetch();
  }, [meetingDetails, event]);
  //preventing background scroll on the popup page

  useEffect(() => {
    function preventBackgroundScroll(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("scroll", preventBackgroundScroll, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("scroll", preventBackgroundScroll);
    };
  }, []);

  //submiting meeting details to the backend
  const onSubmit = async (data) => {
    if (activeTime === "" || activeDate === "") {
      alert("Please select date and time");
      return;
    }

    if (data.Message === "") {
      alert("Please add some description");
      return;
    }
    setMeetingDetails([]);

    const meetingObj = {
      eventId: event._id,
      meetingID: new Date().getTime().toString(),
      message: data.Message,
      date: activeDate,
      time: activeTime,
      sentTo: singleAttendee?._id,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return alert("Unauthorised from edit reducer");
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/user-meetings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...meetingObj,
          }),
        }
      );

      const data = await response.json();
      console.log(data.user);

      if (response.status !== 200) {
        throw new Error();
      } else {
        setMeetingDetails(
          data.user.meetingRequestSent[data.user.meetingRequestSent.length - 1]
        );

        setisSuccess(true);
      }
    } catch (error) {
      alert("Error");
    }
  };

  const checkIfEmailExists = (time) => {
    console.log(time);
    return (
      scheduledMeetings?.some(
        (meeting) =>
          meeting.meetingTime.toLowerCase() === time.toLowerCase() &&
          meeting.meetingDate.toLowerCase() === activeDate.toLowerCase()
      ) ||
      receivedMeetings?.some(
        (meeting) =>
          meeting.meetingTime.toLowerCase() === time.toLowerCase() &&
          meeting.meetingDate.toLowerCase() === activeDate.toLowerCase()
      ) ||
      sentMeetings?.some(
        (meeting) =>
          meeting.meetingTime.toLowerCase() === time.toLowerCase() &&
          meeting.meetingDate.toLowerCase() === activeDate.toLowerCase()
      )
    );
  };
  console.log(scheduledMeetings, receivedMeetings, sentMeetings);
  return (
    <div className="">
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%] md:left-0"
        onClick={() => {
          settrigger(false);
          setisSuccess(false);
          setisCancelled(false);
        }}
      ></div>
      <div className="flex justify-center fixed bottom-0 z-50 w-full bg-white h-[70px] items-center md:hidden">
        {!isSuccess && !isCancelled ? (
          <button
            type="submit"
            form="form_submit"
            className="cursor-pointer text-white font-[500] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-primary md:w-[140px] "
          >
            {isCancelled ? "Meeting request cancelled" : "Send meeting request"}
          </button>
        ) : (
          <button
            className="cursor-pointer text-white font-[500] text-[12px] h-[40px] w-[90%] rounded-[4px] bg-primary md:w-[140px]"
            onClick={() => {
              settrigger(false);
              setisSuccess(false);
              setisCancelled(false);
            }}
          >
            Done
          </button>
        )}
      </div>

      <div
        className={`h-[90%] w-full z-40 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out pb-[50px] md:h-[90%] md:w-[500px] md:left-0 md:right-0 mx-auto md:top-1/2 md:-translate-y-1/2 md:rounded-[10px] md:pb-0`}
      >
        <div
          className={`max-w-[1440px] w-full mx-auto mt-[8px] flex items-center flex-col`}
        >
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer md:hidden"
            onClick={() => {
              settrigger(false);
              setisSuccess(false);
              setisCancelled(false);
            }}
          ></div>
          <div className="w-full -mt-[10px]">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div className="md:flex md:justify-center md:relative md:items-center md:mt-[10px]">
                  <p className="font-[500] text-[16px] text-center md:text-[20px] ">
                    {isSuccess ? "Meeting request sent" : "Book a meeting"}
                  </p>
                  <img
                    src="/svgs/Cross.svg"
                    alt=""
                    className="absolute right-0 h-[20px] cursor-pointer hidden md:block"
                    onClick={() => {
                      settrigger(false);
                      setisSuccess(false);
                      setisCancelled(false);
                    }}
                  />
                </div>
                {singleAttendee?.profilePicture ? (
                  <img
                    src={singleAttendee?.profilePicture}
                    alt=""
                    className="h-[96px] w-[96px] m-auto rounded-full mt-[27px]"
                  />
                ) : (
                  <div className=" m-auto mt-[27px]">
                    <DefaultProfilePicture
                      firstName={singleAttendee?.firstName}
                      lastName={singleAttendee?.lastName}
                      style={{
                        width: "96px",
                        height: "96px",
                        borderRadius: "300px",
                        fontSize: "30px",
                      }}
                    />
                  </div>
                )}

                <span className="mt-[10px] text-[#000000] text-[24px] m-auto cursor-pointer font-[500] ">
                  {singleAttendee?.firstName} {singleAttendee?.lastName}
                </span>
                <span className="text-[12px] text-[#4F4F4F] font-[500] m-auto mt-[10px]">
                  {singleAttendee?.organization}
                </span>
              </div>
              {!isSuccess && !isCancelled ? (
                <form
                  className="mt-10"
                  id="form_submit"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="font-[500] text-[16px] mb-2">Choose day</div>
                  <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-start items-center ">
                    {formattedDates?.map((dates) => {
                      return (
                        <div
                          onClick={() => setActiveDate(dates)}
                          className={`grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap max-w-[65px] bg-${
                            activeDate === dates ? "primary" : "[#F4F6F9]"
                          } p-2 rounded-[17px] text-${
                            activeDate === dates ? "white" : "[#F4F6F9]"
                          }`}
                        >
                          {dates}
                        </div>
                      );
                    })}
                  </div>
                  <div className="font-[500] text-[16px] mb-2">Choose time</div>
                  <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-start items-center">
                    {formattedTime?.map((time) => {
                      return (
                        <>
                          {
                            checkIfEmailExists(time) ? (
                              <div
                                className={`max-w-[80px] grid place-items-center w-[100%]  mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-[#C7C7C8] text-white p-2 rounded-[17px]`}
                              >
                                {time}
                              </div>
                            ) : (
                              <div
                                onClick={() => setActiveTime(time)}
                                className={` max-w-[80px] grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
                                  activeTime === time ? "primary" : "[#F4F6F9]"
                                } p-2 rounded-[17px] text-${
                                  activeTime === time ? "white" : "[#F4F6F9]"
                                }`}
                              >
                                {time}
                              </div>
                            )
                            /* ) : (
                            <div
                              onClick={() => setActiveTime(time)}
                              className={` max-w-[80px] grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
                                activeTime === time ? "primary" : "[#F4F6F9]"
                              } p-2 rounded-[17px] text-${
                                activeTime === time ? "white" : "[#F4F6F9]"
                              }`}
                            >
                              {time}
                            </div>
                          ) */
                          }
                        </>
                      );
                    })}
                  </div>
                  <span className="text-[#727374] text-sm font-[400]">
                    Note: A 15 mins slot is booked per meeting{" "}
                  </span>
                  <div className="mt-5">
                    <span className="text-[#121212] text-[16px] font-[500]">
                      {`Introduce yourself to ${singleAttendee?.firstName}`}
                    </span>
                    <textarea
                      className="border-transparent	 focus:outline-none text-[14px] font-medium rounded-[10px] bg-[#F4F6F9] w-full min-h-[150px] mt-[17px] focus:border-1.5 focus:border-primary focus:ring-0 "
                      placeholder={`Introduce yourself to ${singleAttendee?.firstName}`}
                      // value={"somthing"}
                      {...register("Message", {
                        required: true,
                      })}
                    ></textarea>
                  </div>
                  <div className="flex justify-center w-full bg-white items-center hidden md:block mt-[20px] ">
                    <button
                      type="submit"
                      form="form_submit"
                      className="cursor-pointer text-white font-[500] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-primary md:w-[100%] "
                    >
                      {isCancelled
                        ? "Meeting request cancelled"
                        : "Send meeting request"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-10">
                  {isCancelled ? (
                    <div className="flex items-start">
                      <img
                        src="/svgs/Cancelled.svg"
                        alt="cancelled"
                        className=" mr-3"
                      />
                      <p className="text-[16px] font-[400]">
                        Your meeting request to {singleAttendee?.firstName} has
                        been cancelled.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <img
                        src="/svgs/Checkcircle.svg"
                        alt="check"
                        className=" mr-3"
                      />
                      <p className="text-[16px] font-[400]">
                        Meeting request has been sent to{" "}
                        {singleAttendee?.firstName}. You will get a email once{" "}
                        {singleAttendee?.firstName} accepts your request.
                      </p>
                    </div>
                  )}

                  <div className="my-6">
                    <span className="text-[#121212] text-[16px] font-[500] mt-6">
                      Meeting details
                    </span>
                    <span className="flex mt-3 items-center">
                      <img
                        src="/svgs/calender.svg"
                        alt="location"
                        className="mr-[8px] md:h-[21px]"
                      />
                      {meetingDetails?.meetingDate}
                    </span>
                    <span className="flex my-3 items-center">
                      <img
                        src="/svgs/clock.svg"
                        alt="location"
                        className="mr-[8px] md:h-[21px]"
                      />
                      {meetingDetails?.meetingTime}
                    </span>

                    <span className="flex items-start">
                      <img
                        src="/svgs/Message.svg"
                        alt="location"
                        className=" mr-[8px] md:h-[21px] mt-1"
                      />
                      {meetingDetails?.meetingMessage?.split("").length >
                      130 ? (
                        <>
                          {meetingDetails?.meetingMessage?.slice(0, 130)}
                          ...
                        </>
                      ) : (
                        <> {meetingDetails?.meetingMessage?.slice(0, 130)}</>
                      )}
                    </span>
                  </div>
                  {isCancelled ? (
                    <></>
                  ) : (
                    <div className="mymd:mt-3 mt-1 flex justify-between">
                      {/* <span
                        className="flex items-center cursor-pointer text-primary text-[12px] font-[700] border border-primary h-[40px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
                        onClick={() => {
                          setIsEdit(true);
                          setisSuccess(false);
                        }}
                      >
                        Edit request
                      </span> */}
                      <span
                        className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[700] text-[12px] border border-[#E74C3C] h-[40px] w-[100%] justify-center rounded-[4px] md:w-[100%]"
                        onClick={() =>
                          deleteMeeting(
                            meetingDetails,
                            meetingDetails.meetingWith[0]
                          )
                        }
                      >
                        Cancel
                      </span>
                    </div>
                  )}
                  <div className=" flex justify-center w-full bg-white items-center hidden md:block mt-[20px]">
                    <button
                      className="cursor-pointer text-white font-[500] text-[12px] h-[40px] w-[90%] rounded-[4px] bg-primary md:w-[100%]"
                      onClick={() => {
                        settrigger(false);
                        setisSuccess(false);
                        setisCancelled(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMeeting;
