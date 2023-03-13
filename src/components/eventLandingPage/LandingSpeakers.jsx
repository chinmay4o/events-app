import React from "react";
import styles from "./Landing.module.css";

const LandingSpeakers = ({ singleEvent }) => {
  return (
    <div className={styles.speakers_grid}>
      {singleEvent.speakers && singleEvent.speakers.length > 0 ? (
        singleEvent.speakers.map((speakerData, key) => (
          <>
            <div className={styles.single_speaker_tab} key={key}>
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
                  <div className="sm:text-[14px] text-[13px] font-semibold pt-[5px] ">
                    {speakerData.firstName} {speakerData.lastName}
                  </div>
                  <div className="text-[12px] font-medium py-[0px] text-gray-500">
                    {speakerData.jobTitle}, {speakerData.organization}
                  </div>
                </div>
              </div>
              <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 min-h-[80px]">
                {speakerData.speaker.eventSpecificData[0].bio.split("").length >
                150 ? (
                  <>
                    {speakerData.speaker.eventSpecificData[0].bio.slice(0, 150)}
                    ...
                  </>
                ) : (
                  <>
                    {" "}
                    {speakerData.speaker.eventSpecificData[0].bio.slice(0, 150)}
                  </>
                )}
              </div>
              <div className="mymd:mt-3 mt-0">
                <span className="flex items-center cursor-pointer text-[#0E76A8] text-base font-bold ">
                  <a
                    href={speakerData.linkedinUrl}
                    className="flex"
                    target="_blank"
                  >
                    <img
                      src="/svgs/linkedinblue.svg"
                      alt="share"
                      className="mr-2"
                    />
                    Visit Linkedin
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
  );
};

export default LandingSpeakers;
