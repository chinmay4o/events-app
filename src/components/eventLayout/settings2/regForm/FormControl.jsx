import { Controller, useForm, useFormContext } from "react-hook-form";
import { CustomFieldData } from "../regFormTypes.ts";
import Select from "../../../../common/inputElements/Select";
import { useState } from "react";

export const FormControl = ({
  inputType,
  fieldName,
  defaultValue,
  label,
  options = [],
  config = {},
  showIcons = true,
  width,
}) => {
  const { register, setValue } = useFormContext();
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiplValue, setMultiplValue] = useState([]);
  //landing page custom form fields
  switch (inputType) {
    case "text":
      return (
        // <div className="flex items-center justify-between">
        //   <img
        //     src="/svgs/menu.svg"
        //     alt="menu"
        //     className={`w-6 h-6 mr-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        //   <input
        //     type="text"
        //     id={fieldName}
        //     className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        //     placeholder={label}
        //     {...register(fieldName, config)}
        //   />
        //   <img
        //     src="/svgs/Settings.svg"
        //     alt="menu"
        //     className={`w-6 h-6 ml-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        // </div>
        <div className="relative mb-[28px]">
          <input
            type="text"
            id={fieldName}
            className={`${
              width ? `w-[${width}]` : "w-full"
            } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            // placeholder={label}
            {...register(fieldName, config)}
          />
          <label
            htmlFor={fieldName}
            className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
          >
            {label}
          </label>
        </div>
      );
    case "phoneNumber":
      return (
        // <div className="flex items-center justify-between">
        //   <img
        //     src="/svgs/menu.svg"
        //     alt="menu"
        //     className={`w-6 h-6 mr-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        //   <input
        //     id={fieldName}
        //     type="tel"
        //     {...register(fieldName, {
        //       ...config,
        //       // validate: (value) => value === "1",
        //     })}
        //     pattern="[6-9]\d{9}"
        //     defaultValue={defaultValue}
        //     className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        //   />
        //   <img
        //     src="/svgs/Settings.svg"
        //     alt="menu"
        //     className={`w-6 h-6 ml-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        // </div>
        <div className="relative mb-[28px]">
          <input
            type="tel"
            id={fieldName}
            className={`${
              width ? `w-[${width}]` : "w-full"
            } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            // placeholder={label}
            {...register(fieldName, { ...config })}
            pattern="[6-9]\d{9}"
          />
          <label
            htmlFor={fieldName}
            className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
          >
            {label}
          </label>
        </div>
      );
    case "email":
      return (
        // <div className="flex items-center justify-between">
        //   <img
        //     src="/svgs/menu.svg"
        //     alt="menu"
        //     className={`w-6 h-6 mr-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        //   <input
        //     id={fieldName}
        //     type="email"
        //     {...register(fieldName, config)}
        //     defaultValue={defaultValue}
        //     className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        //   />
        //   <img
        //     src="/svgs/Settings.svg"
        //     alt="menu"
        //     className={`w-6 h-6 ml-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        // </div>
        <div className="relative mb-[28px]">
          <input
            type="email"
            id={fieldName}
            className={`${
              width ? `w-[${width}]` : "w-full"
            } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            // placeholder={label}
            {...register(fieldName, config)}
          />
          <label
            htmlFor={fieldName}
            className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
          >
            {label}
          </label>
        </div>
      );
    case "url":
      return (
        // <div className="flex items-center justify-between">
        //   <img
        //     src="/svgs/menu.svg"
        //     alt="menu"
        //     className={`w-6 h-6 mr-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        //   <input
        //     id={fieldName}
        //     type="url"
        //     {...register(fieldName, config)}
        //     defaultValue={defaultValue}
        //     className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        //   />
        //   <img
        //     src="/svgs/Settings.svg"
        //     alt="menu"
        //     className={`w-6 h-6 ml-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        // </div>
        <div className="relative mb-[28px]">
          <input
            type="url"
            id={fieldName}
            className={`${
              width ? `w-[${width}]` : "w-full"
            } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            // placeholder={label}
            {...register(fieldName, config)}
          />
          <label
            htmlFor={fieldName}
            className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
          >
            {label}
          </label>
        </div>
      );
    case "select": {
      return (
        <div className="relative mb-[28px]">
          <label
            htmlFor={fieldName}
            className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
          >
            {label}
          </label>
          <select
            id={fieldName}
            name={fieldName}
            {...register(fieldName, config)}
            className={`${
              width ? `w-[${width}]` : "w-full"
            } peer bg-white border border-gray-300 text-gray-900 text-[11px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block px-2.5 py-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          >
            {/* <option selected>Choose a country</option>
<option value="US">United States</option> */}
            {options.map((o, index) => (
              <option key={index} value={o.value} className="text-[14px]">
                {o.label}
              </option>
            ))}
          </select>
        </div>
        // <select
        //   {...register(fieldName, config)}
        //   defaultValue={defaultValue}
        //   name={fieldName}
        //   id={fieldName}
        // >
        //   {options.map((o, index) => (
        //     <option key={index} value={o.value}>
        //       {o.label}
        //     </option>
        //   ))}
        // </select>
        // <Select
        //   register={register}
        //   options={options}
        //   value={options[0]}
        //   onChange={(o) => {
        //     // const value = getValues("type");
        //     // setInputType(o);
        //   }}
        // />
      );
    }
    case "multi-select": {
      return (
        <>
          <div className="relative inline-block text-base w-full mb-[28px]">
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {label}
            </label>

            <div
              className="selected-options flex flex-wrap items-center gap-2  rounded min-w-[8rem] min-h-[35px] bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg font-medium p-1"
              onClick={() => setMultiSelect(!multiSelect)}
            >
              {multiplValue.map((option) => (
                <div
                  key={option._id}
                  className="flex items-center bg-white border text-gray-700 rounded px-2 py-0 m-0 text-[14px] h-[25px]"
                >
                  {option.label}

                  <button
                    type="button"
                    onClick={() => {
                      const updatedVal = multiplValue.filter(
                        (value) => value._id !== option._id
                      );
                      setValue(fieldName, updatedVal);
                      setMultiplValue(updatedVal);
                    }}
                    className="ml-2 bg-transparent border-none text-gray-700 text-xl cursor-pointer"
                  >
                    <img src="/svgs/Cross.svg" alt="cross" />
                  </button>
                </div>
              ))}
            </div>

            {multiSelect && (
              <div className="relative ">
                <select
                  multiple={true}
                  id={fieldName}
                  name={fieldName}
                  className="absolute top-full left-0 right-0 z-10 w-full  overflow-y-auto bg-white border border-gray-400 rounded p-1 text-[14px] appearance-none h-[75px]"
                >
                  {options.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                      disabled={multiplValue.includes(option)}
                      className="py- px-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setMultiplValue([...multiplValue, option]);
                        setMultiSelect(false);
                        setValue(fieldName, [...multiplValue, option]);
                      }}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <input
              type="hidden"
              id={fieldName}
              name={fieldName}
              value={multiplValue.map((value) => value.label)}
              {...register(fieldName, config)}
            />
          </div>

          {/* <div className="border absolute bg-white w-full z-10 cursor-pointer pl-2 text-gray-900 text-[14px] font-medium">
              Data
            </div> */}
          {/* <option selected>Choose a country</option>
  <option value="US">United States</option> */}
          {/* {options.map((o, index) => (
                <option key={index} value={o.value} className="text-[14px]">
                  {o.label}
                </option>
              ))} 
          </div> */}
        </>
      );
    }
    case "number":
      return (
        // <div className="flex items-center justify-between">
        //   <img
        //     src="/svgs/menu.svg"
        //     alt="menu"
        //     className={`w-6 h-6 mr-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        //   <input
        //     type="number"
        //     id={fieldName}
        //     {...register(fieldName, config)}
        //     defaultValue={defaultValue}
        //     placeholder={label}
        //     className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        //   />
        //   <img
        //     src="/svgs/Settings.svg"
        //     alt="menu"
        //     className={`w-6 h-6 ml-2 ${!showIcons ? "hidden" : ""}`}
        //   />
        // </div>
        <div className="relative mb-[28px]">
          <input
            type="number"
            id={fieldName}
            className={`${
              width ? `w-[${width}]` : "w-full"
            } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            {...register(fieldName, config)}
          />
          <label
            htmlFor={fieldName}
            className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
          >
            {label}
          </label>
        </div>
      );
    case "checkbox":
      return (
        <>
          {/* <input
            type="checkbox"
            id={fieldName}
            {...register(fieldName, config)}
          ></input>
          <label htmlFor={fieldName}>{label}</label>
          <br></br> */}
          <p className="text-[13px] font-[500] text-primary mb-[30px] -mt-[10px] w-[380px] ">
            {/* <span className="inline-block w-[283px] text-[#a0a0a0]">
              {label}
              </span> */}
            {/* <label
                htmlFor="default-toggle"
                className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  {...register(fieldName, config)}
                />
                <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                </span>
              </label> */}
            <input
              type="checkbox"
              id={fieldName}
              className="mr-2 border border-[#cacaca] border-2 bg-white checked:bg-primary checked:border-[#EBEEF2] cursor-pointer focus:ring-0"
              // checked
              {...register(fieldName, { ...config })}
            />
            <label
              htmlFor={fieldName}
              className="inline-block ml-[0px] text-[#a0a0a0] cursor-pointer"
            >
              {label}
            </label>
            {/* <span className="inline-block ml-[0px] text-[#a0a0a0]">
              {label}
            </span> */}
          </p>
        </>
      );
    case "file":
      return (
        <>
          <input
            id={fieldName}
            type="file"
            {...register(fieldName, config)}
            style={{ height: "50px" }}
          />
        </>
      );
    default:
      return <input type="text" />;
  }
};
