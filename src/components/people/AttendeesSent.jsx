import React, { useState } from "react";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";
import EditMeeting from "./EditMeeting";

const AttendeesSent = ({
  sentMeetings,
  deleteMeeting,
  setSentMeetings,
  event,
}) => {
  const [edit, setEdit] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [singleEditData, setsingleEditData] = useState([]);
  console.log(sentMeetings);
  return (
    <>
      {edit && (
        <EditMeeting
          singleAttendee={singleEditData.meetingWith[0]}
          meetingDetailSingle={singleEditData}
          event={event}
          setEdit={setEdit}
          edit={edit}
          meetingDetails={sentMeetings}
          setMeetingDetails={setSentMeetings}
          setReschedule={setReschedule}
          reschedule={reschedule}
        />
      )}
      <div className="mx-[16px] md:w-[80%] md:flex md:flex-wrap">
        {sentMeetings?.length > 0 ? (
          sentMeetings?.map((user) => {
            return (
              <div
                key={user._id}
                className="bg-[#FFFFFF] mb-4 rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[210px] mt-3 md:mr-[16px] "
              >
                <div className="flex items-center relative">
                  {user.meetingWith[0]?.profilePicture ? (
                    <img
                      src={user.meetingWith[0]?.profilePicture}
                      className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
                    />
                  ) : (
                    <div className="mr-2">
                      <DefaultProfilePicture
                        firstName={user.meetingWith[0]?.firstName}
                        lastName={user.meetingWith[0]?.lastName}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "300px",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  )}

                  <div className="">
                    <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] md:font-semibold">
                      {user.meetingWith[0]?.firstName}{" "}
                      {user.meetingWith[0]?.lastName}
                    </div>
                    <div className="text-[12px] font-medium py-[0px] text-gray-500">
                      {user.meetingWith[0].jobTitle},{" "}
                      {user.meetingWith[0].organization}
                    </div>
                  </div>
                </div>
                <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 italic pb-2">
                  {user?.meetingMessage.split("").length > 130 ? (
                    <>
                      {user?.meetingMessage.slice(0, 130)}
                      ...
                    </>
                  ) : (
                    <> {user?.meetingMessage.slice(0, 130)}</>
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
                      className="flex items-center cursor-pointer text-[#E74C3C] text-[12px] font-[500] text-[12px] border h-[32px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
                      onClick={() => {
                        deleteMeeting(user, user.meetingWith[0]);
                      }}
                    >
                      Cancel
                    </span>

                    <span
                      className="flex items-center cursor-pointer text-[#1C1C1E] text-[12px] font-[500] text-[12px] border h-[32px] w-[45%] justify-center rounded-[4px] md:w-[140px]"
                      // onClick={() => {
                      //   setsingleAttendee(user.meetingWith[0]);
                      //   settrigger(true);
                      //   setIsEdit(true);
                      // }}
                      onClick={() => {
                        setsingleEditData(user);
                        setEdit(true);
                      }}
                    >
                      Edit request
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="grid w-full place-items-center h-[250px] md:w-[65%]">
            <div>
              <img
                src="/svgs/Meeting_Empty_State.svg"
                alt=""
                className="w-full h-[340px]"
              />
              <p className="text-[15px] font-[500] text-[#717171]  text-center">
                You haven't sent any meeting requests yet. There's always a
                first one though!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendeesSent;
