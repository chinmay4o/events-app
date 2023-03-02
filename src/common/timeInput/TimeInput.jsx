import React, { useEffect, useRef, useState } from "react";
import { getTimerOptions } from "../../helper/constant";
import useOnClickOutside from "../../helper/hooks/useOnClickOutside";
import timeValues from "../../utils/timeValues.json";

const TimeInput = ({
  setEvent,
  setValue,
  id,
  value,
  required,
  label,
  isHalfWidth,
}) => {
  const [timeLabel, setTimeLabel] = useState(value);
  const [dropdown, setDropdown] = useState(false);
  const timerOptions = getTimerOptions(15);
  const elementRef = useOnClickOutside(() => setDropdown(false));

  return (
    <div className={`relative ${isHalfWidth ? "w-[50%]" : ""}`}>
      <div
        ref={elementRef}
        id={id}
        className="bg-[#F4F6F9] cursor-pointer w-full h-[45px] rounded-lg flex items-center pl-4 text-[14px] border-[#e0e0e0] border-[1px] text-[#646464] hover:border-primary hover:border-2"
        onClick={() => setDropdown(!dropdown)}
      >
        {timeLabel ? timeLabel : "Select Time"}
      </div>
      <label
        htmlFor={id}
        className="absolute left-0 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-sm font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
      >
        {label}
      </label>
      {dropdown && (
        <div
          id="dropdown"
          className={` absolute top-12 overflow-y-scroll max-h-56 rounded-lg z-10 w-full bg-white divide-y-0 divide-[#F4F6F9] shadow dark:bg-gray-700`}
        >
          {timeValues.map((timer, index) => (
            <ul
              className="text-[14px] text-gray-700 dark:text-gray-200 list-none cursor-pointer"
              onClick={() => {
                setDropdown(!dropdown);
                setTimeLabel(timer.label);
                if (setEvent) {
                  setEvent((prev) => ({
                    ...prev,
                    startTime: timer.value,
                  }));
                }
                console.log(id, timer.value);
                if (setValue) {
                  setValue(id, timer.value);
                }
              }}
              key={index}
            >
              <li>
                <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {timer.label}
                </a>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeInput;
