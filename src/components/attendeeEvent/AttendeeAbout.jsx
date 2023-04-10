import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserDetails } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import AttendeeBadgePopup from "./AttendeeBadgePopup";
import DefaultProfilePicture from "../../common/defaultProfilePicture/DefaultProfilePicture";

const AttendeeAbout = ({ singleEvent }) => {
  const navigate = useNavigate();
  const [tab, settab] = useState("");
  const [badegExpand, setBadegExpand] = useState(false);
  const dispatch = useDispatch();
  const eventsId = useMatch("/attendee/:eventId/*");
  const userDetails = useSelector((state) => state.userDetails);
  const { savedUserConfig } = userDetails;
  const now = new Date().getTime();
  useEffect(() => {
    // generateText(prompt);
    let accessToken = localStorage.getItem("accessToken");
    dispatch(getUserDetails({ accessToken: accessToken }));
  }, [savedUserConfig?._id]);
  const xmas95 = new Date(singleEvent?.startDate);
  const optionmymdonth = { month: "short" };

  return (
    <div className="w-full min-h-[90vh] bg-[#F5F5F5] md:ml-[17%] md:w-[83%] md:bg-white md:min-h-full">
      <div className="w-full h-[60px] fixed top-0 bg-white flex items-center px-[16px] border-b border-[#EDEDED] md:mt-[60px] md:hidden">
        <img
          src="/svgs/Arrowleft.svg"
          className="w-[24px] h-[24px] object-cover cursor-pointer"
          onClick={() => navigate("/events")}
        />
        <p className="ml-2 text-[22px] font-[500] overflow-hidden overflow-ellipsis whitespace-nowrap w-[95%]">
          {singleEvent?.title}
        </p>
      </div>

      {badegExpand && (
        <AttendeeBadgePopup
          setBadegExpand={setBadegExpand}
          badegExpand={badegExpand}
          savedUserConfig={savedUserConfig}
          singleEvent={singleEvent}
        />
      )}
      <div className="mt-[60px] mx-[16px] pt-[16px] md:pt-1 md:mt-[50px] pb-[90px]">
        <img
          src={singleEvent?.coverImage}
          alt="coverimage"
          className="h-[194px] w-full rounded-[10px] shadow md:hidden"
        />
        <div className="w-full md:hidden">
          <div className="font-[500] text-[22px] mt-[8px] text-[#121212]">
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap  w-[97%]">
              {singleEvent?.title}
            </p>
          </div>
          <div className="flex text-[12px] text-[#727374] font-normal mt-[4px]">
            <img
              src="/svgs/calender.svg"
              alt="location"
              className="h-[16px] mr-[5px] md:h-[21px]"
            />
            <span>
              {(() => {
                try {
                  if (
                    new Date(singleEvent.startDate)
                      .toString()
                      .substring(0, 10)
                      .slice(-10) ===
                    new Date(singleEvent.endDate)
                      .toString()
                      .substring(0, 10)
                      .slice(-10)
                  ) {
                    return (
                      <>
                        {new Date(singleEvent.startDate).getDate()}{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(new Date(singleEvent.startDate))}
                      </>
                    );
                  } else {
                    return (
                      <>
                        {new Date(singleEvent.startDate).getDate()}{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(new Date(singleEvent.startDate))}{" "}
                        to {new Date(singleEvent.endDate).getDate()}{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                        }).format(new Date(singleEvent.endDate))}
                      </>
                    );
                  }
                } catch (error) {
                  console.error(error);
                  return null;
                }
              })()}
            </span>
            <span>
              &nbsp;| {moment(singleEvent?.startDate).format("LT")} |&nbsp;
            </span>
            {new Date(
              new Date(singleEvent?.endDate).toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              })
            ).getTime() <= now ? (
              <span className="font-semibold text-[#E74C3C]">Ended</span>
            ) : new Date(
                new Date(singleEvent?.startDate).toLocaleString("en-US", {
                  timeZone: "Asia/Kolkata",
                })
              ).getTime() <= now ? (
              <span className="font-semibold text-[#2ECC71]">Ongoing</span>
            ) : (
              <span className="font-semibold text-primary">Upcoming</span>
            )}
          </div>

          <div className="flex text-[12px] text-[#727374] font-normal my-[9px] items-center w-[95%]">
            <img
              src="/svgs/Location.svg"
              alt="location"
              className="h-[18px] w-[18px] mr-[5px] ml-[-3px]"
            />
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {singleEvent.location?.addressLine1},{" "}
              {singleEvent.location?.pincode}, {singleEvent.location?.city},{" "}
              {singleEvent.location?.state}
            </p>
          </div>
        </div>

        <div
          className="h-[130px] w-full bg-gradient-to-b from-primary to-[#7F2ECD] rounded-[10px] mt-[24px] shadow cursor-pointer md:w-[350px] md:h-[130px] flex flex-col justify-center pl-5 md:pl-3.5"
          onClick={() => setBadegExpand(true)}
        >
          <div className="mb-1">
            <p className="text-sm font-[400] text-white md:text-[14px]">
              Tap to expand your badge
            </p>
            <div className="flex mt-[10px] md:mt-[10px]">
              <img
                src="/svgs/scanner.svg"
                alt="Scanner"
                className="h-[64px] w-[64px] rounded-[4px] md:w-[80px] md:h-[80px] object-contain"
              />

              <div className="h-[64px] flex flex-col justify-between ml-3 md:h-[80px] md:ml-4">
                <span className="text-white font-500 text-[16px] md:text-[20px]">
                  {savedUserConfig?.firstName} {savedUserConfig?.lastName}
                </span>
                <span className="text-white font-400 text-[12px] md:text-[14px]">
                  Event badge
                </span>
                <span className="text-white font-400 text-[12px] md:text-[14px]">
                  {" "}
                  {(() => {
                    try {
                      if (
                        new Date(singleEvent.startDate).getDate() ===
                        new Date(singleEvent.endDate).getDate()
                      ) {
                        return (
                          <>
                            {new Date(singleEvent.startDate).getDate()}{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                            }).format(new Date(singleEvent.startDate))}
                          </>
                        );
                      } else {
                        return (
                          <>
                            {new Date(singleEvent.startDate).getDate()}{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                            }).format(new Date(singleEvent.startDate))}{" "}
                            to {new Date(singleEvent.endDate).getDate()}{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "short",
                            }).format(new Date(singleEvent.endDate))}
                          </>
                        );
                      }
                    } catch (error) {
                      console.error(error);
                      return null;
                    }
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full flex my-[20px] md:mt-[30px]">
          <span
            className={
              tab === "about" || tab === ""
                ? `font-[700] text-[#1C1C1E] text-[16px] underline underline-offset-8 cursor-pointer decoration-black decoration-2`
                : `font-[500] text-[#C5C5C7] text-[16px]  cursor-pointer`
            }
            onClick={() => settab("about")}
          >
            About
          </span>
          <span
            className={
              tab === "exhibitors"
                ? `font-[700] text-[#1C1C1E] text-[16px] underline underline-offset-8 cursor-pointer decoration-black decoration-2 mx-[30px]`
                : `font-[500] text-[#C5C5C7] text-[16px]  cursor-pointer mx-[30px]`
            }
            onClick={() => settab("exhibitors")}
          >
            Exhibitors
          </span>
          <span
            className={
              tab === "sponsors"
                ? `font-[700] text-[#1C1C1E] text-[16px] underline underline-offset-8 cursor-pointer decoration-black decoration-2`
                : `font-[500] text-[#C5C5C7] text-[16px]  cursor-pointer`
            }
            onClick={() => settab("sponsors")}
          >
            Sponsors
          </span>
        </div>
        {tab === "about" ? (
          <div className="text-[#1C1C1E] font-[400] text-sm  whitespace-pre-wrap md:text-[16px] md:w-[60%]">
            {singleEvent?.shortDescription}
          </div>
        ) : tab === "sponsors" || tab === "exhibitors" ? (
          <div className="mymd:flex justify-between flex-wrap w-full md:w-[60%] ">
            {singleEvent?.exhibitorAndSponsors?.length > 0 ? (
              singleEvent?.exhibitorAndSponsors.map(
                (sponsorAndExhibitor, key) => (
                  <div className="mymd:w-[292px] mymd:h-[184px] bg-white rounded-xl mb-3 p-[20px] h-[128px] md:border">
                    {sponsorAndExhibitor.profilePicture ? (
                      <img
                        src={sponsorAndExhibitor.profilePicture}
                        className="rounded-full mymd:w-[50px] mymd:h-[50px] w-[40px] h-[40px] object-cover "
                      />
                    ) : (
                      <DefaultProfilePicture
                        firstName={sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData
                          .filter((ele, id) => {
                            return (
                              ele.eventId.toString() === eventsId.params.eventId
                            );
                          })[0]
                          .companyName.charAt(0)}
                        lastName={" "}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "300px",
                          fontSize: "14px",
                        }}
                      />
                    )}

                    <div className="mymd:text-2xl text-base font-medium mymd:mt-[16px] mt-[8px] font-[500]">
                      {
                        sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                          (ele, id) => {
                            return (
                              ele.eventId.toString() === eventsId.params.eventId
                            );
                          }
                        )[0].companyName
                      }
                    </div>
                    <div className="mymd:text-base text-[12px] font-[400] text-[#727374] mymd:mt-[14px] mt-[6px]">
                      {
                        sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                          (ele, id) => {
                            return (
                              ele.eventId.toString() === eventsId.params.eventId
                            );
                          }
                        )[0].industry
                      }
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="grid w-full place-items-center h-[250px]">
                <div>
                  <img
                    src="/svgs/nullState.svg"
                    alt=""
                    className="w-[200px] h-[200px]"
                  />
                  <p className="text-[15px] font-[500] text-[#717171]  text-center">
                    No Exhibitors or Sponsors available...
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-[#1C1C1E] font-[400] text-sm  whitespace-pre-wrap md:text-[16px] md:w-[60%]">
            {singleEvent?.shortDescription}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeAbout;
