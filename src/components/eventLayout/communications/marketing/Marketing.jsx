import React from "react";
import { useNavigate, useMatch } from "react-router-dom";

function Marketing() {
  const navigate = useNavigate();
  const eventsId = useMatch("events/:eventId/*");

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You can use marketing channels to attract more attendees for your
        events.
      </p>
      <div className="my-4">
        <div
          className="flex items-center justify-between pb-2 border-b-2"
          onClick={() =>
            navigate(
              `/events/${eventsId.params.eventId}/communications/eventmarketing`
            )
          }
        >
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
            <p>Email marketing</p>
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
            <p>Whatsapp marketing </p>
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
            <p>SMS marketing </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
        <div
          className="flex items-center justify-between pb-2 border-b-2 cursor-pointer"
          onClick={() => {
            navigate(
              `/events/${eventsId.params.eventId}/communications/linkedin-marketing`
            );
          }}
        >
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
            <p>LinkedIn marketing </p>
          </div>
          <p className="p-3 text-gray-500 text-l">{">"}</p>
        </div>
      </div>
    </>
  );
}

export default Marketing;
