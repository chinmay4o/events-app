import React from "react";

function SmallTextInput({
  label,
  id,
  placeholder,
  required,
  type,
  register,
  pattern,
  minLength,
  disabled = false,
  maxLength,
  ...props
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="peer bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-lg h-[35px] w-[90%] placeholder-transparent focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...register(id, {
          required: required,
          pattern: pattern,
          minLength: minLength,
          maxLength: maxLength,
        })}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-[3px] mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[8px] peer-placeholder-shown:left-2 transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-sm font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

export default SmallTextInput;
