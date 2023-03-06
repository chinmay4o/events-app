//@ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../common/inputElements/TextInput";
import Select from "../../../common/inputElements/Select";
import TextArea from "../../../common/inputElements/TextArea";
import {
  patchAuthenticatedRequest,
  patchRequest,
} from "../../../utils/API/api.ts";
import moment from "moment";
import throttle from "../../../utils/throttle";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimeInput from "../../../common/timeInput/TimeInput";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { useDispatch } from "react-redux";

export default function AddSession({
  open,
  setOpen,
  setSchedule,
  schedule,
  event,
  singleSchedule,
  setSingleSchedule,
  isEdit,
  setIsEdit,
}) {
  const [value1, setValue1] = useState([]);
  const [options, setOptions] = useState([]);
  const [value2, setValue2] = useState(options[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateValue, setDateValue] = useState(new Date(event.startDate));
  const [scheduleTime, setscheduleTime] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      const timeStr = new Date(singleSchedule?.startTime)
        .toISOString()
        .slice(11, 19);
      reset({
        sessionName: singleSchedule.sessionName,
        sessionDescription: singleSchedule.sessionDescription,
        venueName: singleSchedule.venueName,
        sessionTime: timeStr,
      });
      let filteredArrayA;
      let speakerValue;
      if (event?.speakers && event?.speakers.length > 0) {
        filteredArrayA = event?.speakers.filter((itemA) =>
          singleSchedule.speakers.some((itemB) => itemB === itemA._id)
        );
        speakerValue = filteredArrayA.map((speaker) => {
          return {
            label: `${speaker.firstName} ${speaker.lastName}`,
            value: speaker._id,
          };
        });
        setValue1(speakerValue);
        setValue("speakers", speakerValue);
        if (event?.speakers && event?.speakers.length > 0) {
          const speakerOptions = event?.speakers.map((speaker) => {
            return {
              label: `${speaker.firstName} ${speaker.lastName}`,
              value: speaker._id,
            };
          });
          setOptions(speakerOptions);
        }
        const formattedTime = moment
          .utc(singleSchedule?.startTime)
          .format("hh : mm A");
        setscheduleTime(formattedTime);
        // let idsToRemove = filteredArrayA.map((item) => item._id);
        // console.log(idsToRemove);
        // let filteredArray = event?.speakers.filter(
        //   (item) => !idsToRemove.includes(item._id)
        // );
        // const speakerOptions = filteredArray.map((speaker) => {
        //   return {
        //     label: `${speaker.firstName} ${speaker.lastName}`,
        //     value: speaker._id,
        //   };
        // });
        // setOptions(speakerOptions);
      }
    } else {
      reset({
        sessionName: "",
        sessionDescription: "",
        speakers: "",
        sessionTags: "",
        venueName: "",
        startTime: "",
        selectSpeaker: [],
      });
      if (event?.speakers && event?.speakers.length > 0) {
        const speakerOptions = event?.speakers.map((speaker) => {
          return {
            label: `${speaker.firstName} ${speaker.lastName}`,
            value: speaker._id,
          };
        });
        setOptions(speakerOptions);
      }
      setValue1([]);
      setValue();
      setscheduleTime("");
    }
  }, [event?.speakers, isEdit, open]); //Not good can trigger infinite loop

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    if (value1.length === 0) {
      // this is speakers array
      alert("Please select atleast one speaker");
      setIsSubmitting(false);
    } else if (!data.sessionTime) {
      alert("Please select time for the session");
      setIsSubmitting(false);
    } else {
      let scheduleCopy = event.schedule || [];
      if (scheduleCopy && scheduleCopy.length > 0) {
        if (singleSchedule.sessionName !== "" && isEdit) {
          let newData = {
            ...data,
            _id: singleSchedule._id,
            // speakers : value1.length !== 0 ? data.speakers.map((speaker) => speaker.value) : null,
            speakers: data.speakers.map((speaker) => speaker.value),
            startTime: new Date(
              `${moment(dateValue).format("ll")}, ${data.sessionTime}`
            ).toISOString(),
          };
          let newscheduleCopy = scheduleCopy[
            scheduleCopy.length - 1
          ].sessions.filter((item) => {
            return newData._id !== item._id;
          });
          let updatedscheduleCopy = [...newscheduleCopy, newData];
          scheduleCopy = {
            ...scheduleCopy[0],
            sessions: updatedscheduleCopy,
          };
        } else {
          scheduleCopy[scheduleCopy.length - 1].sessions.push({
            sessionName: data.sessionName,
            sessionDescription: data.sessionDescription,
            speakers: data.speakers.map((speaker) => speaker.value),
            sessionTags: data.sessionTags.split(","),
            onlineSessionUrl: data.onlineSessionUrl,
            venueName: data.venueName,
            startTime: new Date(
              `${moment(dateValue).format("ll") || moment().format("LL")}, ${
                data.sessionTime
              }`
            ).toISOString(),
          });
        }
      } else {
        scheduleCopy[0] = {
          day: "1",
          sessions: [
            {
              sessionName: data.sessionName,
              sessionDescription: data.sessionDescription,
              speakers: data.speakers.map((sp) => sp.value),
              sessionTags: data.sessionTags.split(","),
              venueName: data.venueName,
              startTime: new Date(
                `${moment(dateValue).format("ll")}, ${data.sessionTime}`
              ).toISOString(),
            },
          ],
        };
      }

      try {
        const updatedEvent = await patchAuthenticatedRequest(
          `/event/${event._id}`,
          {
            schedule: scheduleCopy,
          }
        );

        const updatedSchedule = updatedEvent.data.savedEventConfig.schedule;
        let allSessions = [];
        updatedSchedule.forEach((day) => {
          allSessions = [...allSessions, ...day.sessions];
        });
        setSchedule(allSessions);

        dispatch({
          type: UPDATE_EVENT,
          payload: {
            schedule: updatedEvent.data.savedEventConfig.schedule,
          },
        });

        setOpen(false);
        setIsEdit(false);
        setSingleSchedule({
          sessionName: "",
          sessionDescription: "",
          speakers: "",
          sessionTags: "",
          venueName: "",
          startTime: "",
          selectSpeaker: [],
        });
        reset();
        setValue1([]);
        setIsSubmitting(false);
      } catch (err) {
        console.log(err, "error from schedule");
        // scheduleCopy = [];
        setOpen(false);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-40 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="z-40 fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-[45px] md:left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md outline-none hidden md:block text-gray-300"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>X
                          {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                        </button>
                        <button
                          className="md:hidden flex items-center"
                          onClick={() => setOpen(false)}
                        >
                          <i className="fa fa-angle-left text-[24px]"></i>
                          <span className="text-[17px] pt-0.5">Back</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-[22px] pt-[10px] pb-[0px] font-[600] text-gray-900">
                          {!isEdit ? "Add a new session" : "Edit Session"}
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit((data) =>
                            throttle(() => onSubmit(data), 5000)
                          )}
                        >
                          <TextInput
                            register={register}
                            type="text"
                            id={"sessionName"}
                            required
                            label="Session name"
                            placeholder="Session name"
                          />

                          <TextArea
                            register={register}
                            type="text"
                            id={"sessionDescription"}
                            required
                            label="Session description"
                            placeholder="Session description"
                          />

                          <p className="text-[14px] font-[500]	text-[#A55EEA] mb-[27px] mt-[15px] pl-[7px]">
                            <span className="inline-block w-[183px]">
                              Is this session online ?
                            </span>
                            <label
                              htmlFor="default-toggle"
                              className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value=""
                                id="default-toggle"
                                className="sr-only peer"
                                {...register("onlineSession")}
                              />
                              <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></span>
                            </label>
                          </p>

                          {watch().onlineSession ? (
                            <TextInput
                              register={register}
                              type="text"
                              id={"onlineSessionUrl"}
                              label="Online Session URL"
                              placeholder="Online Session URL"
                            />
                          ) : (
                            <TextInput
                              register={register}
                              type="text"
                              id={"venueName"}
                              label="Venue Name"
                              placeholder="Venue Name"
                            />
                          )}

                          <TextInput
                            register={register}
                            type="text"
                            id={"sessionTags"}
                            label="Session tags"
                            placeholder="Session tags"
                          />

                          <div className="grid grid-cols-2 gap-[50px] mt-[40px] mb-[30px]">
                            <div className="relative">
                              <label
                                htmlFor="startDate"
                                className="text-[12px] text-[#9c9c9c] absolute -top-[18px] left-[5px]"
                              >
                                Session Date
                              </label>
                              <DatePicker
                                onChange={(value) => setDateValue(value)}
                                value={dateValue}
                                minDate={new Date(event.startDate)}
                                maxDate={new Date(event.endDate)}
                                format="dMMMy"
                              />
                            </div>

                            <TimeInput
                              register={register}
                              required={true}
                              value={scheduleTime}
                              setValue={setValue}
                              id={"sessionTime"}
                              label={"Session Time"}
                              isHalfWidth={false}
                            />
                          </div>
                          <div className="my-4 my-[25px]">
                            <Select
                              multiple
                              register={register}
                              id={"selectSpeaker"}
                              options={options}
                              value={value1}
                              onChange={(event) => {
                                console.log(event);
                                setValue("speakers", event);
                                setValue1(event);
                              }}
                            />
                          </div>
                          {/* <TextInput
                            type="select"
                            label="Select speakers"
                            placeholder="Select speakers"
                          /> */}
                          {isEdit ? (
                            <input
                              disabled={isSubmitting}
                              value={
                                isSubmitting ? "Loading..." : "Save Changes"
                              }
                              type="submit"
                              className="primary_submit"
                            />
                          ) : (
                            <input
                              disabled={isSubmitting}
                              value={
                                isSubmitting ? "Loading..." : "Add Session"
                              }
                              type="submit"
                              className="primary_submit"
                            />
                          )}
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
