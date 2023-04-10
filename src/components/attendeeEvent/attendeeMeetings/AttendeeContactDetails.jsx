import React, { useEffect } from "react";

const AttendeeContactDetails = ({
  viewContact,
  setViewContact,
  meetingDetails,
}) => {
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
  return (
    <div className="">
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%] md:left-0"
        onClick={() => setViewContact(false)}
      ></div>
      <div
        className={`h-[450px] w-full z-50 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out md:h-[60%] md:w-[450px] md:left-0 md:right-0 mx-auto md:top-1/2 md:-translate-y-1/2 md:rounded-[10px]`}
      >
        <div className={`w-full mx-auto mt-[8px] flex items-center flex-col `}>
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer md:hidden"
            onClick={() => setViewContact(false)}
          ></div>
          <div className="w-full -mt-[10px] ">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div className="md:flex md:justify-center md:relative md:items-center md:mt-[10px]">
                  <p className="font-[500] text-[16px] text-center md:text-[20px] ">
                    Contact details
                  </p>
                  <img
                    src="/svgs/Cross.svg"
                    alt=""
                    className="absolute right-0 h-[20px] cursor-pointer hidden md:block"
                    onClick={() => setViewContact(false)}
                  />
                </div>
                {meetingDetails?.profilePicture ? (
                  <img
                    src={meetingDetails?.profilePicture}
                    className="rounded-full h-[96px] w-[96px]  object-cover  m-auto mt-[30px]"
                  />
                ) : (
                  <div
                    className={`h-[96px] w-[96px] rounded-full bg-${
                      ["red", "green", "blue", "yellow", "indigo"][
                        Math.floor(Math.random() * 5)
                      ]
                    }-500 flex items-center justify-center  text-white text-[25px] font-medium uppercase m-auto mt-[30px]`}
                  >
                    {meetingDetails?.firstName.slice(0, 1)}
                    {meetingDetails?.lastName.slice(0, 1)}
                  </div>
                )}

                <span className="mt-[10px] text-[#000000] text-[24px] m-auto cursor-pointer font-[500] ">
                  {meetingDetails?.firstName} {meetingDetails?.lastName}
                </span>
                <span className="text-[12px] text-[#4F4F4F] font-[500] m-auto mt-[12px]">
                  {meetingDetails.jobTitle}, {meetingDetails.organization}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[30px] items-center">
          <span className="flex items-center cursor-pointer text-[#2ECC71] text-[12px] font-[700] border border-[#2ECC71] h-[40px] w-[90%] justify-center rounded-[4px] bg-white md:w-[80%] mb-[10px]">
            <img src="/svgs/Phone.svg" alt="" className="mr-2" />
            Call {meetingDetails?.firstName} ({meetingDetails.mobile})
          </span>
          <span className="flex items-center cursor-pointer text-[#1C1C1E] font-[700] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-white md:w-[80%]">
            Email {meetingDetails?.firstName} ({meetingDetails.email})
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendeeContactDetails;
