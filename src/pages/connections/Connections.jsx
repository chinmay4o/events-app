import React from "react";
import UnderConstruction from "../../common/underConstruction/UnderConstruction";
import TopMenu from "../../components/topMenu/TopMenu";

const Connections = () => {
  return (
    <div className="">
      {/* <Navbar /> */}
      <div className="pt-[60px] grid place-items-center">
        <TopMenu />
      </div>
      <div className="grid place-items-center h-[80vh] ">
        <div className="h-[40%] w-[40%] ">
          <UnderConstruction />
        </div>
      </div>
    </div>
  );
};

export default Connections;
