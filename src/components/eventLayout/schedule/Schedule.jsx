import moment from "moment";
import React, { useEffect, useState } from "react";
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
  console.log(schedule);
  return (
    <div className="w-full md:w-[422px] md:ml-[30px] md:mt-[25px]">
      <TopModal message="Are you sure you want to delete?" />
      <div className="py-0">
        {/* <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
        </div> */}
        <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[19px] pt-2.5 text-[#585858]">
          Schedule
        </div>
        <div className="mt-5 mb-[30px] overflow-y-auto mx-auto w-[335px] md:w-[422px] h-[270px] scrollbar">
          {schedule?.length > 0 ? (
            schedule
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((session, key) => (
                <div
                  className={`grid ${
                    session.onlineSessionUrl
                      ? `grid-rows-[1fr_${
                          session?.sessionDescription.length > 60
                            ? "42px"
                            : "20px"
                        }_50px] h-[185px]`
                      : `grid-rows-[1fr_${
                          session?.sessionDescription.length > 60
                            ? "42px"
                            : "20px"
                        }] h-[150px]`
                  } min-h-[102px] max-h-[185px] w-[96%] relative left-[7px] border-b-[1px] border-b-[#d0d0d0] mb-[20px]`}
                >
                  <div className="">
                    <div className="grid grid-cols-[70px_1fr_30px_30px] ">
                      <div className="text-[13.4px] font-semibold py-1">
                        {moment(session?.startTime).format("LT")}
                      </div>
                      <div className="text-[13.4px] font-semibold py-1">
                        {session?.sessionName}
                      </div>
                      <img
                        src="/svgs/Edit.svg"
                        alt="edit"
                        className="w-6 h-6 cursor-pointer mr-3"
                        onClick={() => {
                          let bio = "";
                          // speaker.speaker.eventSpecificData.find((ele) => {
                          //   if (ele.eventId === eventsid.params.eventId) {
                          //     bio = ele.bio;
                          //   }
                          // });
                          setOpen(true);
                          setIsEdit(true);
                          setSingleSchedule({
                            _id: session._id,
                            sessionName: session.sessionName,
                            sessionDescription: session.sessionDescription,
                            venueName: session?.venueName && session.venueName,
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
                        onClick={async () => {
                          // let result = confirm(
                          //   "Are you sure you want to delete?"
                          // );
                          // if (result === true) {
                          const newSchedule = event.schedule[0].sessions.filter(
                            (ele, index) => ele._id !== session._id
                          );
                          let scheduleCopy = [];

                          scheduleCopy[0] = {
                            day: "1",
                            sessions: newSchedule,
                          };
                          const updatedEvent = await patchAuthenticatedRequest(
                            `/event/${event._id}`,
                            {
                              schedule: scheduleCopy,
                            }
                          );

                          const updatedSchedule =
                            updatedEvent.data.savedEventConfig.schedule;
                          let allSessions = [];
                          updatedSchedule.forEach((day) => {
                            allSessions = [...allSessions, ...day.sessions];
                          });

                          setSchedule(allSessions);

                          dispatch({
                            type: UPDATE_EVENT,
                            payload: {
                              schedule: updatedSchedule,
                            },
                          });
                        }}
                      />
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
                  <div className="grid grid-cols-[1fr_150px] gap-[5px]">
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
        <div className="w-[335px] md:w-[340px] mx-auto">
          <PrimaryButton
            btnText={"Add More Sessions"}
            onClick={() => {
              setOpen(true);
              setIsEdit(false);
            }}
          />
        </div>
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
  );
}

export default Schedule;
