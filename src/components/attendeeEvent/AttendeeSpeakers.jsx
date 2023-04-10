import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";

const AttendeeSpeakers = ({ singleEvent }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white md:min-h-full ">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[59px] z-10 md:hidden">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/events")}
        />
        <span className="ml-2 text-[22px] font-[500]">Speakers</span>
      </div>
      <div className="mt-[60px] mx-[16px] pt-[16px] pb-[80px] md:pt-0 md:mt-[80px] md:w-[62%] md:flex flex-wrap justify-between">
        {singleEvent.speakers && singleEvent.speakers.length > 0 ? (
          singleEvent.speakers.map((speakerData, key) => (
            <>
              <div
                key={key}
                className="bg-[#FFFFFF] mb-4 rounded-[10px] p-[16px] md:border md:w-[350px] md:h-[210px] "
              >
                <div className="flex items-center">
                  {speakerData.profilePicture ? (
                    <img
                      src={speakerData.profilePicture}
                      className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
                    />
                  ) : (
                    <div className="mr-2">
                      <DefaultProfilePicture
                        firstName={speakerData.firstName}
                        lastName={speakerData.lastName}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "300px",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  )}

                  <div className="">
                    <div className="sm:text-[14px] text-[13px] font-[500] pt-[5px] md:font-semibold">
                      {speakerData.firstName} {speakerData.lastName}
                    </div>
                    <div className="text-[12px] font-medium py-[0px] text-gray-500">
                      {speakerData.jobTitle}, {speakerData.organization}
                    </div>
                  </div>
                </div>
                <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 pb-2 md:min-h-[75px]">
                  {speakerData.speaker.eventSpecificData[0].bio.split("")
                    .length > 150 ? (
                    <>
                      {speakerData.speaker.eventSpecificData[0].bio.slice(
                        0,
                        130
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
                  <span className="flex items-center cursor-pointer text-[#0E76A8] text-[12px] font-[500] text-[12px] border h-[32px] w-[47%] justify-center rounded-[4px] md:w-[47%]">
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

                  <span className="flex items-center cursor-pointer text-white text-[12px] font-[500] h-[32px] w-[47%] justify-center rounded-[4px] bg-primary md:w-[47%] opacity-50">
                    Book a meeting
                  </span>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="grid w-full place-items-center h-[250px] mt-[100px] md:mt-0">
            <div>
              <img
                src="/svgs/nullState.svg"
                alt=""
                className="w-full h-[250px]"
              />
              <p className="text-[15px] font-[500] text-[#717171] text-center mt-5">
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
