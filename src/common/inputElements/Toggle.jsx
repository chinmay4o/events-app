import React from "react";

function Toggle({
  isChecked,
  setIsChecked,
}) {
  return (
    <label
      htmlFor="checked-toggle"
      className="inline-flex relative items-center my-1 cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id="checked-toggle"
        className="sr-only peer"
        checked={isChecked}
        onClick={() => {
          setIsChecked(!isChecked);
        }}
      ></input>
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:primary dark:peer-focus:primary dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Checked toggle
      </span> */}
    </label>
  );
}

export default Toggle;
