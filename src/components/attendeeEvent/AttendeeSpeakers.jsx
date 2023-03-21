import React from "react";
import { useNavigate } from "react-router-dom";

const AttendeeSpeakers = ({ singleEvent }) => {
  const navigate = useNavigate();
  console.log(singleEvent);
  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5]">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED]">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/attendee")}
        />
        <span className="ml-2 text-[22px] font-[500]">Speakers</span>
      </div>
      <div className="mt-[60px] mx-[16px] pt-[16px] pb-[80px]">
        {singleEvent.speakers && singleEvent.speakers.length > 0 ? (
          singleEvent.speakers.map((speakerData, key) => (
            <>
              <div
                key={key}
                className="bg-[#FFFFFF] mb-4 h-[184px] rounded-[10px] p-[16px]"
              >
                <div className="flex items-center">
                  {speakerData.profilePicture ? (
                    <img
                      src={speakerData.profilePicture}
                      className="rounded-full sm:w-[40px] sm:h-[40px] w-[40px] h-[40px] object-cover mr-3"
                    />
                  ) : (
                    <div
                      className={`sm:w-[40px] sm:h-[40px] w-[40px] h-[40px] rounded-full bg-${
                        ["red", "green", "blue", "yellow", "indigo"][
                          Math.floor(Math.random() * 5)
                        ]
                      }-500 flex items-center justify-center mr-2 text-white text-lg font-medium uppercase`}
                    >
                      {speakerData.firstName.slice(0, 1)}
                      {speakerData.lastName.slice(0, 1)}
                    </div>
                  )}

                  <div className="">
                    <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] ">
                      {speakerData.firstName} {speakerData.lastName}
                    </div>
                    <div className="text-[12px] font-medium py-[0px] text-gray-500">
                      {speakerData.jobTitle}, {speakerData.organization}
                    </div>
                  </div>
                </div>
                <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 min-h-[70px] ">
                  {speakerData.speaker.eventSpecificData[0].bio.split("")
                    .length > 150 ? (
                    <>
                      {speakerData.speaker.eventSpecificData[0].bio.slice(
                        0,
                        150
                      )}
                      ...
                    </>
                  ) : (
                    <>
                      {" "}
                      {speakerData.speaker.eventSpecificData[0].bio.slice(
                        0,
                        150
                      )}
                    </>
                  )}
                </div>
                <div className="mymd:mt-3 mt-0 flex justify-between">
                  <span className="flex items-center cursor-pointer text-[#0E76A8] text-base font-[500] text-[12px] border h-[32px] w-[160px] justify-center rounded-[4px]">
                    <a
                      href={speakerData.linkedinUrl}
                      className="flex items-center "
                      target="_blank"
                    >
                      <img
                        src="/svgs/linkedinblue.svg"
                        alt="share"
                        className="mr-2 h-[15px] w-[15px]"
                      />
                      Visit Linkedin
                    </a>
                  </span>
                  <span className="flex items-center cursor-pointer text-white text-[12px] font-[500] text-[12px] border h-[32px] w-[160px] justify-center rounded-[4px] bg-primary">
                    <a
                      href={speakerData.linkedinUrl}
                      className="flex items-center "
                      target="_blank"
                    >
                      Book a meeting
                    </a>
                  </span>
                </div>
              </div>
            </>
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
    </div>
  );
};

export default AttendeeSpeakers;
