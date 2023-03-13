// @ts-nocheck
import React, { useEffect, useState } from "react";
import Primarybtn from "../../../common/buttons/Primarybtn";
import SecondaryButton from "../../../common/buttons/SecondaryButton";
import Modal from "../../../common/modals/Modal";
import { getRequest } from "../../../utils/API/api.ts";
import AddSpeaker from "./AddSpeaker";
import SpeakerCSVUpload from "./BulkUploadSpeaker";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

function Speakers() {
  const [open, setOpen] = useState(false);
  // const [event, setEvent] = useState<any>({});
  const [speakers, setSpeakers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [singleSpeaker, setSingleSpeaker] = useState({});
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const eventsid = useMatch("/events/:eventId");

  const event = useSelector((state) => state.eventData);
  const searchValue = useSelector((state) => state.searchSpeaker);

  useEffect(() => {
    async function fetchData() {
      const data = await getRequest(
        `/attendee/${eventsid.params.eventId}/search/speaker?name=${searchValue.value}`
      );
      setSpeakers([...data.data.registrations.speakers]);
    }
    // setLoading(false);
    if (searchValue.value) {
      fetchData();
    } else if (searchValue.value === "" || searchValue.value === " ") {
      setSpeakers(event.speakers);
    }
  }, [searchValue.value]);
  useEffect(() => {
    if (event.speakers) {
      setSpeakers(event.speakers);
    }
  }, [event.speakers]);

  return (
    <>
      <div className="w-full md:w-[422px] md:ml-[0px] md:mt-[0] pb-5">
        <div className="py-0">
          {/* <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
        </div> */}
          <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[19px] pt-3 text-[#585858] md:flex items-center justify-between fixed bg-white z-10 min-h-[82px]">
            <div>Speakers</div>
            {speakers && speakers.length > 0 ? (
              <div className="w-[335px] md:w-[230px]">
                <Primarybtn
                  onClick={() => {
                    setOpen(true);
                    setIsEdit(false);
                  }}
                >
                  Add More Speakers
                </Primarybtn>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="mt-2 mb-[50px] w-[335px] mx-auto md:w-[430px] overflow-y-auto scrollbar pt-[75px] absolute pb-[50px]">
            {speakers && speakers.length > 0 ? (
              speakers.map((speaker, key) => (
                <>
                  <div className="my-4 flex justify-between">
                    <div className="flex items-center">
                      {speaker.profilePicture ? (
                        <img
                          src={speaker.profilePicture}
                          className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                      ) : (
                        <div
                          className={`sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded-full bg-${
                            ["red", "green", "blue", "yellow", "indigo"][
                              Math.floor(Math.random() * 5)
                            ]
                          }-500 flex items-center justify-center mr-2 text-white text-lg font-medium uppercase`}
                        >
                          {speaker.firstName.slice(0, 1)}
                          {speaker.lastName.slice(0, 1)}
                        </div>
                      )}

                      <div className="pl-2.5 w-[197px]">
                        <div className="text-[14px] font-semibold py-1">
                          {speaker.firstName} {speaker.lastName}
                        </div>
                        <div className="text-sm font-medium py-1 text-gray-500">
                          {speaker.jobTitle}, {speaker.organization}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-x-2.5 mr-6 items-center">
                      <img
                        src="/svgs/Edit.svg"
                        alt="edit"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          let bio = "";
                          speaker.speaker.eventSpecificData.find((ele) => {
                            if (ele.eventId === eventsid.params.eventId) {
                              bio = ele.bio;
                            }
                          });
                          setOpen(true);
                          setIsEdit(true);
                          setSingleSpeaker({
                            firstName: speaker.firstName,
                            lastName: speaker.lastName,
                            jobTitle: speaker.jobTitle,
                            organization: speaker.organization,
                            email: speaker.email,
                            bio: bio,
                            linkedinUrl: speaker.linkedinUrl,
                            profilePicture: speaker.profilePicture,
                          });
                        }}
                      />
                      <img
                        src="/svgs/Delete.svg"
                        alt="delete"
                        className="w-6 h-6 cursor-pointer"
                      />
                    </div>
                    {/* <div
                  className="edit cursor-pointer"
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                </div> */}
                  </div>
                  <div className="w-[325px] md:w-[422px]">
                    <hr />
                  </div>
                </>
              ))
            ) : (
              <div className="grid w-full h-[300px]">
                <div>
                  <img
                    src="/svgs/nullState.svg"
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
                  <p className="text-[15px] font-[500] text-[#717171]">
                    No Speakers available...
                  </p>
                </div>

                <div className="w-[335px] md:w-[250px]">
                  <Primarybtn
                    onClick={() => {
                      setOpen(true);
                      setIsEdit(false);
                    }}
                  >
                    Add More Speakers
                  </Primarybtn>
                </div>
              </div>
            )}
          </div>

          {/* <div className="w-[335px] mx-auto md:w-[422px]">
          <SecondaryButton
            btnText={"Upload CSV"}
            onClick={() => {
              console.log("clicked");
              setIsBulkUpload(true);
            }}
          />
        </div>
        <div className="w-[335px] mx-auto md:w-[422px]">
          <span className="text-primary font-normal text-sm cursor-pointer pt-5">
            Download the CSV format
          </span>
        </div> */}

          <AddSpeaker
            open={open}
            setOpen={setOpen}
            event={event}
            speakers={speakers}
            setSpeakers={setSpeakers}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            singleSpeaker={singleSpeaker}
            setSingleSpeaker={setSingleSpeaker}
          />
          <div className="">
            <Modal isOpen={isBulkUpload} setIsOpen={setIsBulkUpload}>
              <SpeakerCSVUpload setIsBulkUpload={setIsBulkUpload} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Speakers;
