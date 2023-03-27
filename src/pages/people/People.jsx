import React, { useEffect, useState } from "react";
import PeopleCompo from "../../components/people/PeopleCompo";
import ScanIcon from "../../common/scanIcon/ScanIcon";
import BottomBar from "../../components/bottomBar/BottomBar";
import UnderConstruction from "../../common/underConstruction/UnderConstruction";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";
import Attendees from "../../components/people/Attendees";

const People = () => {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <div className="w-full">
      {width <= 768 ? (
        <>
          {/* <Attendees /> */}
          <PeopleCompo />
          {/* <AttendeeBottomBar /> */}
        </>
      ) : (
        <div className="">
          {/* <Navbar /> */}
          <div className="grid place-items-center">{/* <TopMenu /> */}</div>
          <div className="grid place-items-center h-[80vh] ">
            <div className="h-[40%] w-[40%] ">
              <UnderConstruction />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default People;
