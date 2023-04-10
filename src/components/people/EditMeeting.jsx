import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditMeeting = ({
  isReschedule,
  singleAttendee,
  event,
  meetingDetailSingle,
  setEdit,
  edit,
  setReschedule,
  meetingDetails,
  setMeetingDetails,
  receivedMeetings,
  sentMeetings,
}) => {
  const [activeDate, setActiveDate] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [formattedDates, setformattedDates] = useState([]);
  const [formattedTime, setformattedTime] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setActiveTime(meetingDetailSingle.meetingTime);
    setActiveDate(meetingDetailSingle.meetingDate);
  }, [meetingDetailSingle]);

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
  }, [event, meetingDetailSingle]);
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
  console.log(meetingDetailSingle);
  const onSubmit = async (data) => {
    let meetingObj;

    if (edit) {
      meetingObj = {
        ...meetingDetailSingle,
        meetingMessage: data.Message,
        meetingDate: activeDate,
        meetingTime: activeTime,
        meetingWith: [meetingDetailSingle?.meetingWith[0]._id],
      };
    } else {
      meetingObj = {
        ...meetingDetailSingle,
        meetingDate: activeDate,
        meetingTime: activeTime,
        meetingWith: [meetingDetailSingle?.meetingWith[0]._id],
      };
    }
    const updatedMeeting = meetingDetails.map((meeting) => {
      if (meeting.meetingID === meetingDetailSingle.meetingID) {
        return { ...meetingObj, meetingWith: meetingDetailSingle?.meetingWith };
      }
      return meeting;
    });
    setMeetingDetails(updatedMeeting);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return alert("Unauthorised from edit reducer");
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/edit-meeting`,
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
      console.log(data);

      if (response.status !== 200) {
        throw new Error();
      } else {
        setReschedule(false);
        setEdit(false);
        // setmeetingDetailSingle(
        //   data.user.meetingRequestSent[data.user.meetingRequestSent.length - 1]
        // );
        // setIsEdit(false);
        // setIsReschedule(false);
        // setisSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfEmailExists = (time) => {
    return (
      meetingDetails?.some(
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
  return (
    <div className="">
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%] md:left-0"
        onClick={() => {
          setEdit(false);
          setReschedule(false);
        }}
      ></div>
      <div className="flex justify-center fixed bottom-0 z-50 w-full bg-white h-[70px] items-center md:hidden">
        <button
          type="submit"
          form="form_submit"
          className="cursor-pointer text-white font-[500] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-primary md:w-[140px]"
        >
          {edit ? "Edit Request" : "Request reschedule"}
        </button>
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
              setEdit(false);
              setReschedule(false);
            }}
          ></div>
          <div className="w-full -mt-[10px]">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div className="md:flex md:justify-center md:relative md:items-center md:mt-[10px]">
                  <p className="font-[500] text-[16px] text-center md:text-[20px] ">
                    {edit ? "Edit Request" : "Reschedule meeting"}
                  </p>
                  <img
                    src="/svgs/Cross.svg"
                    alt=""
                    className="absolute right-0 h-[20px] cursor-pointer hidden md:block"
                    onClick={() => {
                      setEdit(false);
                      setReschedule(false);
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
                  <div
                    className={` h-[96px] w-[96px] rounded-full bg-${
                      ["red", "green", "blue", "yellow", "indigo"][
                        Math.floor(Math.random() * 5)
                      ]
                    }-500 flex items-center justify-center text-white text-[22px] font-medium uppercase cursor-pointer m-auto mt-[27px]`}
                  >
                    {singleAttendee?.firstName.slice(0, 1)}
                    {singleAttendee?.lastName.slice(0, 1)}
                  </div>
                )}

                <span className="mt-[10px] text-[#000000] text-[24px] m-auto cursor-pointer font-[500] ">
                  {singleAttendee?.firstName} {singleAttendee?.lastName}
                </span>
                <span className="text-[12px] text-[#4F4F4F] font-[500] m-auto mt-[10px]">
                  {singleAttendee?.organization}
                </span>
              </div>
              <form
                className="mt-10"
                id="form_submit"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="font-[500] text-[16px] mb-2">Choose day</div>
                <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-between items-center">
                  {formattedDates?.map((dates) => {
                    return (
                      <div
                        onClick={() => setActiveDate(dates)}
                        className={`max-w-[65px] grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
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
                <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-between items-center">
                  {formattedTime?.map((time) => {
                    return (
                      <>
                        {
                          checkIfEmailExists(time) ? (
                            // meetingDetails?.map((meeting) => {
                            //   if (
                            //     meeting.meetingTime.toLowerCase() ===
                            //     time.toLowerCase()
                            //   ) {
                            //     return (
                            <div
                              // onClick={() => setActiveTime(time)}
                              className={`max-w-[80px] grid place-items-center w-[100%]  mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-[#C7C7C8] text-white p-2 rounded-[17px]`}
                            >
                              {time}
                            </div>
                          ) : (
                            //   );
                            // } else {
                            //   return (
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
                          // ) : (

                          //   <div
                          //     onClick={() => setActiveTime(time)}
                          //     className={`max-w-[80px] grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
                          //       activeTime === time ? "primary" : "[#F4F6F9]"
                          //     } p-2 rounded-[17px] text-${
                          //       activeTime === time ? "white" : "[#F4F6F9]"
                          //     }`}
                          //   >
                          //     {time}
                          //   </div>
                          // )
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
                    {isReschedule
                      ? "Reason for rescheduling"
                      : `Introduce yourself to ${singleAttendee?.firstName}`}
                  </span>
                  {edit ? (
                    <textarea
                      className="border-transparent	 focus:outline-none text-[14px] font-medium rounded-[10px] bg-[#F4F6F9] w-full min-h-[150px] mt-[17px] focus:border-1.5 focus:border-primary focus:ring-0 "
                      placeholder={`Introduce yourself to ${singleAttendee?.firstName}`}
                      disabled={edit ? false : true}
                      {...register("Message", { required: true })}
                    >
                      {meetingDetailSingle?.meetingMessage}
                    </textarea>
                  ) : (
                    <textarea
                      className="border-transparent	 focus:outline-none text-[14px] font-medium rounded-[10px] bg-[#F4F6F9] w-full min-h-[150px] mt-[17px] focus:border-1.5 focus:border-primary focus:ring-0"
                      placeholder={`Introduce yourself to ${singleAttendee?.firstName}`}
                      disabled
                      value={meetingDetailSingle?.meetingMessage}
                    ></textarea>
                  )}
                </div>
                <div className="flex justify-center w-full bg-white items-center hidden md:block mt-[20px]">
                  <button
                    type="submit"
                    form="form_submit"
                    className="cursor-pointer text-white font-[500] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-primary  md:w-[100%]"
                  >
                    {edit ? "Edit Request" : "Request reschedule"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMeeting;
