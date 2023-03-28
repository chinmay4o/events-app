import React, { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import LandingRegForm from "./LandingRegForm";
import LandingSchedule from "./LandingSchedule";
import LandingSpeakers from "./LandingSpeakers";
import LandingHost from "./LandingHost";
import LandingAbout from "./LandingAbout";
import LandingSocialBtn from "./LandingSocialBtn";
import moment from "moment";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import GoogleCalendar from "./GoogleCalendar";
import LinkedinReg from "./LinkedinReg";
import LandingSponsors from "./LandingSponsors";
import { Helmet } from "react-helmet";

const LandingPage = ({ singleEvent }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [popup, setPopup] = useState(false);
  const [copied, setCopied] = useState("");
  const xmas95 = new Date(singleEvent.startDate);
  const optionmymdonth = { month: "short" };
  const eventsId = useMatch("/event/:eventId");
  const [searchParams] = useSearchParams();
  const [googleCal, setGoogleCal] = useState(false);
  const [eventStatus, setEventStatus] = useState("upcoming");

  const optionsFull = { dateStyle: "full" }; // imp gets Friday, November 18, 2022
  const optionsWeekDay = { weekday: "long" }; // imp gets Friday, November 18, 2022

  useEffect(() => {
    console.log(navigator, "navigatior");
    if (popup) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(window.location.href);
  };

  const closeCopy = () => {
    setPopup(false);
    setCopied("");
  };

  return (
    <>
      <Helmet>
        <title>Flicker - {singleEvent?.title}</title>
        <link rel="icon" href={`${singleEvent?.coverImage}`} />
        <meta name="description" content={`${singleEvent?.shortDescription}`} />

        <meta property="og:type" content="website" />
        <meta name="og:title" content={`${singleEvent?.title}`} />
        <meta
          name="og:description"
          content={`${singleEvent?.shortDescription}`}
        />
        <meta name="og:image" content={`${singleEvent?.coverImage}`} />
        <meta property="og:url" content="https://app.chinmay.space" />
      </Helmet>

      <div className="pt-0 mymd:pt-18 mymd:mb-0 mx-auto mymd:grid place-items-center w-[93vw] mymd:max-w-[1440px] mymd:w-full mb-[100px] ">
        {/* {share Popup} */}
        {popup && (
          <div className="mymd:flex justify-center items-center mymd:fixed z-30 hidden">
            <div
              className="z-40 fixed bg-black w-[100vw] h-[100vh] top-0 opacity-70 flex justify-center items-center"
              onClick={closeCopy}
            ></div>
            <div className="mymd:w-[400px] h-[230px] bg-white z-50 mb-[1000px] rounded-lg p-5 ">
              <div className="h-[35px] font-semibold text-[20px] border-b-2 outline-offset-4 relative">
                Share This Event
                <span
                  className="absolute right-0 rounded-full bg-gray-200 cursor-pointer w-[28px] h-[28px]"
                  onClick={closeCopy}
                >
                  <div className="flex justify-center items-center text-gray-800 w-[28px] h-[28px]">
                    x
                  </div>
                </span>
                <div className="h-[85px] flex justify-evenly items-center mt-2">
                  <LandingSocialBtn />
                </div>
                <div className="h-[80px]">
                  <span className="font-normal text-[15px]">
                    Share the link:
                  </span>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly={true}
                      className="w-[280px] rounded-lg border-gray-300 shadow font-light text-[14px]"
                      value={window.location.href}
                      onClick={handleCopy}
                    />
                    <button
                      className="border rounded-lg bg-primary text-white text-[14px] ml-2 w-[75px] border-none"
                      onClick={handleCopy}
                    >
                      {copied === "" ? "Copy" : "Copied"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {Navbar}   */}
        <div className={styles.nav_parent}>
          <nav className={styles.navbar}>
            <div className={styles.logo}>
              <img src="/svgs/logo.svg" alt="logo" /> Flicker
            </div>
            <ul className={styles.menu_ul}>
              <li className={styles.nav_home}>
                <a
                  href=""
                  onClick={() =>
                    window.open("https://events.chinmay.space/login", "_blank")
                  }
                >
                  Login
                </a>
              </li>
              <img
                src="/svgs/profile.svg"
                className="w-[26px] h-[26px] object-cover cursor-pointer mymd:hidden"
                onClick={() =>
                  window.open("https://events.chinmay.space/login", "_blank")
                }
              />
            </ul>
          </nav>
        </div>

        {/* {title and coverImage} */}
        <div className="mymd:sticky mymd:top-0 z-20 mymd:bg-white mymd:mt-[0px] mb-[12px] mymd:h-[65px] mymd:grid place-items-center mt-[65px]">
          <div className="mymd:mr-0 mymd:w-[824px] mymd:flex mymd:mt-[0px] mt-0 mymd:flex items-center justify-between ">
            <h1 className="text-[22px] mymd:text-[24px] font-semibold">
              {" "}
              {singleEvent?.title}
            </h1>
            <div>
              <div className="hidden mymd:flex text-primary font-[600] items-center justify-between w-64">
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  {" "}
                  <img
                    src="/svgs/SharePurple.svg"
                    alt="share"
                    className="mr-2"
                  />{" "}
                  Share
                </span>
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => setGoogleCal(true)}
                >
                  <img
                    src="/svgs/calendar_monthcalendar.svg"
                    alt="calender"
                    className="mr-2"
                  />
                  Add to calender
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.img_div}>
          <img
            src={singleEvent?.coverImage}
            alt=""
            className={"w-full h-full rounded-md object-cover"}
          />
        </div>
        <div className="bg-white">
          {/* {event blocks} */}
          <div className="mymd:flex justify-between mymd:h-[136px] mymd:w-[824px] w-[100%] mymd:mb-4">
            {/* {1st item} */}
            <div className="mymd:w-[250px] bg-[#F5F5F5] rounded-xl mymd:p-5 flex h-[56px] mymd:h-[136px] mymd:flex-col mymd:items-start items-center">
              <span className="text-base text-[#727374] mymd:text-black mx-3 mymd:mx-0 font-medium ">
                Event By
              </span>
              <div className="flex items-center mymd:mt-2">
                {singleEvent.organizer?.profilePicture ? (
                  <img
                    src={singleEvent.organizer.profilePicture}
                    alt="user"
                    className="border h-9 w-9 rounded-full object-cover mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2 text-white text-lg font-medium uppercase">
                    {singleEvent.organizer.organization.charAt(0)}
                  </div>
                )}
                <span className="truncate font-normal">
                  {" "}
                  {singleEvent.organizer.organization}
                </span>
              </div>
            </div>

            {/* {2nd item} */}
            <div className="mymd:w-[300px] bg-[#F5F5F5] rounded-xl mymd:my-0 mymd:mx-2 my-2 mymd:p-5 flex h-[88px] mymd:h-[136px] mymd:flex-col mymd:items-start items-center">
              <span className="font-medium text-base text-[#727374] mymd:text-black mx-3 mymd:mx-0">
                Date & Time
              </span>
              <div>
                <span className="flex items-center cursor-pointer my-3 font-normal ">
                  {" "}
                  <img
                    src="/svgs/calender.svg"
                    alt="calender"
                    className="mr-2"
                  />{" "}
                  {singleEvent.startDate === singleEvent.endDate ? (
                    <>
                      {new Date(singleEvent.startDate).getDate()}{" "}
                      {new Intl.DateTimeFormat("en-US", optionmymdonth).format(
                        xmas95
                      )}
                    </>
                  ) : (
                    <>
                      {new Date(singleEvent.startDate).getDate()}{" "}
                      {new Intl.DateTimeFormat("en-US", optionmymdonth).format(
                        new Date(singleEvent.startDate)
                      )}{" "}
                      to {new Date(singleEvent.endDate).getDate()}{" "}
                      {new Intl.DateTimeFormat("en-US", optionmymdonth).format(
                        new Date(singleEvent.endDate)
                      )}
                    </>
                  )}
                </span>
                <span className="flex items-center cursor-pointer font-normal">
                  {" "}
                  <img src="/svgs/Accesstime.svg" alt="time" className="mr-2" />
                  {moment(singleEvent?.startDate).format("LT")} to{" "}
                  {moment(singleEvent?.endDate).format("LT")}
                </span>
              </div>
            </div>

            {/* {3rd item} */}
            <div className="mymd:w-[414px] bg-[#F5F5F5] rounded-xl mymd:p-5 flex h-[88px] mymd:h-[136px] mymd:flex-col mymd:items-start items-center pr-2 mymd:pr-0">
              <span className="font-medium text-base text-[#727374] mymd:text-black mx-3 mymd:mx-0">
                Location
              </span>
              <span
                className="flex cursor-pointer font-normal mymd:w-[302px] text-primary underline mymd: mt-[10px]"
                onClick={() => {
                  window.open(singleEvent.location?.landmark, "_blank");
                }}
              >
                <img
                  src="/svgs/Location.svg"
                  alt="location"
                  className="mr-1 h-[24px]"
                />
                {singleEvent.location?.addressLine1},{" "}
                {singleEvent.location?.pincode}, {singleEvent.location?.city},{" "}
                {singleEvent.location?.state}
              </span>
            </div>
            <div className="mymd:hidden flex text-primary justify-around h-10 mt-4 font-bold text-xs">
              <span
                className="flex items-center justify-center cursor-pointer border  w-[180px] rounded border-primary"
                onClick={() => {
                  setPopup(true);
                }}
              >
                {" "}
                <img
                  src="/svgs/SharePurple.svg"
                  alt="share"
                  className="mr-2"
                />{" "}
                Share
              </span>
              <span
                className="flex items-center cursor-pointer justify-center cursor-pointer border w-[180px] rounded border-primary"
                onClick={() => setGoogleCal(true)}
              >
                <img
                  src="/svgs/calendar_monthcalendar.svg"
                  alt="calender"
                  className="mr-2"
                />
                Add to calender
              </span>
            </div>
          </div>
        </div>

        {/* {tabs} */}
        <div className={styles.modules_grid}>
          <div className={styles.modules_box1}>
            <div className={styles.modules_bar} id="module">
              <div
                onClick={() => {
                  navigate(
                    `/event/${eventsId.params.eventId}?tab=${"register"}`
                  );
                }}
                style={
                  searchParams.get("tab") === "register" ||
                  searchParams.get("tab") === "registerlinkedin" ||
                  searchParams.get("tab") === null
                    ? { color: "black" }
                    : {}
                }
                className={
                  searchParams.get("tab") === "register" ||
                  searchParams.get("tab") === "registerlinkedin" ||
                  searchParams.get("tab") === null
                    ? "font-[600] underline underline-offset-8 decoration-black decoration-2"
                    : {}
                }
              >
                Register
              </div>
              <div
                onClick={() => {
                  navigate(`/event/${eventsId.params.eventId}?tab=${"about"}`);
                }}
                style={
                  searchParams.get("tab") === "about" ? { color: "black" } : {}
                }
                className={
                  searchParams.get("tab") === "about" &&
                  "font-[600] underline underline-offset-8 decoration-black decoration-2"
                }
              >
                About
              </div>
              <div
                onClick={() => {
                  navigate(
                    `/event/${eventsId.params.eventId}?tab=${"schedule"}`
                  );
                }}
                style={
                  searchParams.get("tab") === "schedule"
                    ? { color: "black" }
                    : {}
                }
                className={
                  searchParams.get("tab") === "schedule" &&
                  "font-[600] underline underline-offset-8 decoration-black decoration-2"
                }
              >
                Schedule
              </div>
              {singleEvent.speakers.length === 0 ? (
                <></>
              ) : (
                <div
                  onClick={() => {
                    navigate(
                      `/event/${eventsId.params.eventId}?tab=${"speakers"}`
                    );
                  }}
                  style={
                    searchParams.get("tab") === "speakers"
                      ? { color: "black" }
                      : {}
                  }
                  className={
                    searchParams.get("tab") === "speakers" &&
                    "font-[600] underline underline-offset-8 decoration-black decoration-2"
                  }
                >
                  Speakers
                </div>
              )}
              {singleEvent.exhibitorAndSponsors.length === 0 ? (
                <></>
              ) : (
                <div
                  onClick={() => {
                    navigate(
                      `/event/${eventsId.params.eventId}?tab=${"sponsors"}`
                    );
                  }}
                  style={
                    searchParams.get("tab") === "sponsors"
                      ? { color: "black" }
                      : {}
                  }
                  className={
                    searchParams.get("tab") === "sponsors" &&
                    "font-[600] underline underline-offset-8 decoration-black decoration-2"
                  }
                >
                  Sponsors
                </div>
              )}

              <div
                onClick={() => {
                  navigate(
                    `/event/${eventsId.params.eventId}?tab=${"contact"}`
                  );
                }}
                style={
                  searchParams.get("tab") === "contact"
                    ? { color: "black" }
                    : {}
                }
                className={
                  searchParams.get("tab") === "contact" &&
                  "font-[600] underline underline-offset-8 decoration-black decoration-2"
                }
              >
                Contact
              </div>
            </div>
            <div className={styles.modules_box1_render}>
              {searchParams.get("tab") === "schedule" ? (
                <LandingSchedule singleEvent={singleEvent} />
              ) : searchParams.get("tab") === "registerlinkedin" ? (
                isRegistered ? (
                  <div className="mymd:w-[600px] w-[100%] h-[450px] pt-2">
                    <div className="flex">
                      <img
                        src="/svgs/Checkcircle.svg"
                        alt="check"
                        className="mr-1 rounded-full m-[-4px]"
                      />
                      <div className="text-[16px]">
                        You have successfully registered for{" "}
                        {singleEvent?.title}!
                        <br />
                        Please use this QR code to check-in to the event.
                      </div>
                    </div>
                    <span
                      className="flex items-center justify-center cursor-pointer cursor-pointer border w-[170px] h-[40px] rounded border-primary ml-12 mb-7 mt-3"
                      onClick={() => setGoogleCal(true)}
                    >
                      <img
                        src="/svgs/calendar_monthcalendar.svg"
                        alt="calender"
                        className="mr-2"
                      />
                      Add to calender
                    </span>
                    You will also receive an invite on your submitted email ID.
                    <br />
                    <div className="mt-3">
                      Did not receive? Please check your spam folder.
                      <br />
                      Or{" "}
                      <span className="text-primary font-normal	underline cursor-pointer">
                        click here to resend the invite
                      </span>
                    </div>
                  </div>
                ) : (
                  <LinkedinReg
                    setIsRegistered={setIsRegistered}
                    isRegistered={isRegistered}
                  />
                )
              ) : searchParams.get("tab") === "register" ? (
                isRegistered ? (
                  <div className="mymd:w-[600px] w-[100%] h-[450px] pt-2">
                    <div className="flex">
                      <img
                        src="/svgs/Checkcircle.svg"
                        alt="check"
                        className="mr-1 rounded-full m-[-4px]"
                      />
                      <div className="text-[16px]">
                        You have successfully registered for{" "}
                        {singleEvent?.title}!
                        <br />
                        Please use the QR code to check-in to the event.
                      </div>
                    </div>
                    <span
                      className="flex items-center justify-center cursor-pointer cursor-pointer border w-[170px] h-[40px] rounded border-primary ml-12 mb-7 mt-3"
                      onClick={() => setGoogleCal(true)}
                    >
                      <img
                        src="/svgs/calendar_monthcalendar.svg"
                        alt="calender"
                        className="mr-2"
                      />
                      Add to calender
                    </span>
                    You will also receive an invite on your submitted email ID.
                    <br />
                    <div className="mt-3">
                      Did not receive? Please check your spam folder.
                      <br />
                    </div>
                  </div>
                ) : (
                  <LandingRegForm
                    setIsRegistered={setIsRegistered}
                    isRegistered={isRegistered}
                  />
                )
              ) : searchParams.get("tab") === "speakers" ? (
                <LandingSpeakers singleEvent={singleEvent} />
              ) : searchParams.get("tab") === "sponsors" ? (
                <LandingSponsors singleEvent={singleEvent} />
              ) : searchParams.get("tab") === "contact" ? (
                <LandingHost singleEvent={singleEvent} />
              ) : searchParams.get("tab") === "about" ? (
                <LandingAbout singleEvent={singleEvent} />
              ) : isRegistered ? (
                <div className="mymd:w-[600px] w-[100%] h-[450px] pt-2">
                  <div className="flex">
                    <img
                      src="/svgs/Checkcircle.svg"
                      alt="check"
                      className="mr-1 rounded-full m-[-4px]"
                    />
                    <div className="text-[16px]">
                      You have successfully registered for {singleEvent?.title}!
                      <br />
                      Please use the QR code to check-in to the event.
                    </div>
                  </div>
                  <span
                    className="flex items-center justify-center cursor-pointer cursor-pointer border w-[170px] h-[40px] rounded border-primary ml-12 mb-7 mt-3"
                    onClick={() => setGoogleCal(true)}
                  >
                    <img
                      src="/svgs/calendar_monthcalendar.svg"
                      alt="calender"
                      className="mr-2"
                    />
                    Add to calender
                  </span>
                  You will also receive an invite on your submitted email ID.
                  <br />
                  <div className="mt-3">
                    Did not receive? Please check your spam folder.
                    <br />
                  </div>
                </div>
              ) : (
                <LandingRegForm
                  setIsRegistered={setIsRegistered}
                  isRegistered={isRegistered}
                />
              )}
            </div>
          </div>
          <div className={styles.modules_box2}></div>
        </div>

        {/* {GooogleCalender Popup} */}
        {googleCal ? (
          <GoogleCalendar
            singleEvent={singleEvent}
            setGoogleCal={setGoogleCal}
          />
        ) : (
          <></>
        )}

        {/* {footer} */}
        <div className={styles.footer_box}>
          <p className="hover:text-primary">Help</p>
          <p
            onClick={() => navigate("/events")}
            className="hover:text-primary hover:font-[500]"
          >
            Events
          </p>
          <p></p>
          <p className="hover:text-primary">Mail Us</p>
          <p></p>
        </div>
        {searchParams.get("tab") !== "register" &&
        searchParams.get("tab") !== "registerlinkedin" &&
        searchParams.get("tab") !== null ? (
          <div className="fixed bottom-0 h-[74px] z-20 w-[93%] mymd:w-[100%] flex mymd:justify-end items-center justify-center bg-white mymd:bg-transparent border shadow mymd:border-none rounded-t-xl ">
            <button
              type="submit"
              className="bg-primary w-[170px] h-[40px] text-white font-bold text-mymd rounded mymd:mr-4"
              onClick={() => {
                navigate(`/event/${eventsId.params.eventId}?tab=${"register"}`);
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default LandingPage;
