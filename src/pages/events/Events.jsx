import React from "react";
import ScanIcon from "../../common/scanIcon/ScanIcon";
import AllEvents from "../../components/events/AllEvents";
// import Navbar from "../../src/common/Navbar/Navbar";
// import TopMenu from "../../src/features/Events/components/TopMenu";
// import { getRequest } from "../../src/utils/API/api";

function Events() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center flex-col items-center w-full mx-auto bg-white">
        {/* <TopMenu /> */}
        <AllEvents />
        {/* <ScanIcon /> */}
      </div>
    </>
  );
}

export default Events;
