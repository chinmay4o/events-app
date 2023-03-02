import React from "react";
import { useNavigate } from "react-router-dom";

const ScanIcon = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/connections/scan");
      }}
      className="h-[50px] w-[50px] rounded-[25px] flex justify-center items-center bg-primary mb-14 md:mb-[20px] fixed right-3 bottom-0"
    >
      <i className="fas fa-qrcode w-[50px] h-[50px] relative top-[12.5px] left-[13.5px] text-[25px] text-white"></i>
    </div>
  );
};

export default ScanIcon;
