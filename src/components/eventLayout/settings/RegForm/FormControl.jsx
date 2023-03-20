import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
// import { CustomFieldData } from "./regFormTypes.ts";

export const FormControl = ({
  inputType,
  fieldName,
  defaultValue,
  label,
  width,
  options = [],
  config = {},
}) => {
  const { register, setValue } = useFormContext();
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiplValue, setMultiplValue] = useState([]);
  switch (inputType) {
    case "text":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
            <input
              type="text"
              id={fieldName}
              className={`${
                width ? `w-[${width}]` : "w-[300px]"
              } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              // placeholder={label}
              {...register(fieldName, config)}
            />
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "phoneNumber":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
            <input
              type="tel"
              id={fieldName}
              className={`${
                width ? `w-[${width}]` : "w-[300px]"
              } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              // placeholder={label}
              {...register(fieldName, { ...config })}
              pattern="[6-9]\d{9}"
            />
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "email":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
            <input
              type="email"
              id={fieldName}
              className={`${
                width ? `w-[${width}]` : "w-[300px]"
              } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              // placeholder={label}
              {...register(fieldName, config)}
            />
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "url":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
            <input
              type="url"
              id={fieldName}
              className={`${
                width ? `w-[${width}]` : "w-[300px]"
              } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              // placeholder={label}
              {...register(fieldName, config)}
            />
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "select": {
      return (
        <div className=" flex mb-[30px] items-center w-[400px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className={`${width ? `w-[${width}]` : "w-[300px]"} relative`}>
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
            <select
              id={fieldName}
              name={fieldName}
              {...register(fieldName, config)}
              className={`${
                width ? `w-[${width}]` : "w-[300px]"
              } peer bg-white border border-gray-300 text-gray-900 text-[11px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block px-2.5 py-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              {options.map((o, index) => (
                <option key={index} value={o.value} className="text-[14px]">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
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
        <div className=" flex mb-[30px] items-center w-[400px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className={`${width ? `w-[${width}]` : "w-[300px]"} relative`}>
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
            <div
              className="selected-options flex flex-wrap items-center gap-2  rounded min-w-[8rem] min-h-[35px] bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={() => setMultiSelect(!multiSelect)}
            >
              {multiplValue.map((option) => (
                <div
                  key={option._id}
                  className="flex items-center bg-white border text-gray-700 rounded px-2 py-0 m-0 text-[14px] h-[25px]  "
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={() => {
                      const updatedVal = multiplValue.filter(
                        (value) => value._id !== option._id
                      );
                      setValue(fieldName, multiplValue);
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
                  {...register(fieldName, config)}
                  id={fieldName}
                  name={fieldName}
                  // onChange={() => setValue(fieldName, multiplValue)}
                  className="appearance-none absolute top-full left-0 right-0 z-10 w-full  overflow-y-auto bg-white border border-gray-400 rounded p-1 text-[14px] h-[75px] "
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
            {/* <Select
              multiple
              register={register}
              id={fieldName}
              options={options}
              value={selectValue}
              onChange={(event) => {
                setValue("selectMulti", event);
                setSelectValue(event);
              }}
            /> */}
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>

        // <div className="flex items-center justify-between mb-[30px]">
        //   <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
        //   <div className="relative">
        //     <label
        //       htmlFor={fieldName}
        //       className="block mb-[5px] text-sm font-medium text-gray-400 dark:text-white -mt-[20px]"
        //     >
        //       {label}
        //     </label>
        //     <select
        //       id={fieldName}
        //       multiple
        //       onChange={(e) => {
        //         console.log(e.target.value);
        //       }}
        //       className={`${
        //         width ? `w-[${width}]` : "w-[300px]"
        //       } peer bg-white border border-gray-300 text-gray-900 text-[11px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block px-2.5 py-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        //     >
        //       {options.map((o, index) => (
        //         <option key={index} value={o.value} className="text-[14px]">
        //           {o.label}
        //         </option>
        //       ))}
        //     </select>
        //   </div>
        //   <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        // </div>
      );
    }
    case "number":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
            <input
              type="number"
              id={fieldName}
              className={`${
                width ? `w-[${width}]` : "w-[300px]"
              } peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              // placeholder={label}
              {...register(fieldName, config)}
            />
            <label
              htmlFor={fieldName}
              className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
            >
              {config?.required ? (
                <>
                  {label}
                  <span className="text-red-500">*</span>
                </>
              ) : (
                label
              )}
            </label>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center justify-between mb-[30px]  w-[365px]">
          <img src="/svgs/Menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="text-[13px] font-[500] text-primary w-[350px] ">
            <input
              type="checkbox"
              id={fieldName}
              className="mr-2 border border-[#cacaca] border-2 bg-white checked:bg-primary checked:border-[#EBEEF2] cursor-pointer focus:ring-0"
              // checked
              {...register(fieldName, config)}
            />
            <label
              htmlFor={fieldName}
              className="inline-block ml-[0px] text-[#a0a0a0] cursor-pointer"
            >
              {label}
            </label>
          </div>
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
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
