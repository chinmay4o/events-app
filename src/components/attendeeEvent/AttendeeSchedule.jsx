import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";

const AttendeeSchedule = ({ singleEvent }) => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  console.log(singleEvent);
  useEffect(() => {
    const schedule = singleEvent.schedule;
    let allSessions = [];
    if (schedule?.length > 0) {
      schedule.forEach((day) => {
        allSessions = [...allSessions, ...day.sessions];
      });
      setSchedule(allSessions);
    }
  }, [singleEvent]);
  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] pb-[80px] md:ml-[17%] md:w-[83%] md:bg-white md:min-h-full">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] z-20 md:mt-[59px] md:hidden">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/events")}
        />
        <span className="ml-2 text-[22px] font-[500]">Schedule</span>
      </div>

      <div className=" mt-[60px] mx-[16px] pt-[10px] md:mt-[60px] md:w-[57%] ">
        {schedule && schedule.length > 0 ? (
          schedule
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((session, key) => (
              <div
                className={`grid w-[100%] relative border-b-[1px] border-b-[#d0d0d0] mb-[10px]`}
              >
                <div className="">
                  <div className="grid grid-cols-[90px_1fr]">
                    <div className="text-base font-semibold py-1 md:text-[14px]">
                      {moment(session?.startTime).format("LT")}
                    </div>
                    <div className="text-base font-semibold py-1 md:text-[14px]">
                      {session?.sessionName}
                    </div>
                  </div>
                  <div className="grid grid-cols-[90px_1fr_10px]">
                    <div className=" text-[14.5px] font-semibold py-1 text-[#000000] md:text-[13px]">
                      {new Date(session.startTime).toLocaleDateString("en-UK", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      {session.startTime.substring(0, 4).slice(-2)}
                    </div>
                    <div className="text-[13px] font-medium py-1 text-gray-500 text-justify">
                      {session?.sessionDescription.split("").length > 400 ? (
                        <>{session?.sessionDescription.slice(0, 400)}...</>
                      ) : (
                        session?.sessionDescription.slice(0, 400)
                      )}
                    </div>

                    {/* <div className="spacer"></div> */}
                  </div>
                </div>
                {session.speakers.length > 0 ? (
                  <div className="ml-[88px] text-[rgba(0,0,0,0.5);] text-sm font-medium my-2">
                    Speaker
                  </div>
                ) : (
                  <></>
                )}

                <div className="flex mt-2 justify-between items-start mb-2">
                  <div className=" ml-[88px] w-[50%] md:w-[60%]">
                    {session.speakers.length > 0
                      ? session.speakers.map((ele, index) => {
                          for (
                            let i = 0;
                            i < singleEvent.speakers.length;
                            i++
                          ) {
                            if (ele === singleEvent.speakers[i]._id) {
                              if (singleEvent.speakers[i].profilePicture) {
                                return (
                                  <>
                                    <div className="flex items-center text-[13px] font-medium text-[#1C1C1E] mb-2">
                                      <img
                                        src={
                                          singleEvent.speakers[i].profilePicture
                                        }
                                        className="rounded-full w-[25px] h-[25px] object-cover mr-2"
                                      />
                                      {singleEvent.speakers[i].firstName}{" "}
                                      {singleEvent.speakers[i].lastName},{" "}
                                      {singleEvent.speakers[i].jobTitle},{" "}
                                      {singleEvent.speakers[i].organization}
                                    </div>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <div className="flex items-center text-[13px] font-medium text-[#1C1C1E] mb-2">
                                      <div className="mr-2">
                                        <DefaultProfilePicture
                                          firstName={
                                            singleEvent.speakers[i].firstName
                                          }
                                          lastName={
                                            singleEvent.speakers[i].lastName
                                          }
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                            borderRadius: "300px",
                                            fontSize: "10px",
                                          }}
                                        />
                                      </div>
                                      {singleEvent.speakers[i].firstName}{" "}
                                      {singleEvent.speakers[i].lastName},{" "}
                                      {singleEvent.speakers[i].jobTitle},{" "}
                                      {singleEvent.speakers[i].organization}
                                    </div>
                                  </>
                                );
                              }
                            }
                          }
                        })
                      : []}
                  </div>
                  {session?.venueName ? (
                    <div className="venueName text-[13px] font-[500] text-[#aaaaaa] top-[0px] flex justify-end">
                      {session?.venueName && session.venueName}
                    </div>
                  ) : (
                    session.onlineSessionUrl && (
                      <div className=" pb-[0px]">
                        {/* <p className="spacer"></p>{" "} */}
                        <div className="flex items-center">
                          <span className="text-green-500 mr-3 text-[14px] hidden md:block">
                            &#9679; online
                          </span>

                          {/* <i className="fa-solid fa-wifi fa-font-solid text-green-500 font-[600]"></i> */}
                          <p
                            className="cursor-pointer grid place-items-center grid-cols-[1fr_0px] bg-primary text-white text-[13px] font-[500] w-[90px] h-[28px] px-[0px] rounded-sm "
                            onClick={() => {
                              window.open(session.onlineSessionUrl, "_blank");
                            }}
                          >
                            Join Now{" "}
                            {/* <i className="fa-solid fa-arrow-up-right-from-square"></i> */}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="grid w-full place-items-center h-[250px] mt-[100px] md:mt-0">
            <div>
              <img
                src="/svgs/nullState.svg"
                alt=""
                className="w-full h-[250px]"
              />
              <p className="text-[15px] font-[500] text-[#717171] text-center mt-5">
                Nothing here...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeSchedule;
