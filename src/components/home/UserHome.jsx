import moment from "moment";
import { useEffect, useState } from "react";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";
// import QRCodeStyling from "qr-code-styling";
// import useQRCode from "../../../helper/hooks/useQRCode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAuthenticatedRequest,
  getRequest,
  postAuthenticatedRequest,
} from "../../utils/API/api.ts";

const UserHome = () => {
  const navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, savedUserConfig } = userDetails;

  async function acceptConnectionRequest(connectionUserId) {
    const response = await postAuthenticatedRequest("/user/accept-request", {
      connectionUserId: connectionUserId,
    });
    console.log(response);
    fetchUserSuggestedConnections();
  }

  async function getAllSuggestions() {
    const data = await getAuthenticatedRequest("/user/suggested-connections");
    setSuggestions(data.data.suggestedConnections);
  }

  async function fetchUserSuggestedConnections() {
    getAllSuggestions();

    const connectionRequests = await getAuthenticatedRequest(
      "/user/received-requests"
    );
    setConnectionRequests(
      connectionRequests?.data.user.connectionRequests.received
    );
  }

  useEffect(() => {
    async function fetchEvents() {
      // let response;
      try {
        // const response = await getAuthenticatedRequest(`/user/events`);
        // if (response.data.length > 0) {
        //   setIsOrganizer(true);
        //   setEvent(response.data[0]);
        // } else {
        const response = await getRequest(
          "/anonymous/events?timeline=upcoming"
        );
        setEvent(response.data[0]);
        // }
      } catch (err) {
        console.log(err);
        const response = await getRequest(
          "/anonymous/events?timeline=upcoming"
        );
        setEvent(response.data[0]);
      }
    }
    fetchUserSuggestedConnections();
    fetchEvents();
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
  return (
    <div className="grid grid-rows-auto mt-[10px] gap-[8px] px-[16px] ">
      {savedUserConfig?._id ? (
        <div className="h-[120px] flex justify-between items-start">
          <div>
            {savedUserConfig?.profilePicture ? (
              <img
                src={savedUserConfig.profilePicture}
                className="h-[60px] w-[60px] rounded-[50%] object-cover"
              />
            ) : savedUserConfig?.firstName ? (
              <DefaultProfilePicture
                firstName={savedUserConfig.firstName}
                lastName={savedUserConfig.lastName}
                style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              />
            ) : (
              []
            )}
            <div className="text-[20px] font-[600] pt-2">
              Greetings {savedUserConfig.firstName} 👋 😊
            </div>
            <div className="text-[14px] font-[500] text-gray-500">
              Here is what you can do today
            </div>
          </div>
          <img
            src="/svgs/scanner.svg"
            alt="Scanner"
            className="h-[50px] w-[50px] cursor-pointer relative right-0"
            onClick={() => navigate("/profile/qr")}
          />
          {/* <div ref={ref}></div> */}
        </div>
      ) : (
        []
      )}
      <span className="font-[600] text-[15px] mt-[20px]">Your Events</span>
      <div
        className="cursor-pointer relative h-[170px] -top-[5px]"
        onClick={() => {
          if (isOrganizer) {
            navigate(`/events/${event._id}?show=eventInfo`);
          } else {
            navigate(`/home/events?eventId=${event._id}`);
          }
        }}
      >
        <div className="flex justify-between w-full items-center absolute top-2.5 font-bold text-[20px] text-white">
          <div className="pl-2.5">{event?.title}</div>
          {isOrganizer ? (
            <div className="w-[91px] flex justify-center items-center gap-x-[5px] rounded-xl h-6 text-white text-sm bg-[#14A2F2] text-center mr-2.5">
              <div>Organizer</div>
              <img src="/svgs/grade.svg" alt="Star" />
            </div>
          ) : (
            []
          )}
        </div>
        <div className="w-auto bg-[#F4F6F9] rounded-xl text-black px-3 py-1 mb-1 font-semibold absolute bottom-[10px] ml-1 text-[11px]">
          {moment(event?.startDate).format("LLL")}
        </div>
        <div className="grid place-items-center w-full mx-auto h-[170px] object-cover">
          <img
            src={
              event?.coverImage ||
              "https://d2xqcdy5rl17k2.cloudfront.net/images/default-landing-banner.png"
            }
            alt="event Image"
            className="rounded-md w-full object-cover h-[157px] object-cover"
          />
        </div>
      </div>

      <div className="grid place-items-center grid-cols-[0.7fr_1fr_1fr] h-[65px]">
        <div className="flex flex-col items-center h-full">
          <span className="font-[600] text-[20px]">
            {event?.exhibitorAndSponsors?.length}
          </span>
          <span className="text-black text-opacity-50  font-[500] text-[14px]">
            exhibitors
          </span>
        </div>
        <div className="flex flex-col items-center h-full">
          <span className="font-[600] text-[20px]">
            {event?.speakers?.length}
          </span>
          <span className="text-black text-opacity-50 font-[500] text-[14px]">
            speakers
          </span>
        </div>
        <div className="flex flex-col items-center h-full">
          <span className="font-[600] text-[20px]">
            {event?.attendees?.length}
          </span>
          <span className="text-black text-opacity-50 font-[500] text-[14px]">
            registrations
          </span>
        </div>
      </div>
      {event?.speakers?.length == 0 && isOrganizer ? (
        <div className="h-[36px] flex items-center pl-2.5 rounded-[10px] bg-[#F4F6F9]">
          <p className="text-sm text-black text-opacity-50">
            <span className="text-black font-semibold opacity-100">Note:</span>{" "}
            Please add speakers for the event
          </p>
        </div>
      ) : (
        []
      )}
      <div className="w-full">
        <hr />
      </div>
      <div
        className="grid grid-cols-[1fr_5fr_1fr] items-center"
        onClick={() => {
          navigate(`/home/events?eventId=${event._id}`);
        }}
      >
        <div className="w-[45px] h-[45px] rounded-[60px] bg-[#BEE8FF]"></div>
        <div className="pl-2.5 flex flex-col justify-between">
          <span className="font-semibold text-[14px]">Event Schedule</span>
          {/* <span className="font-medium text-black text-[12px] text-opacity-50">
            Next meeting: 23 Nov, 2022
          </span> */}
          <span></span>
        </div>
        {/* <img src="/svgs/arrow.svg" className="rotate-90" alt="UpArrow" /> */}
        <i className="fa-solid fa-arrow-right text-primary"></i>
      </div>
      <div className="w-full">
        <hr />
      </div>
      <div className="min-w-[312px] max-w-[422px] md:max-w-full">
        <div className="text-[14px] overflow-x-scroll font-[500] pt-[10px]">
          Suggested Connections
        </div>
        {/* style carousel */}
        <div className="flex connections w-full mt-[10px] overflow-x-scroll">
          {suggestions && suggestions.length > 0
            ? suggestions.map((user, index) => (
                <div
                  key={index}
                  className={`flex h-[150px] ${
                    index !== 0 ? "ml-5" : ""
                  } relative`}
                >
                  <div className="flex w-[127px] flex-col items-center">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture ?? `/svgs/profile.svg`}
                        alt="user"
                        className="h-[50px] w-[50px] rounded-[50%] object-cover"
                      />
                    ) : (
                      <DefaultProfilePicture
                        firstName={user.firstName}
                        lastName={user.lastName}
                      />
                    )}
                    <p className="font-medium text-sm mt-2.5">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="font-medium text-[10px] mt-1.5 text-black text-center text-opacity-50">
                      {user.jobTitle}
                      {user.jobTitle && user.organization ? ", " : ""}
                      {user.organization}
                    </p>
                    <button
                      className="absolute bottom-[13px] w-[90px] h-6 mt-2.5 rounded-[4px] bottom-0 bg-primary font-bold text-[10px] text-white"
                      onClick={() => {
                        addConnection(user._id);
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="border-l border-[#E1E4E8] ml-5"></div>
                </div>
              ))
            : []}
        </div>
      </div>
      <div className="pb-[14px] mt-[10px]">
        <p className="font-[500] text-[14px] pt-[15px]">
          New Connection Requests{" "}
          {connectionRequests.length > 5 ? (
            <span className="text-blue-500">See all</span>
          ) : (
            []
          )}
        </p>
      </div>
      <div className="mb-[20px]">
        {connectionRequests && connectionRequests.length > 0 ? (
          connectionRequests.map((user, index) => (
            <div className="flex w-full h-[78px]" key={index}>
              <img
                src={
                  user?.profilePicture
                    ? user?.profilePicture
                    : "/svgs/profile.svg"
                }
                alt="User"
                className="h-[50px] w-[50px] rounded-[50%] object-cover"
              />
              <div className="flex pl-2.5 flex-col">
                <p className="font-medium text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <p className="font-medium text-sm text-black text-opacity-50">
                  {user.jobTitle}
                  {user.jobTitle && user.organization ? ", " : ""}
                  {user.organization}
                </p>
                <div className="flex gap-x-1.5 font-bold">
                  <button
                    className="w-[90px] text-[10px] h-6 bg-primary text-white rounded-[4px]"
                    onClick={() => acceptConnectionRequest(user._id)}
                  >
                    Accept
                  </button>
                  <button className="w-[90px] text-[10px] text-[#C5C5C7] h-6 bg-[#F4F6F9] rounded-[4px]">
                    Not Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[12px] font-[500] text-slate-400 text-center">
            0 connection requests
          </p>
        )}
      </div>
    </div>
  );
};

export default UserHome;
