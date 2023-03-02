import React from "react";
import FintechCard10 from "./cards/FintechCard10";
import FintechCard11 from "./cards/FintechCard11";
import FintechCard12 from "./cards/FintechCard12";
import FintechCard03 from "./cards/FintechCard03";

const Analytics = () => {
  return (
    <div className="w-full md:w-[822px] md:ml-[30px] md:mt-[25px] min-h-[900px]">
      <p className="font-[600] w-full mx-auto md:w-full text-[21px] pt-2.5 text-[#585858]">
        Analytics
      </p>

      <div className="mt-[20px] grid grid-cols-9 gap-[20px] ">
        <FintechCard10 />
        <FintechCard11 />
        <FintechCard12 />
      </div>

      <div className="">
        <FintechCard03 />
      </div>
    </div>
  );
};

export default Analytics;
