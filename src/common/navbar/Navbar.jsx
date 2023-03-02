import React, { useState } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./Navbar.module.css";
import RegistrationSearch from "./RegistrationSearch";
import SpeakerSearch from "./SpeakerSearch";
import TopMenu from "../../components/topMenu/TopMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const checkinpage = useMatch("events/:eventId/registrations");
  const [showSideMenu, setShowSideMenu] = useState(false);

  let regex = /\blogin\b/i;

  const shadowStyle = {
    borderBottom: "1px solid #efefef",
  };

  if (checkinpage) {
    return null;
  }
  return (
    <div className="w-full fixed z-20 bg-white" style={shadowStyle}>
      <div
        className={`px-6 w-full md:max-w-[1440px] md:h-[58px] h-[52px] mx-auto flex items-center justify-between`}
      >
        <div className="flex  gap-x-[50px]">
          <div
            className={"flex items-center gap-x-[3px] cursor-pointer "}
            onClick={() => navigate("/events")}
          >
            <img
              src="/svgs/logo.svg"
              alt="logo"
              className=" h-[24px] w-[24px] md:h-[35px] md:w-[35px]"
            />
            <p className="text-[20px] md:text-[23px] font-[600] relative">
              Warpbay
              <span className="inline-flex absolute -right-[28px] -top-[2px] h-[14px] justify-center items-center px-[6px] py-[2px] ml-3 text-[6px] font-medium text-gray-800 bg-gray-200 rounded-[2px] dark:bg-gray-700 dark:text-gray-300">
                Beta
              </span>
            </p>
          </div>
          {searchParams.get("show") === "registrations" && (
            <RegistrationSearch />
          )}
          {searchParams.get("show") === "speakers" && <SpeakerSearch />}
        </div>

        {!regex.test(location.pathname) ? (
          <div className="absolute right-0">
            <TopMenu />
          </div>
        ) : null}
        <div
          className={`text-[30px] cursor-pointer visible md:invisible`}
          onClick={() => setShowSideMenu(!showSideMenu)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
