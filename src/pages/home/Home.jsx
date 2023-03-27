import { useEffect, useState } from "react";
import BottomBar from "../../components/bottomBar/BottomBar";
import UnderConstruction from "../../common/underConstruction/UnderConstruction";
import TopMenu from "../../components/topMenu/TopMenu";
import ScanIcon from "../../common/scanIcon/ScanIcon";
import UserHome from "../../components/home/UserHome";
import AttendeeBottomBar from "../../components/attendeeEvent/AttendeeBottomBar";

const Home = () => {
  return (
    <div className="w-full">
      <div className="max-w-[450px] mx-auto md:flex hidden">
        {/* <Navbar /> */}
        <UserHome />
        <ScanIcon />
        {/* <BottomBar /> */}
        <AttendeeBottomBar />
      </div>
      <>
        {/* <Navbar /> */}
        {/* <div className="md:hidden ">
          <div className=" grid place-items-center ">
            <TopMenu />
          </div>
          <div className="grid place-items-center h-[80vh] ">
            <div className="h-[40%] w-[40%] ">
              <UnderConstruction />
            </div>
          </div>
        </div> */}
      </>
    </div>
  );
};

export default Home;
