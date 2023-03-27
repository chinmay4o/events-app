import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/userActions";
import { useMatch } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "tailwindcss/tailwind.css";

const Layout = () => {
  const dispatch = useDispatch();
  const eventsId = useMatch("/event/:eventId");
  const attendeeEvents = useMatch("/attendee/*");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, savedUserConfig } = userDetails;
  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    dispatch(getUserDetails({ accessToken: accessToken }));
  }, [savedUserConfig?._id]);
  return (
    <>
      {eventsId ? null : <Navbar />}
      <div
        className={
          eventsId || attendeeEvents
            ? "pt-0 mymd:pt-18 mymd:mb-0 mx-auto mymd:grid place-items-center w-[93vw] mymd:max-w-[1440px] mymd:w-full mb-[100px] hidden"
            : "pt-1 md:pt-14 md:mb-0 mx-auto grid place-items-center min-w-[312px] max-w-[422px] w-full md:max-w-[1440px] md:w-full mb-14"
        }
      ></div>
    </>
  );
};

export default Layout;
{
  /* <div className={`mb-14 ${router.pathname === "/event/[eventId]" ? "pt-0" : "pt-14"} md:pt-18 md:mb-0 mx-auto grid place-items-center min-w-[312px] max-w-[422px] w-full md:max-w-[1440px] md:w-full`}> */
}
