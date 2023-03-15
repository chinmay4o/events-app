import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddEmailSchedule from "./AddEmailSchedule";
import {
  patchAuthenticatedRequest,
  patchRequest,
} from "../../../../utils/API/api.ts";
const EmailMarketing = () => {
  const [emailDetails, setEmailDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deletEmail, setDeleteEmail] = useState("");
  const [singleEmail, setsingleEmail] = useState([]);
  const [defaultEmail, setdefaultEmail] = useState(false);
  const [speakerInvite, setSpeakerInvite] = useState(false);
  const event = useSelector((state) => state.eventData);
  const targetRef = useRef([]);
  const now = new Date().getTime();
  useEffect(() => {
    let eventDetails = event;
    setEmailDetails(eventDetails);
  }, [event]);

  const handleDelete = async (email) => {
    const filteredEmail = emailDetails.scheduledEmails.filter(
      (scheduledEmails) => {
        return scheduledEmails._id !== email._id;
      }
    );
    const updatedEmails = { ...emailDetails, scheduledEmails: filteredEmail };
    setEmailDetails(updatedEmails);

    const updatedEvent = await patchAuthenticatedRequest(
      `/event/${event._id}`,
      {
        scheduledEmails: filteredEmail,
      }
    );
    setDeleteEmail("");
  };

  const showInfo = (index) => {
    targetRef.current[index].style.display = "block";
  };

  const hideInfo = (index) => {
    targetRef.current[index].style.display = "none";
  };

  return (
    <div className="w-full md:w-[375px] md:ml-[0px] md:mt-[27px] pb-[200px]">
      <div className="font-[600] w-[375px] mx-auto md:w-[800px] text-[24px] text-[#585858] flex justify-between items-center mt-2">
        Scheduled Emails
        <div className="w-[200px]">
          <div
            className="primary_submit"
            onClick={() => {
              setOpen(true);
              setIsEdit(false);
            }}
          >
            Schedule Email
          </div>
        </div>
      </div>
      <div className="border w-[800px] min-h-[300px] mt-5 rounded-lg scrollbar-hide">
        <div className="flex border-b h-[70px] items-center px-4">
          <div>
            <img src="/svgs/clock.svg" />
          </div>
          <div className=" w-full ml-4">
            <div className="flex items-center">
              <img src="/svgs/calender.svg" className="mr-2" />
              <span className="text-[15px]">
                Thank you for registering for the {event?.title}
              </span>
            </div>
            <p className="text-[13px] mt-1.5 text-gray-500">
              <div className="flex">
                To: Registered -&nbsp;
                <div className="text-green-600 font-medium	">
                  Sent:&nbsp; As soon as registers
                </div>
              </div>
            </p>
          </div>
          <div
            className="cursor-pointer relative"
            onMouseEnter={() => setdefaultEmail(true)}
            onMouseLeave={() => setdefaultEmail(false)}
          >
            <img src="/svgs/info.svg" />
            {defaultEmail ? (
              <div className="absolute z-20 bg-gray-700 h-[70px] text-[12px] w-[150px] p-2 ml-5 rounded-md	text-white text-center">
                The email is sent as soon as someone registers.
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {emailDetails?.scheduledEmails
          ?.sort((a, b) => {
            const timeA = new Date(
              new Date(a.campaignTime).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              })
            ).getTime();
            const timeB = new Date(
              new Date(b.campaignTime).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              })
            ).getTime();
            return timeB - timeA;
          })
          .map((email, index) => {
            return (
              <div
                className="flex border-b h-[70px] items-center px-4"
                key={email._id}
              >
                <div>
                  <img src="/svgs/clock.svg" />
                </div>
                <div className=" w-full ml-4">
                  <div className="flex items-center">
                    <img src="/svgs/calender.svg" className="mr-2" />
                    <span className="text-[15px]"> {email.emailSubject}</span>
                  </div>
                  <p className="text-[13px] mt-1.5 text-gray-500">
                    {email.emailTo.map((to) => {
                      return (
                        <div className="flex">
                          To: {to.label} -&nbsp;
                          {new Date(
                            new Date(email.campaignTime).toLocaleString(
                              "en-US",
                              {
                                timeZone: "Asia/Kolkata",
                              }
                            )
                          ).getTime() <= now ? (
                            <div className="text-green-600 font-medium	">
                              Sent:&nbsp;
                              {new Date(email.campaignTime).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                              ,{" "}
                              {new Date(email.campaignTime).toLocaleString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </div>
                          ) : (
                            <div className="text-orange-500 font-medium	">
                              Scheduled:&nbsp;
                              {new Date(email.campaignTime).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                              ,{" "}
                              {new Date(email.campaignTime).toLocaleString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </p>
                </div>
                {new Date(
                  new Date(email.campaignTime).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })
                ).getTime() -
                  30 * 60 * 1000 <=
                now ? (
                  <>
                    {new Date(
                      new Date(email.campaignTime).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })
                    ).getTime() <= now ? (
                      <div>
                        {deletEmail === email._id ? (
                          <div className="flex w-[70px] justify-between">
                            <img
                              src="/svgs/done.svg"
                              alt="done"
                              className="w-6 h-6 cursor-pointer"
                              onClick={() => handleDelete(email)}
                            />
                            <img
                              src="/svgs/cross.svg"
                              alt="delete"
                              className="w-6 h-6 cursor-pointer"
                              onClick={() => setDeleteEmail("")}
                            />
                          </div>
                        ) : (
                          <img
                            src="/svgs/Delete.svg"
                            alt="delete"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setDeleteEmail(email._id)}
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer relative "
                        onMouseEnter={() => showInfo(index)}
                        onMouseLeave={() => hideInfo(index)}
                      >
                        <img src="/svgs/info.svg" />

                        <div
                          className="absolute z-20 bg-gray-700 h-[90px] text-[12px] w-[150px] p-2 ml-5 rounded-md	text-white text-center hidden"
                          ref={(element) => {
                            targetRef.current[index] = element;
                          }}
                        >
                          Emails cannot be deleted or edited 30 minutes before
                          the scheduled time.
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex w-[80px] justify-between">
                    {deletEmail === email._id ? (
                      <>
                        <img
                          src="/svgs/done.svg"
                          alt="done"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => handleDelete(email)}
                        />
                        <img
                          src="/svgs/cross.svg"
                          alt="delete"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => setDeleteEmail("")}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src="/svgs/Edit.svg"
                          alt="edit"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => {
                            setOpen(true);
                            setIsEdit(true);
                            setsingleEmail(email);
                          }}
                        />
                        <img
                          src="/svgs/Delete.svg"
                          alt="delete"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => setDeleteEmail(email._id)}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="mt-5 text-[20px] text-[#585858] font-[600]">
        Speaker Invite
      </div>
      <div className="border w-[800px] min-h-[130px] mt-5 rounded-lg scrollbar-hide">
        <div className="flex border-b h-[70px] items-center px-4">
          <div>
            <img src="/svgs/clock.svg" />
          </div>
          <div className=" w-full ml-4">
            <div className="flex items-center">
              <img src="/svgs/calender.svg" className="mr-2" />
              <span className="text-[15px]">
                You are invited as a speaker at {event?.title}
              </span>
            </div>
            <p className="text-[13px] mt-1.5 text-gray-500">
              <div className="flex">
                To: Registered -&nbsp;
                <div className="text-green-600 font-medium	">
                  Sent:&nbsp; As soon as added
                </div>
              </div>
            </p>
          </div>
          <div
            className="cursor-pointer relative"
            onMouseEnter={() => setSpeakerInvite(true)}
            onMouseLeave={() => setSpeakerInvite(false)}
          >
            <img src="/svgs/info.svg" />
            {speakerInvite ? (
              <div className="absolute z-20 bg-gray-700 h-[70px] text-[12px] w-[150px] p-2 ml-5 rounded-md	text-white text-center">
                The email is sent as soon as speaker in added.
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <AddEmailSchedule
        open={open}
        setOpen={setOpen}
        event={event}
        setEmailDetails={setEmailDetails}
        isEdit={isEdit}
        emailDetails={emailDetails}
        singleEmail={singleEmail}
      />
    </div>
  );
};

export default EmailMarketing;
