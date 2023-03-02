import React from "react";
import Flatpickr from "react-flatpickr";
import styles from "./Input.module.css";

function NewDatePicker({ align, isHalfWidth, setValue, id, label, minDate, maxDate, ...props }) {
  const options = {
    // mode: "range",
    static: true,
    monthSelectorType: "static",
    dateFormat: "M j, Y",
    defaultDate: [minDate? minDate : Date.now()],
    prevArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow:
      '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      instance.element.value = dateStr.replace("to", "-");
      const customClass = align ? align : "full";
      instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
    },
    onChange: (selectedDates, dateStr, instance) => {
      instance.element.value = dateStr.replace("to", "-");
      setValue(id, dateStr);
    },
    // onDestroy:(selectedDates, dateStr, instance) => { delete instance.calendar },
    minDate: minDate ? minDate : "today",
    maxDate: maxDate,
    // wrap: true,
    // maxDate: new Date().setDate(new Date().getDate() + 365),
  };

  return (
    <div className={`${isHalfWidth ? "w-[50%]" : "w-full"} relative`}>
      <Flatpickr
        className={`${styles.input} form-input pl-9 text-slate-500 hover:text-slate-600 font-medium w-full block`}
        options={options}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-sm font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
      >
        {label}
      </label>
      {/* <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 fill-current text-slate-500 ml-3"
          viewBox="0 0 16 16"
        >
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div> */}
    </div>
  );
}

export default NewDatePicker;
