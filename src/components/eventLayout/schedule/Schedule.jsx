import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import SecondaryButton from "../../../common/buttons/SecondaryButton";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import {
  getRequest,
  patchAuthenticatedRequest,
} from "../../../utils/API/api.ts";
import TopModal from "../../../common/topModal/TopModal";
import AddSession from "./AddSession";

function Schedule() {
  const [open, setOpen] = useState(false);
  // const [event, setEvent] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [singleSchedule, setSingleSchedule] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const event = useSelector((state) => state.eventData);
  const dispatch = useDispatch();
  const [deletSeesion, setDeleteSession] = useState("");

  useEffect(() => {
    const schedule = event.schedule;

    let allSessions = [];
    if (schedule?.length > 0) {
      schedule.forEach((day) => {
        allSessions = [...allSessions, ...day.sessions];
      });

      setSchedule(allSessions);
    }
  }, [event]);

  return (
    <>
      <div className="w-full md:w-[422px] md:ml-[0px] md:mt-[0px]">
        <TopModal message="Are you sure you want to delete?" />
        <div className="py-0">
          {/* <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
        </div> */}
          <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[24px] pt-2.5 text-black md:flex items-center justify-between fixed bg-white z-10 min-h-[82px]">
            <div>Schedule</div>
            {schedule?.length > 0 ? (
              <div className="w-[335px] md:w-[230px]">
                <PrimaryButton
                  btnText={"Add More Sessions"}
                  onClick={() => {
                    setOpen(true);
                    setIsEdit(false);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-5 mb-[30px] overflow-y-auto mx-auto w-[335px] md:w-[422px] scrollbar pt-[75px] absolute pb-[50px]">
            {schedule?.length > 0 ? (
              schedule
                .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                .map((session, index) => (
                  <div
                    key={index}
                    className={`grid ${
                      session.onlineSessionUrl
                        ? `grid-rows-[1fr_${
                            session?.sessionDescription.length > 60
                              ? "42px"
                              : "20px"
                          }_50px]`
                        : `grid-rows-[1fr_${
                            session?.sessionDescription.length > 60
                              ? "42px"
                              : "20px"
                          }]`
                    }w-[95%] relative left-[0px] border-b-[1px] border-b-[#d0d0d0] py-[13px]`}
                  >
                    <div className="">
                      <div className="grid grid-cols-[70px_1fr_30px_30px] ">
                        <div className="text-[13.4px] font-semibold py-1">
                          {moment(session?.startTime).format("LT")}
                        </div>
                        <div className="text-[13.4px] font-semibold py-1">
                          {/* {session._id} */}
                          {session?.sessionName}
                        </div>
                        {deletSeesion === session._id ? (
                          <div className="flex">
                            <img
                              src="/svgs/done.svg"
                              alt="done"
                              className="w-6 h-6 cursor-pointer mr-3"
                              onClick={async () => {
                                const newSchedule =
                                  event.schedule[0].sessions.filter(
                                    (ele, index) => ele._id !== session._id
                                  );
                                let scheduleCopy = [];

                                scheduleCopy[0] = {
                                  day: "1",
                                  sessions: newSchedule,
                                };
                                const updatedEvent =
                                  await patchAuthenticatedRequest(
                                    `/event/${event._id}`,
                                    {
                                      schedule: scheduleCopy,
                                    }
                                  );

                                const updatedSchedule =
                                  updatedEvent.data.savedEventConfig.schedule;
                                let allSessions = [];
                                updatedSchedule.forEach((day) => {
                                  allSessions = [
                                    ...allSessions,
                                    ...day.sessions,
                                  ];
                                });

                                setSchedule(allSessions);

                                dispatch({
                                  type: UPDATE_EVENT,
                                  payload: {
                                    schedule: updatedSchedule,
                                  },
                                });
                                setDeleteSession("");
                              }}
                            />
                            <img
                              src="/svgs/Cross.svg"
                              alt="delete"
                              className="w-6 h-6 cursor-pointer"
                              onClick={() => setDeleteSession("")}
                            />
                          </div>
                        ) : (
                          <>
                            <img
                              src="/svgs/Edit.svg"
                              alt="edit"
                              className="w-6 h-6 cursor-pointer mr-3"
                              onClick={() => {
                                setOpen(true);
                                setIsEdit(true);
                                setSingleSchedule({
                                  _id: session._id,
                                  sessionName: session.sessionName,
                                  sessionDescription:
                                    session.sessionDescription,
                                  venueName:
                                    session?.venueName && session.venueName,
                                  sessionTags: session.sessionTags,
                                  startTime:
                                    moment
                                      .utc(session.startTime)
                                      .local()
                                      .format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
                                  speakers: session.speakers,
                                  sessionTime: "",
                                });
                              }}
                            />
                            <img
                              src="/svgs/Delete.svg"
                              alt="delete"
                              className="w-6 h-6 cursor-pointer"
                              onClick={() => setDeleteSession(session._id)}
                            />
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-[70px_1fr_60px]">
                        <div className="text-sm font-semibold py-1 text-gray-500">
                          {new Date(session.startTime).toLocaleDateString(
                            "en-UK",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-[13px] font-medium py-1 text-gray-500">
                          {session?.sessionDescription.slice(0, 100)}...
                        </div>
                        <div className="spacer"></div>
                      </div>
                    </div>
                    <div className="flex mt-2 justify-between items-center">
                      <div className="grid grid-cols-[30px_30px_30px_30px] gap-[5px]">
                        {session.speakers.length > 0
                          ? session.speakers.map((ele, index) => {
                              for (let i = 0; i < event.speakers.length; i++) {
                                if (ele === event.speakers[i]._id) {
                                  if (event.speakers[i].profilePicture) {
                                    return (
                                      <img
                                        src={event.speakers[i].profilePicture}
                                        className="rounded-[60%] w-[30px] h-[30px] object-cover"
                                      />
                                    );
                                  } else {
                                    return (
                                      <div
                                        className={`sm:w-[30px] sm:h-[30px] w-[30px] h-[30px] rounded-full bg-${
                                          [
                                            "red",
                                            "green",
                                            "blue",
                                            "yellow",
                                            "indigo",
                                          ][Math.floor(Math.random() * 5)]
                                        }-500 flex items-center justify-center mr-2 text-white text-sm font-medium uppercase`}
                                      >
                                        {event.speakers[i].firstName.slice(
                                          0,
                                          1
                                        )}
                                        {event.speakers[i].lastName.slice(0, 1)}
                                      </div>
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
                              <span className="text-green-500 mr-2 text-[14px]">
                                &#9679; online
                              </span>

                              {/* <i className="fa-solid fa-wifi fa-font-solid text-green-500 font-[600]"></i> */}
                              <p
                                className="cursor-pointer grid place-items-center grid-cols-[1fr_0px] bg-gray-200 text-[#000] text-[13px] font-[500] w-[95px] h-[28px] px-[0px] rounded-sm "
                                onClick={() => {
                                  window.open(
                                    session.onlineSessionUrl,
                                    "_blank"
                                  );
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
              <div className="grid w-full h-[250px]">
                <div>
                  <img
                    src="/svgs/nullState.svg"
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
                  <p className="text-[15px] font-[500] text-[#717171]">
                    Nothing here...
                  </p>
                </div>
                <div className="w-[335px] md:w-[250px]">
                  <PrimaryButton
                    btnText={"Add More Sessions"}
                    onClick={() => {
                      setOpen(true);
                      setIsEdit(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          {/* <div className="w-[335px] md:w-[340px] mx-auto">
            <PrimaryButton
              btnText={"Add More Sessions"}
              onClick={() => {
                setOpen(true);
                setIsEdit(false);
              }}
            />
          </div> */}
          {/* <div className="w-[335px] md:w-[422px] mx-auto">
          <SecondaryButton
            btnText={"Upload CSV"}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </div>

        <div className="w-[335px] mx-auto md:w-[422px]">
          <span className="text-primary font-normal text-sm cursor-pointer pt-5">
            Download the CSV format
          </span>
        </div> */}

          <AddSession
            open={open}
            setOpen={setOpen}
            setSchedule={setSchedule}
            schedule={schedule}
            event={event}
            singleSchedule={singleSchedule}
            setSingleSchedule={setSingleSchedule}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
      </div>
    </>
  );
}

export default Schedule;
