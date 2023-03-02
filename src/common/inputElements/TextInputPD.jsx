// @ts-nocheck
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";

import styles from "./Input.module.css";

const TextInputPD = ({
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
}) => {
  return (
    <div
      className={props.mb ? `relative mb-${props.mb}` : `relative mb-[28px]`}
    >
      <input
        type={type}
        id={id}
        className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
        // placeholder={placeholder}
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
        className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
      >
        {label}
      </label>
      {props.errors?.email ? (
        <p className="error_input_text_form">
          {props.errors.email?.type === "pattern" && "Email is invalid"}
          {props.errors.email?.type === "required" && "Email is required"}
        </p>
      ) : null}
    </div>
  );
};

export default TextInputPD;
