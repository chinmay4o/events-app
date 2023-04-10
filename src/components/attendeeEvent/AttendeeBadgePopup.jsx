import React, { useEffect } from "react";

const AttendeeBadgePopup = ({
  badegExpand,
  setBadegExpand,
  savedUserConfig,
  singleEvent,
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
        onClick={() => setBadegExpand(false)}
      ></div>

      <div
        className={`h-[90%] w-full z-50 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll transform transition duration-1000 ease-in-out md:h-[80%] md:w-[480px] md:left-0 md:right-0 mx-auto md:top-1/2 md:-translate-y-1/2 md:rounded-[10px]`}
      >
        <div className={`w-full mx-auto mt-[8px] flex items-center flex-col `}>
          <div
            className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer md:hidden"
            onClick={() => setBadegExpand(false)}
          ></div>
          <div className="w-full -mt-[10px] ">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col">
                <div className="md:flex md:justify-center md:relative md:items-center md:mt-[10px]">
                  <p className="font-[500] text-[16px] text-center md:text-[20px] ">
                    Your badge for this event
                  </p>
                  <img
                    src="/svgs/Cross.svg"
                    alt=""
                    className="absolute right-0 h-[20px] cursor-pointer hidden md:block"
                    onClick={() => setBadegExpand(false)}
                  />
                </div>
                {savedUserConfig?.attendee.eventSpecificData.map((items) => {
                  if (items.eventId === singleEvent?._id) {
                    return (
                      <img
                        className="w-full h-[500px] md:h-[500px] md:w-[350px] md:mx-auto "
                        src={items.badgeUrl}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeBadgePopup;
