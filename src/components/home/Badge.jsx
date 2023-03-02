// import { Router } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getUserDetails } from "../../redux/actions/userActions";
import { getAuthenticatedRequest } from "../../utils/API/api.ts";

const Badge = () => {
  const [searchParams] = useSearchParams();
  const [badge, setBadge] = useState("");
  useEffect(() => {
    fetch();
  }, [searchParams]);

  async function fetch() {
    const response = await getAuthenticatedRequest("/user");

    const eventSpecificData =
      response.data.savedUserConfig.attendee?.eventSpecificData;

    let eventSpecificAttendee;
    if (eventSpecificData) {
      eventSpecificAttendee = await eventSpecificData.find((ele) => {
        return ele.eventId === searchParams.get("eventId");
      });
    }
    if (eventSpecificAttendee) setBadge(eventSpecificAttendee?.badgeUrl);
  }

  return (
    <div className="flex items-center min-h-[150px] justify-center">
      {badge ? (
        <img src={badge} className="py-5" />
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

export default Badge;
