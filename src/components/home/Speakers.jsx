import { useEffect, useState } from "react";
// import RandomImageGenerator from "../../common/Image/RandomImageGenerator";
import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";
const SpeakersTab = ({ speakers }) => {
  const [eventSpeakers, setEventSpeakers] = useState([]);
  useEffect(() => {
    setEventSpeakers(speakers);
  }, [speakers]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-[300px]">
      {eventSpeakers && eventSpeakers.length > 0 ? (
        eventSpeakers.map((speaker, index) => (
          <>
            <div
              className="mt-5 flex flex-start items-center"
              onClick={() => navigate(`/connections/user?uid=${speaker?._id}`)}
            >
              {speaker.profilePicture ? (
                <img
                  src={speaker.profilePicture}
                  className="h-[50px] w-[50px] rounded-[50%] object-cover"
                />
              ) : (
                // <RandomImageGenerator name={speaker.firstName} />
                <DefaultProfilePicture
                  firstName={speaker.firstName}
                  lastName={speaker.lastName}
                  style={{ height: "45px", width: "45px", borderRadius: "50%" }}
                />
              )}
              <div className="pl-2.5 flex flex-col">
                <span className="font-medium text-[14px]">
                  {speaker.firstName} {speaker.lastName}
                </span>
                <span className="font-medium text-sm text-black text-opacity-50">
                  {speaker.jobTitle}
                  {speaker.jobTitle && speaker.organization ? ", " : ""}
                  {speaker.organization}
                </span>
              </div>
            </div>
            <div className="w-full mt-2.5 bg-[#CFCFCF]">
              <hr />
            </div>
          </>
        ))
      ) : (
        <img
          src="/svgs/nullState.svg"
          height={250}
          width={250}
          className="py-5 pt-10 mb-12"
        />
      )}
    </div>
  );
};

export default SpeakersTab;
