import React from "react";

const LandingAttendees = ({ singleEvent }) => {
  return (
    <div className="mt-5 mb-5">
      <h3>Attendees</h3>
      {singleEvent.speakers && singleEvent.speakers.length > 0 ? (
        singleEvent.speakers.map((speaker, key) => (
          <div className="my-4 flex" key={key}>
            <img src="/speaker.png" />
            <div className="ml-2">
              <div className="text-[14px] font-semibold py-1">
                {speaker.firstName} {speaker.lastName}
              </div>
              <div className="text-sm font-medium py-1 text-gray-500">
                {speaker.jobTitle}, {speaker.organization}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[12px] font-[600]">Loading...</p>
      )}
    </div>
  );
};

export default LandingAttendees;
