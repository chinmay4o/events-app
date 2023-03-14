import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import SecondaryButton from "../../common/buttons/SecondaryButton";
import { postAuthenticatedRequest } from "../../utils/API/api.ts";

const UserNotConnection = ({ connection, savedUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [user, setUser] = useState();
  const eventsId = useMatch("userprofile/*");
  const navigate = useNavigate();
  useEffect(() => {
    setUser(connection);
    if (
      connection?._id &&
      savedUser?._id &&
      connection.connectionRequests.received.includes(savedUser._id) &&
      savedUser.connectionRequests.sent.includes(connection._id)
    ) {
      setIsRequestSent(true);
    }
  }, [connection, savedUser?._id]);

  const addConnection = async () => {
    if (eventsId.params.uid === savedUser?._id) {
      alert("You can not send connection request to yourself!");
    } else if (eventsId.params.uid) {
      try {
        const res = await postAuthenticatedRequest("/user/send-request", {
          connectionUserId: eventsId.params.uid,
        });
        setShowModal(true);
      } catch (err) {
        window.alert("Could not send the request!");
      }
    }
  };
  return (
    <div className="w-[324px] md:hidden mx-auto mt-10 ">
      <div className="flex flex-col">
        <div>
          <img
            src={
              user?.profilePicture
                ? `${user?.profilePicture}`
                : "/svgs/profile.svg"
            }
            alt="user"
            className="w-[120px] h-[120px] rounded-[50%] object-cover"
          />
        </div>
        <span className="font-[600] text-[20px] text-[#1C1C1E] mt-2.5">
          {user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1)}{" "}
          {user?.lastName}
        </span>
        {user?.organization && user?.jobTitle && (
          <span className="font-medium text-[14px] text-black text-opacity-50 mt-2">
            {user.jobTitle}, {user.organization}
          </span>
        )}
        {/* <span className="font-medium text-[14px] text-black text-opacity-50 mt-2">
          Mumbai, Maharashtra
        </span> */}
        <span className="font-bold text-[14px] text-black text-opacity-50 mt-2">
          {user?.userConnections?.length}{" "}
          {user?.userConnections?.length == 1 ? "connection" : "connections"}
        </span>
        <span className="font-medium text-[14px] text-black mt-5">About</span>
        <span className="font-medium text-[12px] text-[#1C1C1E] text-opacity-50 mt-2.5 min-h-[40px]">
          {user?.bio ?? "Not available"}
        </span>
        <div className="flex mt-2.5 items-center gap-x-1">
          <img src="/svgs/Email.svg" alt="email" className="w-6 h-6" />
          <span className="font-medium text-sm text-black text-opacity-50">
            {user?.email}
          </span>
        </div>
        <div className="flex mt-2.5 items-center gap-x-1">
          <img src="/svgs/Call.svg" alt="cal" className="w-6 h-6" />
          <span className="font-medium text-sm text-black text-opacity-50">
            {user?.mobile ?? "Not available"}
          </span>
        </div>
        <div className="flex gap-x-4 mt-2.5">
          <a
            href={
              user?.linkedinUrl
                ? `${user.linkedinUrl}`
                : "https://www.linkedin.com/"
            }
            target="_blank"
          >
            <img
              src="/svgs/LinkedIn.svg"
              alt="cal"
              className="w-[21px] h-6 cursor-pointer"
            />
          </a>
        </div>
        <div className="mt-5">
          {!isRequestSent ? (
            <input
              type="submit"
              className="primary_submit"
              value="Add Connection"
              onClick={() => {
                addConnection();
              }}
            />
          ) : (
            <SecondaryButton
              btnText={"Request Pending"}
              onClick={() => {
                // setShowModal(false);
              }}
            />
          )}
        </div>
        <span
          className="go_back_btn relative top-[25px]"
          onClick={() => navigate("/people")}
        >
          <i className="fa-solid fa-arrow-left"></i> Go Back
        </span>
        {showModal && (
          <div className="bg-black bg-opacity-50 fixed inset-0 z-50 w-full h-full  flex justify-center items-center px-1">
            <div className="grid grid-rows-2 place-items-center gap-[15px] bg-white max-w-sm md:max-w-md py-6 px-8 rounded shadow-xl text-gray-800">
              <h4 className="text-[14px] text-center font-[500]">
                Connection Request Sent!!
              </h4>
              <span
                className="go_back_btn mt-[15px]"
                onClick={() => navigate("/people")}
              >
                <i className="fa-solid fa-arrow-left"></i> Go Back
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotConnection;

{
  /* <a href="https://www.instagram.com/" target="_blank">
            <img
              src="/svgs/Instagram.svg"
              alt="cal"
              className="w-[21px] h-6 cursor-pointer"
            />
          </a>
          <a href="https://www.twitter.com/" target="_blank">
            <img
              src="/svgs/Twitter.svg"
              alt="cal"
              className="w-[21px] h-6 cursor-pointer"
            />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <img
              src="/svgs/Facebook.svg"
              alt="cal"
              className="w-[21px] h-6 cursor-pointer"
            />
          </a> */
}
