import React, { useEffect, useState } from "react";
import styles from "./Landing.module.css";
import moment from "moment";

const Schedule = ({ singleEvent }) => {
  const [schedule, setSchedule] = useState([]);

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
    <div className={styles.schedule_grid_box}>
      {schedule && schedule.length > 0 ? (
        schedule
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .map((session, key) => (
            <div
              className={`grid w-[100%] relative border-b-[1px] border-b-[#d0d0d0]`}
            >
              <div className="">
                <div className="grid grid-cols-[90px_1fr]">
                  <div className="text-base font-semibold py-1">
                    {moment(session?.startTime).format("LT")}
                  </div>
                  <div className="text-base font-semibold py-1">
                    {session?.sessionName}
                  </div>
                </div>
                <div className="grid grid-cols-[90px_1fr_10px]">
                  <div className=" text-[14.5px] font-semibold py-1 text-[#000000]">
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

              <div className="w-120 ml-[88px] mb-2">
                {session.speakers.length > 0
                  ? session.speakers.map((ele, index) => {
                      for (let i = 0; i < singleEvent.speakers.length; i++) {
                        if (ele === singleEvent.speakers[i]._id) {
                          if (singleEvent.speakers[i].profilePicture) {
                            return (
                              <>
                                <div className="flex items-center text-[13px] font-medium text-[#1C1C1E] mb-2">
                                  <img
                                    src={singleEvent.speakers[i].profilePicture}
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
                                  <div
                                    className={`w-[25px] h-[25px] rounded-full bg-${
                                      [
                                        "red",
                                        "green",
                                        "blue",
                                        "yellow",
                                        "indigo",
                                      ][Math.floor(Math.random() * 5)]
                                    }-500 flex items-center justify-center mr-2 text-white text-sm font-medium uppercase`}
                                  >
                                    {singleEvent.speakers[i].firstName.slice(
                                      0,
                                      1
                                    )}
                                    {singleEvent.speakers[i].lastName.slice(
                                      0,
                                      1
                                    )}
                                  </div>{" "}
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
              {/* <div className="grid grid-cols-[30px_30px_30px_30px] gap-[5px]">
                {session.speakers.length > 0
                  ? session.speakers.map((ele, index) => {
                      for (let i = 0; i < singleEvent.speakers.length; i++) {
                        if (ele === singleEvent.speakers[i]._id) {
                          if (singleEvent.speakers[i].profilePicture) {
                            return (
                              <img
                                src={singleEvent.speakers[i].profilePicture}
                                className="rounded-[60%] w-[30px] h-[30px] object-cover"
                              />

                            );
                          } else {
                            return <img src="/svgs/profile.svg" />;
                          }
                        }
                      }
                    })
                  : []}
              </div> */}
              {/* {session.onlineSessionUrl && (
                <div className="grid grid-cols-[1fr_160px]">
                  <p className="spacer"></p>{" "}
                  <div className="grid place-items-center grid-cols-[20px_1fr] gap-[5px]">
                    <i className="fa-solid fa-wifi fa-font-solid text-green-500 font-[600]"></i>
                    <p
                      className="cursor-pointer grid place-items-center grid-cols-[1fr_20px] bg-gray-200 text-[#000] text-[13px] font-[500] w-[120px] h-[28px] px-[8px] rounded-sm"
                      onClick={() => {
                        window.open(session.onlineSessionUrl, "_blank");
                      }}
                    >
                      Join session{" "}
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </p>
                  </div>
                </div>
              )} */}
            </div>
          ))
      ) : (
        <div className="grid w-full place-items-center h-[250px]">
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
    // <div className={styles.schedule_grid_box}>
    //     {schedule &&
    //       schedule.length > 0 &&
    //       schedule.map((session: any, key: any) => (
    //         <div className={`flex ${styles.single_schedule_tab}`} key={key}>
    //           <div>
    //             <div className="text-sm font-semibold py-1  ">
    //               {new Date(session.startTime).getHours()}:
    //               {new Date(session.startTime).getMinutes()}
    //             </div>
    //             <div className="text-xs font-medium py-1 text-gray-500">
    //               {new Date(session.startTime).toLocaleDateString("en-UK", {
    //                 month: "short",
    //                 day: "numeric",
    //               })}
    //             </div>
    //           </div>

    //           <div className="ml-2">
    //             <div className="text-sm font-semibold py-1">
    //               {session.sessionName ?? "Keynote, NextJS"}
    //             </div>
    //             <div className="text-xs font-medium py-1 text-gray-500">
    //               {session.sessionDescription ?? "A kickstart speech by he CEO"}
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    // </div>
  );
};

export default Schedule;
