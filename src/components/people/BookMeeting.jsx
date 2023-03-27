import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../../common/inputElements/TextArea";
import { bookMeeting } from "../../redux/actions/meetingActions";

const BookMeeting = ({
  settrigger,
  trigger,
  isEdit,
  setIsEdit,
  isReschedule,
  setIsReschedule,
  isCancelled,
  setisCancelled,
  singleAttendee,
  event,
  meetingDetails,
  setMeetingDetails,
  deleteMeeting,
}) => {
  const [activeDate, setActiveDate] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [isSuccess, setisSuccess] = useState(false);
  const [formattedDates, setformattedDates] = useState([]);
  const [formattedTime, setformattedTime] = useState([]);
  const dispatch = useDispatch();
  const bookedMeeting = useSelector((state) => state.bookedMeeting);

  useEffect(() => {
    if (bookedMeeting.error) {
      alert("Please add again!! some error occurred");
    } else if (!Array.isArray(bookedMeeting.bookedMeeting)) {
      console.log("here");
      setMeetingDetails(
        bookedMeeting.bookedMeeting.meetingRequestSent[
          bookedMeeting.bookedMeeting?.meetingRequestSent.length - 1
        ]
      );
    }
  }, [bookedMeeting]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    const times = [];
    const startDate = new Date(event?.startDate);
    const endDate = new Date(event?.endDate);

    while (startDate < endDate) {
      times.push(
        startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      startDate.setMinutes(startDate.getMinutes() + 15);
    }
    setformattedTime(times);
  }, [event]);

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
    setMeetingDetails([]);
    const meetingObj = {
      meetingID: new Date().getTime().toString(),
      message: data.Message,
      date: activeDate,
      time: activeTime,
      sentTo: singleAttendee?._id,
    };
    dispatch(
      bookMeeting({
        ...meetingObj,
      })
    );
    setIsEdit(false);
    setIsReschedule(false);
    setisSuccess(true);
  };
  return (
    <div>
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%]"
        onClick={() => {
          settrigger(false);
          setIsEdit(false);
          setIsReschedule(false);
          setisSuccess(false);
          setisCancelled(false);
        }}
      ></div>
      <div className="flex justify-center fixed bottom-0 z-50 w-full bg-white h-[70px] items-center">
        {!isSuccess && !isCancelled ? (
          <button
            type="submit"
            form="form_submit"
            className="cursor-pointer text-white font-[500] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-primary md:w-[140px]"
          >
            {isEdit
              ? "Edit Request"
              : isReschedule
              ? "Request reschedule"
              : isCancelled
              ? "Meeting request cancelled"
              : "Send meeting request"}
          </button>
        ) : (
          <button
            className="cursor-pointer text-white font-[500] text-[12px] h-[40px] w-[90%] rounded-[4px] bg-primary md:w-[140px]"
            onClick={() => {
              settrigger(false);
              setIsEdit(false);
              setIsReschedule(false);
              setisSuccess(false);
              setisCancelled(false);
            }}
          >
            Done
          </button>
        )}
      </div>

      <div
        className={`h-[90%] w-full md:w-${
          trigger ? "full" : "0"
        } z-40 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out pb-[50px]`}
      >
        <div
          className={`max-w-[1440px] w-full mx-auto mt-[8px] flex items-center flex-col`}
        >
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer"
            onClick={() => {
              settrigger(false);
              setIsEdit(false);
              setIsReschedule(false);
              setisSuccess(false);
              setisCancelled(false);
            }}
          ></div>
          <div className="w-full -mt-[10px]">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div>
                  <p className="font-[500] text-[16px] text-center">
                    {isEdit
                      ? "Edit Request"
                      : isReschedule
                      ? "Reschedule meeting"
                      : isSuccess
                      ? "Meeting request sent"
                      : "Book a meeting"}
                  </p>
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
                {/* <div className="h-[96px] w-[96px] border m-auto rounded-full mt-[27px]"></div> */}
                <span className="mt-[10px] text-[#000000] text-[24px] m-auto cursor-pointer font-[500] ">
                  {singleAttendee?.firstName} {singleAttendee?.lastName}
                </span>
                <span className="text-[12px] text-[#4F4F4F] font-[500] m-auto mt-[10px]">
                  {/* Product Designer, Ream Design */}
                  {singleAttendee?.organization}
                </span>
              </div>
              {!isSuccess && !isCancelled ? (
                <form
                  className="mt-10"
                  id="form_submit"
                  onSubmit={handleSubmit(onSubmit)}
                  // onSubmit={(e) => {
                  //   e.preventDefault();
                  //   setIsEdit(false);
                  //   setIsReschedule(false);
                  //   setisSuccess(true);
                  // }}
                >
                  <div className="font-[500] text-[16px] mb-2">Choose day</div>
                  <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-between items-center">
                    {formattedDates?.map((dates) => {
                      return (
                        <div
                          onClick={() => setActiveDate(dates)}
                          className={`grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
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
                        <div
                          onClick={() => setActiveTime(time)}
                          className={`grid place-items-center w-[100%] cursor-pointer mr-[35px] text-[14px] font-[600] whitespace-nowrap bg-${
                            activeTime === time ? "primary" : "[#F4F6F9]"
                          } p-2 rounded-[17px] text-${
                            activeTime === time ? "white" : "[#F4F6F9]"
                          }`}
                        >
                          {time}
                        </div>
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
                    <div className="mt-[-20px]">
                      <TextArea
                        register={register}
                        type="text"
                        id={"Message"}
                        placeholder="Message"
                      />
                    </div>
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
                      {meetingDetails?.mettingMessage.split("").length > 130 ? (
                        <>
                          {meetingDetails?.mettingMessage.slice(0, 130)}
                          ...
                        </>
                      ) : (
                        <> {meetingDetails?.mettingMessage.slice(0, 130)}</>
                      )}
                      {/* <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {" "}
                        {meetingDetails?.mettingMessage}
                      </p> */}
                    </span>
                  </div>
                  {isCancelled ? (
                    <></>
                  ) : (
                    <div className="mymd:mt-3 mt-1 flex justify-between">
                      <span
                        className="flex items-center cursor-pointer text-primary text-[12px] font-[700] border border-primary h-[40px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
                        onClick={() => {
                          setIsEdit(true);
                          setisSuccess(false);
                        }}
                      >
                        Edit request
                      </span>
                      <span
                        className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[700] text-[12px] border border-[#E74C3C] h-[40px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
                        onClick={() =>
                          deleteMeeting(
                            meetingDetails,
                            meetingDetails.sentTo[0]
                          )
                        }
                      >
                        Cancel
                      </span>
                    </div>
                  )}
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
