import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Connections from "./Connections";
import Suggestions from "./Suggestions";
import ConnectionRequests from "./ConnectionRequests";
import ConnectionRequestSent from "./ConnectionRequestSent";
import { getAuthenticatedRequest } from "../../utils/API/api.ts";

const PeopleCompo = () => {
  const [activeTab, setActiveTab] = useState("announcements-tab");
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [connectionsSent, setConnectionsSent] = useState([]);

  const [connections, setConnections] = useState([]);
  const event = useSelector((state) => state.eventData);
  useEffect(() => {
    async function fetch() {
      const connectionRequests = await getAuthenticatedRequest(
        "/user/received-requests"
      );
      console.log(connectionRequests, "connectionRequests");
      setConnectionRequests(
        connectionRequests?.data.user.connectionRequests.received
      );
      setConnectionsSent(connectionRequests?.data.user.connectionRequests.sent);
      setConnections(connectionRequests?.data.user.userConnections);
    }
    fetch();
  }, []);
  return (
    <div className="w-full md:w-[375px] md:ml-[30px] md:mt-[27px] px-[16px] md:px-[0px]">
      <div className="flex w-full md:w-[375px] mx-auto">
        <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
          {event.title}
        </span>
      </div>
      <div className="z-10 grid place-items-center w-full h-[46px] mt-0 mx-auto border-gray dark:border-gray-700 sticky top-[50px] bg-[#fff]">
        <ul
          className="flex overflow-x-auto scrollbar-hide max-w-[320px] xs:max-w-full flex-nowrap w-full mx-auto -mb-px text-sm font-medium text-center"
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
              Connections
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
              Requests
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
              Suggestions
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block px-4 py-1 rounded-t-lg border-b-2  ${
                activeTab === "request-sent-tab"
                  ? "text-primary hover:text-primary dark:text-blue-500 dark:hover:text-blue-500 border-primary dark:border-blue-500"
                  : "border-transparent hover:text-gray-600 : hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              }`}
              id="request-sent-tab"
              data-tabs-target="#requestSent"
              type="button"
              role="tab"
              aria-controls="requestSent"
              aria-selected="false"
              onClick={() => setActiveTab("request-sent-tab")}
            >
              Sent
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full mt-5 mx-auto">
        <div
          className={`${activeTab !== "notifications-tab" ? "hidden" : ""}`}
          id="notifications"
          role="tabpanel"
          aria-labelledby="notifications-tab"
        >
          <Connections connections={connections} />
        </div>
        <div
          className={`${activeTab !== "marketing-tab" ? "hidden" : ""} `}
          id="marketing"
          role="tabpanel"
          aria-labelledby="marketing-tab"
        >
          <ConnectionRequests connectionRequests={connectionRequests} />
        </div>
        <div
          className={`${activeTab !== "announcements-tab" ? "hidden" : ""} `}
          id="announcements"
          role="tabpanel"
          aria-labelledby="announcements-tab"
        >
          <Suggestions />
        </div>
        <div
          className={`${activeTab !== "request-sent-tab" ? "hidden" : ""} `}
          id="requestSent"
          role="tabpanel"
          aria-labelledby="request-sent-tab"
        >
          <ConnectionRequestSent connectionsSent={connectionsSent} />
        </div>
      </div>
    </div>
  );
};

export default PeopleCompo;
