import { useEffect, useState } from "react";
import BottomBar from "../../components/bottomBar/BottomBar";
import UnderConstruction from "../../common/underConstruction/UnderConstruction";
import TopMenu from "../../components/topMenu/TopMenu";
import ScanIcon from "../../common/scanIcon/ScanIcon";
import UserEvents from "../../components/home/UserEvents";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";

const HomeEvents = () => {
  const [width, setWidth] = useState(1024);
  console.log("here");
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <div className="w-full">
      {width <= 768 ? (
        <>
          {/* <Navbar /> */}
          <UserEvents />
          <ScanIcon />
          {/* <BottomBar /> */}
          <AttendeeBottomBar />
        </>
      ) : (
        <>
          {/* <Navbar /> */}
          <div className="pt-[0px] grid place-items-center">
            {/* <TopMenu /> */}
          </div>
          <div className="grid place-items-center h-[80vh] ">
            <div className="h-[40%] w-[40%] ">
              <UnderConstruction />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeEvents;
