import React from "react";
import styles from "./Landing.module.css";

const LandingSpeakers = ({ singleEvent }) => {
  return (
    <div className={styles.speakers_grid}>
      {singleEvent.speakers && singleEvent.speakers.length > 0 ? (
        singleEvent.speakers.map((speakerData, key) => (
          <>
            <div className={styles.single_speaker_tab} key={key}>
              <div className="flex">
                <img
                  src={
                    speakerData.profilePicture
                      ? speakerData.profilePicture
                      : "/svgs/profile.svg"
                  }
                  className="rounded-full sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] object-cover mr-3"
                />
                <div className="">
                  <div className="sm:text-[14px] text-[13px] font-semibold pt-[5px] ">
                    {speakerData.firstName} {speakerData.lastName}
                  </div>
                  <div className="text-[10px] font-medium py-[0px] text-gray-500">
                    {speakerData.jobTitle}, {speakerData.organization}
                  </div>
                </div>
              </div>
              <div className="text-[rgba(0,0,0,0.5)] text-sm font-medium mt-2 h-19">
                {speakerData.speaker.eventSpecificData[0].bio.split("").length >
                200 ? (
                  <>
                    {speakerData.speaker.eventSpecificData[0].bio.slice(0, 200)}
                    ...
                  </>
                ) : (
                  <>
                    {" "}
                    {speakerData.speaker.eventSpecificData[0].bio.slice(0, 200)}
                  </>
                )}
              </div>
              <div className="mymd:mt-3 mt-3">
                <span className="flex items-center cursor-pointer text-[#0E76A8] text-base font-bold ">
                  <a href="#" className="flex">
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
        <p className="text-[12px] font-[600]">Loading...</p>
      )}
    </div>
  );
};

export default LandingSpeakers;
