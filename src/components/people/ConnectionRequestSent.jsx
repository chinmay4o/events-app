import React from "react";
import { useNavigate } from "react-router-dom";
import { postAuthenticatedRequest } from "../../utils/API/api.ts";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";

const ConnectionRequestSent = ({ connectionsSent }) => {
  console.log(connectionsSent, "connectionsSent");
  const navigate = useNavigate();
  const rejectConnectionRequest = async (connectionId) => {
    const response = await postAuthenticatedRequest("/user/unsend-request", {
      connectionUserId: connectionId,
    });
  };
  return (
    <div>
      <div className="font-[600] text-[24px]">Sent Requests</div>
      {/* <div></div> */}
      <form className="flex items-center my-4 w-full md:w-[335px]">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Search"
            required={true}
          ></input>
        </div>
      </form>
      {connectionsSent &&
        connectionsSent.map((connection, index) => (
          <div className="flex justify-between items-center border-b-[1px]">
            <div
              className="flex items-center py-2 "
              onClick={() =>
                navigate(`/connections/user?uid=${connection?._id}`)
              }
            >
              {connection?.profilePicture ? (
                <img
                  src={connection?.profilePicture || "/svgs/user.svg"}
                  className="h-[50px] w-[50px] rounded-[50px] object-cover"
                />
              ) : (
                <DefaultProfilePicture
                  firstName={connection.firstName}
                  lastName={connection.lastName}
                />
              )}
              <div className="ml-3">
                <div className="font-medium text-[12px]">
                  {connection.firstName} {connection.lastName}
                </div>
                <div className="font-medium text-sm text-black text-opacity-50">
                  {connection.jobTitle}
                  {connection.jobTitle && connection.organization ? ", " : ""}
                  {connection.organization}
                </div>
                <div>
                  {/* <button
                  onClick={() => {
                    acceptConnectionRequest(connection._id);
                  }}
                  className="bg-primary rounded-md px-4 py-1 text-white text-[10px] font-[700] mr-3"
                >
                  Accept
                </button> */}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                rejectConnectionRequest(connection._id);
              }}
              className="bg-primary rounded-md px-4 py-1 h-6 text-white text-[10px] font-[700] mr-3"
            >
              Unsend
            </button>
          </div>
        ))}
    </div>
  );
};

export default ConnectionRequestSent;
