import { useFormContext } from "react-hook-form";
import { CustomFieldData } from "../regFormTypes.ts";
import Select from "../../../../common/inputElements/Select";

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
  const { register } = useFormContext();

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
        <Select
          register={register}
          options={options}
          value={options[0]}
          onChange={(o) => {
            // const value = getValues("type");
            // setInputType(o);
          }}
        />
      );
    }
    case "multi-select": {
      return (
        <>
          {/* // <select
        //   {...register(fieldName, config)}
        //   defaultValue={defaultValue}
        //   name={fieldName}
        //   id={fieldName}
        //   multiple
        // >
        //   {options.map((o, index) => (
        //     <option key={index} value={o.value}>
        //       {o.label}
        //     </option>
        //   ))}
        // </select> */}
          <div className="relative mb-[28px]">
            <label
              htmlFor={fieldName}
              className="block mb-[5px] text-sm font-medium text-gray-400 dark:text-white -mt-[20px]"
            >
              Select an option
            </label>
            <select
              id={fieldName}
              className={`${
                width ? `w-[${width}]` : "w-full"
              } peer bg-white border border-gray-300 text-gray-900 text-[11px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block px-2.5 py-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              // className="w-[400px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <p className="text-[13px] font-[500] text-primary mb-[30px] -mt-[20px] w-[380px]">
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
              className="accent-pink-300 focus:accent-pink-500"
              // checked
              {...register(fieldName, config)}
            />
            <span className="inline-block ml-[20px] text-[#a0a0a0]">
              {label}
            </span>
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
