import React from "react";

const PageNotFound = () => {
  return (
    <div className="grid w-full place-items-center h-[250px]">
      <div>
        <img src="/svgs/nullState.svg" alt="" className="w-[500px] h-[500px]" />
        <p className="text-[25px] font-[500] text-[#717171]  text-center">
          404 Page Not Found
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
