import React from "react";
import { useSearchParams } from "react-router-dom";

const ProgressBar = (props) => {
  const [searchParams] = useSearchParams();

  const { step } = props;
  return (
    <div className="w-full flex items-center gap-x-2 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`${step >= 1 ? "bg-primary" : "bg-gray-200"} h-2.5 ${
          searchParams.get("organizer") ? "w-[78.25px]" : "w-[120.33px]"
        } rounded-l-[6px]`}
      ></div>
      <div
        className={`${step >= 2 ? "bg-primary" : "bg-gray-200"} h-2.5 ${
          searchParams.get("organizer") ? "w-[78.25px]" : "w-[120.33px]"
        } `}
      ></div>
      <div
        className={`${step >= 3 ? "bg-primary" : "bg-gray-200"} h-2.5 ${
          searchParams.get("organizer") ? "w-[78.25px]" : "w-[120.33px]"
        } ${
          searchParams.get("organizer") ? "rounded-none" : "rounded-r-[6px]"
        }`}
      ></div>
      <div
        className={`bg-gray-200 ${
          searchParams.get("organizer") ? "block" : "hidden"
        } h-2.5 w-[78.25px] rounded-r-[6px]`}
      ></div>
    </div>
  );
};

export default ProgressBar;
