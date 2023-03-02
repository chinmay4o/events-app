import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAuthenticatedRequest,
  postAuthenticatedRequest,
} from "../../utils/API/api.ts";
import profileImageColor from "../../utils/profileImageColor.json";
import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, savedUserConfig } = userDetails;
  const navigate = useNavigate();
  async function getAllSuggestions() {
    const data = await getAuthenticatedRequest("/user/suggested-connections");
    setSuggestions(data.data.suggestedConnections);
  }

  useEffect(() => {
    getAllSuggestions();
  }, []);

  const addConnection = async (connectionId) => {
    if (connectionId === savedUserConfig?._id) {
      alert("You can not send connection request to yourself!");
    } else if (connectionId) {
      try {
        const res = await postAuthenticatedRequest("/user/send-request", {
          connectionUserId: connectionId,
        });
        getAllSuggestions();
      } catch (err) {
        window.alert("Could not send the request!");
      }
    }
  };
  //   console.log(suggestions, "suggestions");
  console.log(profileImageColor["A"], "=======");
  return (
    <div>
      <div className="font-[600] text-[18px] pl-[5px]">Suggestions</div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-[6px]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Search"
            required={true}
          ></input>
        </div>
      </form>
      {suggestions &&
        suggestions.map((connection, index) => (
          //   <div className="flex items-center py-2 border-b-[1px]">
          <div
            className="grid place-items-start items-center grid-cols-[50px_5fr_1fr] py-2 border-b-[1px]"
            onClick={() => navigate(`/connections/user?uid=${connection?._id}`)}
          >
            {connection?.profilePicture ? (
              <img
                src={connection.profilePicture || "/svgs/user.svg"}
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
            </div>
            {/* <div></div> */}
            <div
              className="justify-self-end"
              onClick={(event) => {
                event.stopPropagation();
                addConnection(connection._id);
              }}
            >
              <img src="/svgs/AddCircle.svg" alt="add" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Suggestions;
