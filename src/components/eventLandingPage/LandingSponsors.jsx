import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const LandingSponsors = ({ singleEvent }) => {
  console.log(singleEvent);
  const [sponsorAndExhibitors, setSponsorAndExhibitors] = useState([]);
  const event = useSelector((state) => state.eventData);
  const eventsid = useMatch("/event/:eventId");
  useEffect(() => {
    if (event.exhibitorAndSponsors) {
      setSponsorAndExhibitors(event.exhibitorAndSponsors);
      console.log(
        event.exhibitorAndSponsors,
        "event.sponsorAndExhibitors-event.sponsorAndExhibitors"
      );
    }
  }, [event.exhibitorAndSponsors]);

  return (
    <div className="mymd:flex justify-between flex-wrap w-full">
      {sponsorAndExhibitors?.length > 0 ? (
        sponsorAndExhibitors.map((sponsorAndExhibitor, key) => (
          <div className="mymd:w-[292px] mymd:h-[184px] bg-[#F5F5F5] rounded-xl mb-3 p-[20px] h-[128px]">
            {singleEvent.organizer?.profilePicture ? (
              <img
                src={
                  sponsorAndExhibitor.profilePicture
                    ? sponsorAndExhibitor.profilePicture
                    : "/svgs/profile.svg"
                }
                className="rounded-full mymd:w-[50px] mymd:h-[50px] w-[40px] h-[40px] object-cover "
              />
            ) : (
              <div class="mymd:w-[50px] mymd:h-[50px] w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center mr-2 text-white mymd:text-3xl text-lg font-medium">
                {sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData
                  .filter((ele, id) => {
                    return ele.eventId.toString() === eventsid.params.eventId;
                  })[0]
                  .companyName.charAt(0)}
              </div>
            )}

            <div className="mymd:text-2xl text-base font-medium mymd:mt-[16px] mt-[8px]">
              {
                sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                  (ele, id) => {
                    return ele.eventId.toString() === eventsid.params.eventId;
                  }
                )[0].companyName
              }
            </div>
            <div className="mymd:text-base text-xs font-normal text-[#727374] mymd:mt-[14px] mt-[6px]">
              {
                sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                  (ele, id) => {
                    return ele.eventId.toString() === eventsid.params.eventId;
                  }
                )[0].industry
              }
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
              No Exhibitors or Sponsors available...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingSponsors;