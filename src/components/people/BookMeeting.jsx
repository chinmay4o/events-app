import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FileInput from "../../common/inputElements/FileInput";
import TextInput from "../../common/inputElements/TextInput";
import TextArea from "../../common/inputElements/TextArea";

const BookMeeting = ({ settrigger, trigger }) => {
  const [activeDate, setActiveDate] = useState("");
  const [activeTime, setActiveTime] = useState("");
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
        onClick={() => settrigger(false)}
      ></div>
      <div
        className={`h-[80%] w-full md:w-${
          trigger ? "full" : "0"
        } z-50 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out`}
      >
        <div
          className={`max-w-[1440px] w-full mx-auto mt-[8px] flex items-center flex-col`}
        >
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer"
            onClick={() => settrigger(false)}
          ></div>
          <div className="w-full -mt-[10px]">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div>
                  <p className="font-[500] text-[16px] text-center">
                    Book a meeting
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
              <form className="mt-10">
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
                    Introduce yourself to Hugh
                  </span>
                  <textarea
                    type="text"
                    placeholder="Type your message here ..."
                    className="h-[96px] text-[12px] w-full mt-4 bg-[#F4F6F9] rounded-[10px] p-2 border border-[#F4F6F9]"
                  />
                </div>
                <span className="flex items-center cursor-pointer text-white text-[12px] font-[500] text-[12px] border h-[40px] w-[100%] justify-center rounded-[4px] bg-primary md:w-[140px] mt-[25px]">
                  Send meeting request
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMeeting;
