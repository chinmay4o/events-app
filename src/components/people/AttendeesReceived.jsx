import React from "react";

const AttendeesReceived = ({
  settrigger,
  isReschedule,
  setIsReschedule,
  receivedMeetings,
  deleteMeeting,
  setreceivedMeetings,
}) => {
  console.log(receivedMeetings);
  const acceptMeeting = async (user) => {
    const updatedReceived = receivedMeetings.map((meeting) => {
      if (meeting.meetingID === user.meetingID) {
        return { ...meeting, meetingStatus: "Accepted" };
      }
      return meeting;
    });

    setreceivedMeetings(updatedReceived);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Unauthorised User");
      }
      const meetingObj = {
        meetingID: user.meetingID,
        message: user.mettingMessage,
        date: user.meetingDate,
        time: user.meetingTime,
        meetingWith: user.sentBy[0]._id,
      };
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/accept-meeting`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...meetingObj,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw new Error();
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      {receivedMeetings?.length > 0 ? (
        receivedMeetings?.map((user) => {
          return (
            <div
              key={user._id}
              className="bg-[#FFFFFF] mb-4 rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[220px] mt-3"
            >
              <div className="flex items-center relative">
                {user.sentBy[0]?.profilePicture ? (
                  <img
                    src={user.sentBy[0]?.profilePicture}
                    className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
                  />
                ) : (
                  <div
                    className={`sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] rounded-full bg-${
                      ["red", "green", "blue", "yellow", "indigo"][
                        Math.floor(Math.random() * 5)
                      ]
                    }-500 flex items-center justify-center mr-2 text-white text-lg font-medium uppercase`}
                  >
                    {user.sentBy[0]?.firstName.slice(0, 1)}
                    {user.sentBy[0]?.lastName.slice(0, 1)}
                  </div>
                )}

                <div className="">
                  <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] md:font-semibold">
                    {user.sentBy[0]?.firstName} {user.sentBy[0]?.lastName}
                  </div>
                  <div className="text-[12px] font-medium py-[0px] text-gray-500">
                    {user.sentBy[0].jobTitle}, {user.sentBy[0].organization}
                  </div>
                </div>
              </div>
              <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 italic pb-2">
                {user?.mettingMessage.split("").length > 130 ? (
                  <>
                    {user?.mettingMessage.slice(0, 130)}
                    ...
                  </>
                ) : (
                  <> {user?.mettingMessage.slice(0, 130)}</>
                )}
              </div>
              <span className="text-[#727374] text-[12px] font-[500] flex ">
                {user.meetingDate} | {user.meetingTime}
              </span>
              <span className="text-[#727374] text-[12px] font-[500] flex my-3">
                <img
                  src="/svgs/Location.svg"
                  alt="location"
                  className="h-[18px] w-[18px] mx-[5px] ml-[-3px] "
                />
                Cubic #5, Networking Dorm
              </span>
              {user.meetingStatus === "Accepted" ? (
                <div className="text-[#2ECC71] text-[12px] font-[500] italic mt-[10px]">
                  Your meeting is successfully scheduled. Please check meeting
                  tab for more info.
                </div>
              ) : (
                <div className="mymd:mt-3 mt-1 flex justify-between">
                  <span
                    className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[500] text-[12px] border h-[32px] w-[30%] justify-center rounded-[4px] md:w-[140px]"
                    onClick={() => deleteMeeting(user, user.sentBy[0])}
                  >
                    Cancel
                  </span>

                  <span
                    className="flex items-center cursor-pointer text-[#1C1C1E] text-[12px] font-[500] text-[12px] border h-[32px] w-[30%] justify-center rounded-[4px] md:w-[140px]"
                    onClick={() => {
                      settrigger(true);
                      setIsReschedule(true);
                    }}
                  >
                    Reschedule
                  </span>
                  <span
                    className="flex items-center cursor-pointer text-white text-[12px] font-[500] text-[12px] h-[32px] w-[30%] justify-center rounded-[4px] bg-primary md:w-[140px]"
                    onClick={() => acceptMeeting(user)}
                  >
                    Accept
                  </span>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="grid w-full place-items-center h-[250px]">
          <div>
            <img
              src="/svgs/Meeting_Empty_State.svg"
              alt=""
              className="w-full h-[340px]"
            />
            <p className="text-[15px] font-[500] text-[#717171]  text-center">
              You haven't received any meeting requests yet.You can be the one
              to break the ice though!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AttendeesReceived;
