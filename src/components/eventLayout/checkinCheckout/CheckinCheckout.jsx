import React, { useState } from "react";
import { useSelector } from "react-redux";
import CheckinAnalytics from "./CheckinAnalytics";
import CheckinAttendees from "./checkinAttendees/CheckinAttendees";

function CheckinCheckout() {
  const [activeTab, setActiveTab] = useState("marketing-tab");
  const [eventTitle, setEventTitle] = useState("");

  return (
    <div className="pt-14 md:pt-0 md:mb-0 mx-auto grid place-items-center min-w-[312px] max-w-[422px] w-full md:max-w-[1440px] md:w-full mb-14">
      <div className="flex flex-col items-center mt-3 md:w-[85%] w-[95%]">
        <div className="text-[27px] font-[600] bottom-2">{eventTitle}</div>
        <div className="text-[18px] font-[500] mt-[15px]">Registrations</div>
        <div
          className="my-4 border-b border-gray-200 dark:border-gray-700"
          style={{ maxWidth: "400px", width: "50%" }}
        >
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <li className="mr-2" role="presentation" style={{ width: "40%" }}>
              <button
                className={`inline-block px-4 py-1 rounded-t-lg border-b-2  ${
                  activeTab === "notifications-tab"
                    ? "text-primary hover:text-primary dark:text-blue-500 dark:hover:text-blue-500 border-primary dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 : hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                }`}
                style={{ width: "100%" }}
                id="notifications-tab"
                data-tabs-target="#notifications"
                type="button"
                role="tab"
                aria-controls="notifications"
                aria-selected="true"
                onClick={() => setActiveTab("notifications-tab")}
              >
                Analytics
              </button>
            </li>
            <li className="mr-2" role="presentation" style={{ width: "40%" }}>
              <button
                className={`inline-block px-4 py-1 rounded-t-lg border-b-2  ${
                  activeTab === "marketing-tab"
                    ? "text-primary hover:text-primary dark:text-blue-500 dark:hover:text-blue-500 border-primary dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 : hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                }`}
                style={{ width: "100%" }}
                id="marketing-tab"
                data-tabs-target="#marketing"
                type="button"
                role="tab"
                aria-controls="marketing"
                aria-selected="false"
                onClick={() => setActiveTab("marketing-tab")}
              >
                Attendees
              </button>
            </li>
          </ul>
        </div>
        <div
          id="myTabContent"
          className="w-[98%] sm:w-[90%] md:w-[90%]"
          // style={{ maxWidth: "700px", width: "70%" }}
        >
          <div
            className={`${
              activeTab !== "notifications-tab" ? "hidden" : ""
            } p-4 `}
            id="notifications"
            role="tabpanel"
            aria-labelledby="notifications-tab"
          >
            <CheckinAnalytics />
          </div>
          <div
            className={`${activeTab !== "marketing-tab" ? "hidden" : ""} px-4 `}
            id="marketing"
            role="tabpanel"
            aria-labelledby="marketing-tab"
          >
            <CheckinAttendees setEventTitle={setEventTitle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckinCheckout;
