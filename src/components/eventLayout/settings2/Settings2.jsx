import React from "react";
import { useSelector } from "react-redux";
import styles from "../Events.module.css";

function Settings2() {
  const event = useSelector((state) => state.eventData);
  return (
    <div className="w-full md:w-[375px] md:ml-[30px] md:mt-[27px]">
      {/* <div className="flex w-[375px] md:w-[375px] mx-auto">
      <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
        {event.title}
      </span>
    </div> */}
      <div className="font-[600] w-[375px] mx-auto md:w-[375px] text-[19px] pt-2.5 text-[#585858]">
        Event Setup
      </div>
      <div className="my-4 w-[375px] mx-auto pb-[40px]">
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium">Registration Form Builder </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium">Ticket Templates </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium">Badge Templates </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium">Ticket Payment Config </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium">Event Theme Setup</p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium">Staff Management </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium text-[#FF992D]">Hide this Event </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div className="flex items-center justify-between pb-2 border-b-2">
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-6 h-6 m-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <p className="font-medium text-[#F15723]">Delete this Event </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
      </div>
    </div>
  );
}

export default Settings2;
