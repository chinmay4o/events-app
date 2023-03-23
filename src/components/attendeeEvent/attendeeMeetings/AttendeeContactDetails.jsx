import React from "react";

const AttendeeContactDetails = ({ viewContact, setViewContact }) => {
  return (
    <div>
      <div
        className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-30 fixed w-[100%]"
        onClick={() => setViewContact(false)}
      ></div>
      <div
        className={`h-[50%] w-full md:w-${
          viewContact ? "full" : "0"
        } z-50 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out`}
      >
        <div className={`w-full mx-auto mt-[8px] flex items-center flex-col `}>
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer "
            onClick={() => setViewContact(false)}
          ></div>
          <div className="w-full -mt-[10px] ">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div>
                  <p className="font-[500] text-[16px] text-center">
                    Contact details
                  </p>
                </div>
                <div className="h-[96px] w-[96px] border m-auto rounded-full mt-[30px]"></div>
                <span className="mt-[10px] text-[#000000] text-[24px] m-auto cursor-pointer font-[500] ">
                  Rahul Joshi
                </span>
                <span className="text-[12px] text-[#4F4F4F] font-[500] m-auto mt-[12px]">
                  Product Designer, Ream Design
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[30px] items-center">
          <span className="flex items-center cursor-pointer text-[#2ECC71] text-[12px] font-[700] border border-[#2ECC71] h-[40px] w-[90%] justify-center rounded-[4px] bg-white md:w-[140px] mb-[10px]">
            <a
              // href={speakerData.linkedinUrl}
              className="flex items-center "
              target="_blank"
            >
              <img src="/svgs/Phone.svg" alt="" className="mr-2" />
              Call Rahul (9988998877)
            </a>
          </span>
          <span className="flex items-center cursor-pointer text-[#1C1C1E] font-[700] text-[12px] border h-[40px] w-[90%] justify-center rounded-[4px] bg-white md:w-[140px]">
            <a
              // href={speakerData.linkedinUrl}
              className="flex items-center "
              target="_blank"
            >
              Email Rahul (rahul@email.com)
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendeeContactDetails;
