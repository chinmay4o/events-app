import React from "react";

function TextInputP({
  label,
  id,
  placeholder,
  required,
  type,
  register,
  pattern,
  minLength,
  disabled = false,
  width = null,
  maxLength,
  ...props
}) {
  return (
    <div className={props.mb? `relative mb-${props.mb}` : `relative mb-[28px]`}>
      <input
        type={type}
        id={id}
        className={`${width ? `w-[${width}]` : "w-full"} peer bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg h-[35px] placeholder-transparent focus:ring-transparent focus:border-primary focus:border-[1.2px] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-medium dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
        {...register(id, {
          required: required,
          pattern: pattern,
          minLength: +minLength,
          maxLength: new Number(maxLength),
        })}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
      >
        {label}
      </label>
      {props.errors?.email ? (
        <p className="error_input_text_form">
          {props.errors.email?.type === "pattern" && "Email is invalid"}
          {props.errors.email?.type === "required" && "Email is required"}
        </p>
      ) : null}
      {/* {props.errors?.firstName ? (
        <p className="error_input_text_form">
          {props.errors.email?.type === "required" && "First Name is required"}
        </p>
      ) : null} */}
    </div>
  );
}

export default TextInputP;
