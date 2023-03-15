import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";
import SecondaryButton from "../../../common/Buttons/SecondaryButton";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { getRequest, patchRequest } from "../../../utils/API/api";
import styles from "../Events.module.css";
import AddSession from "./AddSession";

function index2() {
  const [open, setOpen] = useState(false);
  // const [event, setEvent] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [singleSchedule, setSingleSchedule] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const event = useSelector((state) => state.eventData);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function getEvent() {
  //     const event: any = await getRequest("/event/631f8a607dd693a6f2ea04fe");
  //     console.log(event, "==Event==");
  //     setEvent(event.data.savedEventConfig);
  //     const schedule = event.data.savedEventConfig.schedule;
  //     let allSessions: any = [];
  //     schedule.forEach((day: any) => {
  //       console.log(day.sessions, "==Day==", allSessions);
  //       allSessions = [...allSessions, ...day.sessions];
  //     });
  //     console.log(allSessions, "allSessions");

  //     setSchedule(allSessions);
  //   }
  //   try {
  //     getEvent();
  //   } catch (err) {
  //     console.log("Something went wrong!!");
  //   }
  // }, []);
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
    <div className="w-full md:w-[422px] md:ml-[30px] md:mt-[30px]">
      <div className="py-0">
        <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
        </div>
        <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[19px] pt-2.5 text-[#585858]">
          Schedule
        </div>
        <div className="mt-5 mb-[30px] overflow-y-auto mx-auto w-[335px] md:w-[422px] h-[250px] scrollbar">
          {schedule?.length > 0 ? (
            schedule
              .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
              .map((session, key) => (
                // <div className="grid grid-rows-[1fr_60px]">
                <div className="grid grid-rows-[62px_40px] h-[102px]">
                  <div className="grid grid-rows-3">
                    <div>
                      <div className="text-sm font-semibold py-1 w-[70px] ">
                        {moment(session?.startTime).format("LT")}
                      </div>
                      <div className="text-xs font-medium py-1 text-gray-500">
                        {new Date(session.startTime).toLocaleDateString(
                          "en-UK",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <div className="ml-2 w-[192px]">
                      <div className="text-sm font-semibold py-1">
                        {session?.sessionName}
                      </div>
                      <div className="text-xs font-medium py-1 text-gray-500">
                        {session?.sessionDescription.slice(0, 22)}...
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-2.5 mr-6">
                    <img
                      src="/svgs/Edit.svg"
                      alt="edit"
                      className="w-6 h-6 cursor-pointer"
                      // onClick={() => {
                      //   setOpen(true);
                      //   setIsEdit(true);
                      //   setSingleSchedule({
                      //     sessionName: session.sessionName,
                      //     sessionDescription: session.sessionDescription,
                      //     speakers: session.speakers.map((sp) => sp.value),
                      //     sessionTags: session.sessionTags.join(","),
                      //     venueName: session.venueName,
                      //     startTime: new Date(
                      //       `${session.sessionDate}, ${session.sessionTime}`
                      //     ),
                      //   });
                      // }}
                    />
                    <img
                      src="/svgs/Delete.svg"
                      alt="delete"
                      className="w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        const newSchedule = event.schedule[0].sessions.filter(
                          (ele, index) => ele._id !== session._id
                        );
                        let scheduleCopy = [];

                        scheduleCopy[0] = {
                          day: "1",
                          sessions: newSchedule,
                        };

                        const updatedEvent = await patchRequest(
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
              console.log("clicked");
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

export default index2;
