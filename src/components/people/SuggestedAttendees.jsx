import React, { useEffect, useState } from "react";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";
import { getRequest } from "../../utils/API/api.ts";

const SuggestedAttendees = ({
  event,
  settrigger,
  setsingleAttendee,
  savedUserConfig,
  scheduledMeeting,
  sentMeetings,
  receivedMeetings,
}) => {
  const [attendeesData, setAttendeesData] = useState([]);
  const now = new Date().getTime();
  let eventEnded =
    new Date(
      new Date(event?.endDate).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    ).getTime() <= now;

  useEffect(() => {
    if (event?._id && event?.title) {
      getAllEventAttendees(`/attendee/${event?._id}?limit=0`);
    }
  }, [event, event?.title]);

  const getAllEventAttendees = async (route) => {
    const response = await getRequest(route);
    const usersCopy = [...response.data.attendees]; // Make a copy of the original array
    for (let i = usersCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usersCopy[i], usersCopy[j]] = [usersCopy[j], usersCopy[i]];
    }
    setAttendeesData(usersCopy.slice(0, 10));
  };
  const checkIfEmailExists = (email) => {
    return (
      scheduledMeeting?.some((obj) => obj.meetingWith[0]?.email === email) ||
      receivedMeetings?.some((obj) => obj.meetingWith[0]?.email === email) ||
      sentMeetings?.some((obj) => obj.meetingWith[0]?.email === email)
    );
  };
  return (
    <div className="md:w-[80%] md:flex flex-wrap ">
      {attendeesData?.length > 0 ? (
        attendeesData?.map((attendee, key) =>
          attendee?.email === savedUserConfig?.email ||
          checkIfEmailExists(attendee.email) ? (
            <></>
          ) : (
            <div className="mx-[16px]">
              <div
                key={key}
                className="bg-[#FFFFFF] mb-4 rounded-[10px] p-[16px] md:border md:w-[350px] mt-[10px]"
              >
                <div className="flex items-center">
                  {attendee.profilePicture ? (
                    <img
                      src={attendee.profilePicture}
                      className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
                    />
                  ) : (
                    <div className="mr-2">
                      <DefaultProfilePicture
                        firstName={attendee.firstName}
                        lastName={attendee.lastName}
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
                      {attendee.firstName} {attendee.lastName}
                    </div>
                    <div className="text-[12px] font-medium py-[0px] text-gray-500">
                      {attendee.jobTitle}, {attendee.organization}
                    </div>
                  </div>
                </div>

                {eventEnded || checkIfEmailExists(attendee.email) ? (
                  <button
                    type="button"
                    className={`flex items-center cursor-pointer text-[12px] font-[500] h-[32px] w-[100%] justify-center rounded-[4px] bg-primary md:w-[100%] mt-[25px] text-gray-100 opacity-50`}
                  >
                    Book a meeting
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`flex items-center cursor-pointer text-white text-[12px] font-[500] h-[32px] w-[100%] justify-center rounded-[4px] bg-primary md:w-[100%] mt-[25px]`}
                    onClick={() => {
                      setsingleAttendee(attendee);
                      settrigger(true);
                    }}
                  >
                    Book a meeting
                  </button>
                )}
              </div>
            </div>
          )
        )
      ) : (
        <div className="grid w-full place-items-center h-[250px] md:w-[65%]">
          <div>
            <img
              src="/svgs/nullState.svg"
              alt=""
              className="w-[200px] h-[200px]"
            />
            <p className="text-[15px] font-[500] text-[#717171]  text-center">
              Nothing here...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedAttendees;
