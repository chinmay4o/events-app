import moment from "moment";
import { useEffect, useState } from "react";

const Schedule = ({ schedule, singleEvent }) => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    let allSessions = [];
    if (schedule?.length > 0) {
      schedule.forEach((day) => {
        console.log(day.sessions, "==Day==", allSessions);
        allSessions = [...allSessions, ...day.sessions];
      });
      setSessions(allSessions);
    }
  }, []);

  return (
    <div className="w-full min-h-[300px] mt-[15px]">
      {sessions && sessions.length > 0 ? (
        sessions
          .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
          .map((session, key) => (
            <div
              className={`grid ${
                session.onlineSessionUrl
                  ? `grid-rows-[1fr_${
                      session?.sessionDescription.length > 60 ? "42px" : "20px"
                    }_50px] h-[195px]`
                  : `grid-rows-[1fr_${
                      session?.sessionDescription.length > 60 ? "42px" : "20px"
                    }] max-h-[160px]`
              } min-h-[102px] max-h-[195px] w-[92%] relative left-[7px] border-b-[1px] border-b-[#d0d0d0] mb-[20px]`}
            >
              <div className="">
                <div className="grid grid-cols-[70px_1fr]">
                  <div className="text-[13.4px] font-semibold py-1">
                    {moment(session?.startTime).format("LT")}
                  </div>
                  <div className="text-[13.4px] font-semibold py-1">
                    {session?.sessionName}
                  </div>
                </div>
                <div className="grid grid-cols-[70px_1fr_60px]">
                  <div className="text-sm font-semibold py-1 text-gray-500">
                    {new Date(session.startTime).toLocaleDateString("en-UK", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-xs font-medium py-1 text-gray-500">
                    {session?.sessionDescription.slice(0, 100)}...
                  </div>
                  <div className="spacer"></div>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_150px] gap-[5px] pb-[5px]">
                <div className="grid grid-cols-[30px_30px_30px_30px] gap-[5px]">
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
                </div>
                <div className="venueName text-[12px] font-[500] text-[#aaaaaa] relative top-[5px]">
                  {session?.venueName && session.venueName}
                </div>
              </div>
              {session.onlineSessionUrl && (
                <div className="grid grid-cols-[1fr_160px] pb-[6px]">
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
              )}
            </div>
          ))
      ) : (
        <img
          src="/svgs/nullState.svg"
          height={250}
          width={250}
          className="py-5 pt-10 mb-12"
        />
      )}
    </div>
  );
};

export default Schedule;
