import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import SecondaryButton from "../../common/buttons/SecondaryButton";
import UserActivity from "./UserActivity";
import UserConnections from "./UserConnection";
import UserConnectionsAbout from "./UserConnectionsAbout";
import UserMeetings from "./UserMeetings";
import UserNotes from "./UserNotes";

const UserConnection = ({ connection }) => {
  const [showComponent, setShowComponent] = useState("about");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setUser(connection);
  }, [connection?.firstName]);
  console.log("here");
  return (
    <div className="w-[324px] md:hidden mx-auto mt-10 ">
      <div className="flex flex-col">
        <div>
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              className="w-[120px] h-[120px] object-cover rounded-[60px]"
            />
          ) : (
            <img
              src="/svgs/user.svg"
              alt="user"
              className="w-[120px] h-[120px] object-cover rounded-[50px]"
            />
          )}
        </div>
        <span className="font-bold text-[24px] text-[#1C1C1E] mt-2.5">
          {user?.firstName} {user?.lastName}
        </span>

        <div className="flex justify-between text-sm font-medium  border-[#C5C5C7] mt-2.5">
          <div
            className={`${
              showComponent === "about"
                ? "text-primary border-b border-primary"
                : "text-[#C5C5C7]"
            } cursor-pointer`}
            onClick={() => setShowComponent("about")}
          >
            About
          </div>
          {/* <div
            className={`${
              showComponent === "connection"
                ? "text-primary border-b border-primary"
                : "text-[#C5C5C7]"
            } cursor-pointer`}
            onClick={() => setShowComponent("connection")}
          >
            Connection
          </div>
          <div
            className={`${
              showComponent === "activity"
                ? "text-primary border-b border-primary"
                : "text-[#C5C5C7]"
            } cursor-pointer`}
            onClick={() => setShowComponent("activity")}
          >
            Activity
          </div>
          <div
            className={`${
              showComponent === "meetings"
                ? "text-primary border-b border-primary"
                : "text-[#C5C5C7]"
            } cursor-pointer`}
            onClick={() => setShowComponent("meetings")}
          >
            Meetings
          </div>
          <div
            className={`${
              showComponent === "notes"
                ? "text-primary border-b border-primary"
                : "text-[#C5C5C7]"
            } cursor-pointer`}
            onClick={() => setShowComponent("notes")}
          >
            Notes
          </div> */}
        </div>
        {showComponent === "about" && <UserConnectionsAbout user={user} />}
        {showComponent === "connection" && <UserConnections />}
        {showComponent === "activity" && <UserActivity />}
        {showComponent === "meetings" && <UserMeetings />}
        {showComponent === "notes" && <UserNotes />}
      </div>
      <div className="mt-[30px] mb-[45px]">
        <div className="go_back_btn" onClick={() => navigate("/people")}>
          <i className="fa-solid fa-arrow-left"></i> Go Back
        </div>
      </div>
    </div>
  );
};

export default UserConnection;
