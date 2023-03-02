import { useFormContext } from "react-hook-form";
import Select from "../../../../common/inputElements/Select";
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
  const { register } = useFormContext();

  switch (inputType) {
    case "text":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
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
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "phoneNumber":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
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
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "email":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
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
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "url":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
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
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
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
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
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
      );
    }
    case "number":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="relative">
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
          <img src="/svgs/Settings.svg" alt="menu" className="w-6 h-6 ml-2" />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center justify-between mb-[30px]">
          <img src="/svgs/menu.svg" alt="menu" className="w-6 h-6 mr-2" />
          <div className="text-[13px] font-[500] text-primary w-[300px]">
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
