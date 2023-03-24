import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FileInput from "../../common/inputElements/FileInput";
import TextInput from "../../common/inputElements/TextInput";
import TextArea from "../../common/inputElements/TextArea";

const BookMeeting = ({
  settrigger,
  trigger,
  isEdit,
  setIsEdit,
  isReschedule,
  setIsReschedule,
  isCancelled,
  setisCancelled,
}) => {
  const [activeDate, setActiveDate] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [isSuccess, setisSuccess] = useState(false);

  const eventDates = [
    "20 Feb",
    "21 Feb",
    "22 Feb",
    "23 Feb",
    "24 Feb",
    "25 Feb",
  ];
  const eventTime = ["10:00 am", "10:30 am", "11:00 am", "11:30 am"];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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
                <div className="h-[96px] w-[96px] border m-auto rounded-full mt-[27px]"></div>
                <span className="mt-[10px] text-[#000000] text-[24px] m-auto cursor-pointer font-[500] ">
                  Rahul Joshi
                </span>
                <span className="text-[12px] text-[#4F4F4F] font-[500] m-auto mt-[10px]">
                  Product Designer, Ream Design
                </span>
              </div>
              {!isSuccess && !isCancelled ? (
                <form
                  className="mt-10"
                  id="form_submit"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsEdit(false);
                    setIsReschedule(false);
                    setisSuccess(true);
                  }}
                >
                  <div className="font-[500] text-[16px] mb-2">Choose day</div>
                  <div className="flex w-[100%] h-[60px] overflow-scroll place-items-center rounded-[8px] text-[16px] ml-0 justify-between items-center">
                    {eventDates.map((dates) => {
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
                    {eventTime.map((time) => {
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
                        : "Introduce yourself to Hugh"}
                    </span>
                    <textarea
                      type="text"
                      placeholder="Type your message here ..."
                      className="h-[96px] text-[12px] w-full mt-4 bg-[#F4F6F9] rounded-[10px] p-2 border border-[#F4F6F9]"
                    />
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
                        Your meeting request to Hugh has been cancelled.
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
                        Meeting request has been sent to Hugh. You will get a
                        notification once Hugh accepts your request.
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
                      24 Feb
                    </span>
                    <span className="flex my-3 items-center">
                      <img
                        src="/svgs/clock.svg"
                        alt="location"
                        className="mr-[8px] md:h-[21px]"
                      />
                      10:00 Am
                    </span>
                    <span className="flex items-start">
                      <img
                        src="/svgs/Message.svg"
                        alt="location"
                        className=" mr-[8px] md:h-[21px] mt-1"
                      />
                      “Hello Hugh, I would like to meet you to discuss the
                      upcoming design trends and you views on it. Thank you.”
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
                        onClick={() => {
                          setisCancelled(true);
                          setisSuccess(false);
                        }}
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
