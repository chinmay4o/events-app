import React, { useEffect, useState } from "react";
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
  const event = useSelector((state) => state.eventData);
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
    console.log(filteredEmail);
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
  return (
    <div className="w-full md:w-[375px] md:ml-[30px] md:mt-[27px] pb-[200px]">
      <div className="flex w-[375px] md:w-[375px] mx-auto">
        <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
          {emailDetails.title}
        </span>
      </div>
      <div className="font-[600] w-[375px] mx-auto md:w-[800px] text-[19px] text-[#585858] flex justify-between items-center mt-2">
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
      {emailDetails?.scheduledEmails?.length >= 1 ? (
        <div className="border w-[800px] min-h-[300px] mt-5 rounded-lg scrollbar-hide">
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
            .map((email) => {
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
                        <></>
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
      ) : (
        <div className="border w-[800px] min-h-[300px] mt-5 rounded-lg flex justify-center items-center">
          <div>
            <img
              src="/svgs/nullState.svg"
              alt=""
              className="w-[200px] h-[200px]"
            />
            <p className="text-[15px] font-[500] text-[#717171]  text-center">
              No Scheduled Mails
            </p>
          </div>
        </div>
      )}

      <p className="text-[15px] text-red-500 mt-3 w-[700px]">
        Note: Scheduled Emails cannot be deleted or edited 30 minutes before the
        scheduled time.
      </p>
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
