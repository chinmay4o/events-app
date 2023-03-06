import React from "react";

const LandingHost = ({ singleEvent }) => {
  return (
    <div className="h-[400px] w-[100%]">
      <span className="text-base text-[#727374]">Event organiser</span>
      <div className="flex items-center font-normal mt-2">
        {singleEvent.organizer?.profilePicture ? (
          <img
            src={singleEvent.organizer.profilePicture}
            alt="user"
            className="rounded-full sm:w-[40px] sm:h-[40px] w-[26x] h-[26px] mr-2"
          />
        ) : (
          <div class="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center mr-2 text-white text-lg font-medium">
            {singleEvent.organizer.organization.charAt(0)}
          </div>
        )}
        <div className="">
          <div className="font-normal py-1 sm:text-[26px] text-base">
            {singleEvent.organizer.organization}
          </div>
        </div>
      </div>
      <div className="mt-5 text-[#727374] ">
        {/* <p className="text-base font-normal py-1 mt-5">
          For contact & communications
        </p>
        <p className="text-base font-medium py-1 text-primary underline sm:mt-5 mt-1 cursor-pointer">
          {singleEvent.organizer.email}
        </p> */}
        <p className="text-base font-normal py-1 sm:mt-5 mt-2">
          For event support
        </p>
        <p className="text-base font-medium py-1 text-primary underline sm:mt-1 mt-1 cursor-pointer">
          {singleEvent.organizer.email}
        </p>
      </div>
    </div>
  );
};

export default LandingHost;
