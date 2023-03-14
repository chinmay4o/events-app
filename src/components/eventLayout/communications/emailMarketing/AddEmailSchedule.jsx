import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../../../../common/inputElements/TextInput";
import TextArea from "../../../../common/inputElements/TextArea";
import DatePicker from "react-date-picker";
import TimeInput from "../../../../common/timeInput/TimeInput";
import Select from "../../../../common/inputElements/Select";
import { useForm } from "react-hook-form";
import throttle from "../../../../utils/throttle";
import moment from "moment";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRequest } from "../../../../utils/API/api.ts";

export default function AddEmailSchedule({
  open,
  setOpen,
  event,
  isEdit,
  setEmailDetails,
  emailDetails,
  singleEmail,
}) {
  const [value1, setValue1] = useState([]);
  const [options, setOptions] = useState([]);
  const [value2, setValue2] = useState(options[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [attendeesEmail, setAttendeesEmail] = useState([]);
  const [scheduleTime, setscheduleTime] = useState("");
  const eventsId = useMatch("/events/:eventId/*");
  const [registrations, setRegistrations] = useState([]);
  const searchValue = useSelector((state) => state.searchRegistration);
  const [accessToken, setAccessToken] = useState("");
  const [minDate, setminDate] = useState(new Date());
  const [maxDate, setmaxDate] = useState(new Date(event.endDate));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ mode: "onChange" });
  useEffect(() => {
    if (isEdit) {
      const timeStr = new Date(singleEmail?.campaignTime)
        .toISOString()
        .slice(11, 19);
      reset({
        emailSubject: singleEmail?.emailSubject,
        emailBody: singleEmail?.emailBody,
        campaignTime: singleEmail?.campaignTime,
      });
      const speakerOptions = [
        {
          label: "Registered",
          value: "1",
        },
      ];
      setOptions(speakerOptions);
      setValue1(speakerOptions);
      setValue("selectTo", speakerOptions);
      const date = new Date(singleEmail?.campaignTime);

      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Kolkata",
      };
      const formattedTime = date.toLocaleString("en-US", options);
      const formattedTimeWithSeparator = formattedTime.replace(":", " : ");
      setscheduleTime(formattedTimeWithSeparator);
      setDateValue(new Date(singleEmail.campaignTime));
      setminDate(new Date());
      setmaxDate(new Date(event.endDate));
    } else {
      reset({
        emailSubject: "",
        emailBody: "",
      });
      const speakerOptions = [
        {
          label: "Registered",
          value: "1",
        },
      ];
      setOptions(speakerOptions);
      setValue1([]);
      setValue();
      setscheduleTime("");
      setDateValue(new Date());
      setminDate(new Date());
      setmaxDate(new Date(event.endDate));
    }
  }, [event?._id, open]);

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    if (value1.length === 0) {
      alert("Please select atleast one option");
      setIsSubmitting(false);
    } else if (!data.campaignTime) {
      alert("Please select time for the campaign");
      setIsSubmitting(false);
    } else {
      let emailData;
      let newEmailData;
      if (singleEmail.emailSubject !== "" && isEdit) {
        emailData = {
          ...data,
          _id: singleEmail._id,
          eventID: event._id,
          campaignTime:
            data.campaignTime === singleEmail.campaignTime
              ? data.campaignTime
              : new Date(
                  `${moment(dateValue).format("ll")}, ${data.campaignTime}`
                ).toISOString(),
        };
        newEmailData = emailDetails.scheduledEmails.filter((item) => {
          return emailData._id !== item._id;
        });
      } else {
        emailData = {
          ...data,
          eventID: event._id,
          campaignTime: new Date(
            `${moment(dateValue).format("ll")}, ${data.campaignTime}`
          ).toISOString(),
        };
        newEmailData = emailDetails.scheduledEmails;
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/event/${
            eventsId.params.eventId
          }/${"scheduleEmail"}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              emailData,
              oldScheduledEmail: newEmailData,
            }),
          }
        );

        const allEmails = await response.json();
        console.log(allEmails.savedEventConfig);
        if (response.status !== 200) {
          alert("Please add again!! some error occurred");
        }
        setOpen(false);
        setEmailDetails(allEmails.savedEventConfig);
        setIsSubmitting(false);
        setValue1([]);
        reset();
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getRequest(
        `/attendee/${eventsId.params.eventId}/search/attendee?name=${searchValue.value}`
      );
      setRegistrations([...data.data.registrations.attendees]);
    }
    fetchData();
  }, [searchValue.value]);

  useEffect(() => {
    const emails = registrations?.map((user) => user.email);
    setAttendeesEmail(emails);
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, [registrations]);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={setOpen}>
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
                        <Dialog.Title className="text-[22px] pb-[25px] font-[600] text-gray-900">
                          {!isEdit
                            ? "Create New Email Campaign"
                            : "Edit Campaign"}
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit((data) =>
                            throttle(() => onSubmit(data), 5000)
                          )}
                        >
                          {/* <TextInput
                           register={register}
                            type="text"
                            id={"campaignName"}
                            required
                            label="Campaign Name"
                            placeholder="Campaign Name"
                          />  */}

                          <div className="relative mb-[25px]">
                            <label
                              htmlFor="startDate"
                              className="text-[12px] text-[#9c9c9c] absolute -top-[18px] left-[12px]"
                            >
                              To
                            </label>
                            <Select
                              multiple
                              register={register}
                              id={"selectTo"}
                              options={options}
                              value={value1}
                              onChange={(event) => {
                                setValue("selectTo", event);
                                setValue1(event);
                              }}
                            />
                          </div>

                          <TextInput
                            register={register}
                            type="text"
                            id={"emailSubject"}
                            required
                            label="Email Subject"
                            placeholder="Email Subject"
                          />

                          <TextArea
                            register={register}
                            type="text"
                            id={"emailBody"}
                            required
                            label="Email Body"
                            placeholder="Email Body"
                          />

                          <div className="grid grid-cols-2 gap-[50px] mt-[40px] mb-[30px]">
                            <div className="relative">
                              <label
                                htmlFor="startDate"
                                className="text-[12px] text-[#9c9c9c] absolute -top-[18px] left-[5px]"
                              >
                                Campaign Date
                              </label>
                              <DatePicker
                                onChange={(value) => setDateValue(value)}
                                value={dateValue}
                                minDate={minDate}
                                maxDate={maxDate}
                                format="dMMMy"
                              />
                            </div>

                            <TimeInput
                              register={register}
                              required={true}
                              value={scheduleTime}
                              setValue={setValue}
                              id={"campaignTime"}
                              label={"Campaign Time"}
                              isHalfWidth={false}
                            />
                          </div>
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
                                isSubmitting
                                  ? "Loading..."
                                  : "Schedule Campaign"
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
