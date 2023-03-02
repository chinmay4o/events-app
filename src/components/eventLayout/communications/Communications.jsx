import React, { useState } from "react";
import { useSelector } from "react-redux";
// import styles from "../Events.module.css";
import Announcements from "./Announcements";
import Marketing from "./Marketing";
import Notifications from "./Notifications";

function Communications() {
  const [activeTab, setActiveTab] = useState("notifications-tab");
  const event = useSelector((state) => state.eventData);
  return (
    <div className="w-full md:w-[375px] md:ml-[30px] md:mt-[27px]">
      <div className="flex w-[375px] md:w-[375px] mx-auto">
        <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
          {event.title}
        </span>
      </div>
      <div className="font-[600] w-[375px] mx-auto md:w-[375px] text-[19px] pt-2.5 text-[#585858]">
        Communications
      </div>
      <div className="w-[375px] mt-5 mx-auto border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap w-[375px] mx-auto -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block px-4 py-1 rounded-t-lg border-b-2  ${
                activeTab === "notifications-tab"
                  ? "text-primary hover:text-primary dark:text-blue-500 dark:hover:text-blue-500 border-primary dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 : hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              }`}
              id="notifications-tab"
              data-tabs-target="#notifications"
              type="button"
              role="tab"
              aria-controls="notifications"
              aria-selected="true"
              onClick={() => setActiveTab("notifications-tab")}
            >
              Notifications
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block px-4 py-1 rounded-t-lg border-b-2  ${
                activeTab === "marketing-tab"
                  ? "text-primary hover:text-primary dark:text-blue-500 dark:hover:text-blue-500 border-primary dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 : hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              }`}
              id="marketing-tab"
              data-tabs-target="#marketing"
              type="button"
              role="tab"
              aria-controls="marketing"
              aria-selected="false"
              onClick={() => setActiveTab("marketing-tab")}
            >
              Marketing
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block px-4 py-1 rounded-t-lg border-b-2  ${
                activeTab === "announcements-tab"
                  ? "text-primary hover:text-primary dark:text-blue-500 dark:hover:text-blue-500 border-primary dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 : hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              }`}
              id="announcements-tab"
              data-tabs-target="#announcements"
              type="button"
              role="tab"
              aria-controls="announcements"
              aria-selected="false"
              onClick={() => setActiveTab("announcements-tab")}
            >
              Announcements
            </button>
          </li>
        </ul>
      </div>
      <div className="w-[375px] mt-5 mx-auto">
        <div
          className={`${activeTab !== "notifications-tab" ? "hidden" : ""}`}
          id="notifications"
          role="tabpanel"
          aria-labelledby="notifications-tab"
        >
          <Notifications />
        </div>
        <div
          className={`${activeTab !== "marketing-tab" ? "hidden" : ""} p-4 `}
          id="marketing"
          role="tabpanel"
          aria-labelledby="marketing-tab"
        >
          <Marketing />
        </div>
        <div
          className={`${
            activeTab !== "announcements-tab" ? "hidden" : ""
          } p-4 `}
          id="announcements"
          role="tabpanel"
          aria-labelledby="announcements-tab"
        >
          <Announcements />
        </div>
      </div>
    </div>
  );
}

export default Communications;
