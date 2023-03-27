import React from "react";
import { useNavigate } from "react-router-dom";

const MeetingsNotes = ({ setNotes }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-[100vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white border
    "
    >
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[60px] md:relative">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => setNotes(false)}
        />
        <span className="ml-2 text-[22px] font-[500]">Pranav Gupta</span>
      </div>
      <div className="mt-[60px] mx-[16px] pt-[16px] md:pt-1 md:mt-[120px]">
        <div
          // key={key}
          className="bg-[#F4F6F9] mb-4 min-h-[160px] rounded-[10px] p-[16px] border border-[2px] border-white"
        >
          <div className="flex relative">
            <div>
              <div className="sm:text-[14px] text-[12px] font-[400] md:font-semibold text-[#747B84] w-[90%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <span className="flex text-[12px] font-[400] text-[rgba(116,123,132,0.5)] mt-4">
                13 Nov, 2022 • 3:45 pm
              </span>
            </div>

            <img
              src="/svgs/Menu.svg"
              alt=""
              className="right-[0px] absolute cursor-pointer"
              //   onClick={() => setViewContact(true)}
            />
          </div>
        </div>
        <div
          // key={key}
          className="bg-[#F4F6F9] mb-4 min-h-[160px] rounded-[10px] p-[16px] border border-[2px] border-white"
        >
          <div className="flex relative">
            <div>
              {/* <div className="sm:text-[14px] text-[12px] font-[400] md:font-semibold text-[#747B84] w-[90%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div> */}
              <img
                src="https://img.freepik.com/free-photo/medium-shot-happy-friends-city_23-2149003088.jpg"
                alt=""
                className="w-[90%] h-[198px] rounded-[5px] object-cover"
              />
              <span className="flex text-[12px] font-[400] text-[rgba(116,123,132,0.5)] mt-4">
                13 Nov, 2022 • 3:45 pm
              </span>
            </div>

            <img
              src="/svgs/Menu.svg"
              alt=""
              className="right-[0px] absolute cursor-pointer"
              //   onClick={() => setViewContact(true)}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full h-[65px] z-50 bg-white flex items-center justify-between">
        <textarea
          type="text"
          placeholder="Add Notes"
          className="border-0 focus:ring-0 w-[67%] text-[16px] font-[400] h-[45px]"
        />
        <img
          src="/svgs/Mic.svg"
          alt="mic"
          className="cursor-pointer h-[18px] "
        />
        <img
          src="/svgs/image_upload.svg"
          alt="mic"
          className="cursor-pointer h-[18px]"
        />
        <img
          src="/svgs/send.svg"
          alt="mic"
          className="cursor-pointer mr-3 h-[16px]"
        />
      </div>
    </div>
  );
};

export default MeetingsNotes;
