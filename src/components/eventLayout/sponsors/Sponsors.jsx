//@ts-nocheck
import React, { useState, useEffect } from "react";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import AddSponsor from "./AddSponsor";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { patchRequest } from "../../../utils/API/api.ts";
import { useMatch } from "react-router-dom";

function Sponsors() {
  const [open, setOpen] = useState(false);
  const [isExhibitor, setIsExhibitor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [singleSchedule, setSingleSchedule] = useState({});
  const [schedule, setSchedule] = useState([]);

  const [singleSponsor, setSingleSponsor] = useState({});
  const [sponsorAndExhibitors, setSponsorAndExhibitors] = useState([]);

  const event = useSelector((state) => state.eventData);
  const eventsid = useMatch("/events/:eventId");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(navigator.onLine, "online status");
    console.log(navigator, "online status");
    // console.log(
    //   event.exhibitorAndSponsors,
    //   "event.sponsorAndExhibitors-event.sponsorAndExhibitors"
    // );
    if (event.exhibitorAndSponsors) {
      setSponsorAndExhibitors(event.exhibitorAndSponsors);
      console.log(
        event.exhibitorAndSponsors,
        "event.sponsorAndExhibitors-event.sponsorAndExhibitors"
      );
    }
  }, [event.exhibitorAndSponsors]);

  return (
    <div className="w-full md:w-[422px] md:ml-[30px] md:mt-[25px]">
      <div className="py-0">
        {/* <div className="flex justify-between items-center w-[335px] md:w-[422px] mx-auto md:mx-0">
          <span className="text-[22px] w-[267px] pt-2.5 md:pt-0 md:w-[314px] font-[600]">
            {event.title}
          </span>
          <div className="flex gap-x-2.5">
            <img
              src="/svgs/Edit.svg"
              alt="edit"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setOpen(true)}
            />
            <img src="/svgs/Settings.svg" alt="edit" className="cursor-pointer" />
          </div>
        </div> */}
        <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[19px] pt-2.5 text-[#585858]">
          Sponsors/ Exhibitors
        </div>
        <div className="mt-5 mb-[30px] w-[335px] mx-auto md:w-[430px] overflow-y-auto h-[250px] scrollbar">
          {sponsorAndExhibitors?.length > 0 ? (
            sponsorAndExhibitors.map((sponsorAndExhibitor, key) => (
              <>
                <div className="my-4 flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={
                        sponsorAndExhibitor.profilePicture
                          ? sponsorAndExhibitor.profilePicture
                          : "/svgs/profile.svg"
                      }
                      className="rounded-full w-[50px] h-[50px] object-cover"
                    />
                    <div className="pl-2.5 w-[197px]">
                      <div className="text-[14px] font-semibold py-1">
                        {
                          sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                            (ele, id) => {
                              return (
                                ele.eventId.toString() ===
                                eventsid.params.eventId
                              );
                            }
                          )[0].companyName
                        }
                      </div>
                      <div className="text-sm font-medium py-1 text-gray-500">
                        {
                          sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                            (ele, id) => {
                              return (
                                ele.eventId.toString() ===
                                eventsid.params.eventId
                              );
                            }
                          )[0].industry
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-2.5 mr-6 items-center">
                    {/* <img
                      src="/svgs/Edit.svg"
                      alt="edit"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        let bio = "";
                        sponsorAndExhibitor.exhibitorAndSponsor?.eventSpecificData.find(
                          (ele) => {
                            if (ele.eventId === router.query.eventId) {
                              bio = ele.bio;
                            }
                          }
                        );
                        setOpen(true);
                        setIsEdit(true);
                        setSingleSponsor({
                          firstName: sponsorAndExhibitor.firstName,
                          lastName: sponsorAndExhibitor.lastName,
                          email: sponsorAndExhibitor.email,
                          bio: bio,
                          linkedinUrl: sponsorAndExhibitor.linkedinUrl,
                          profilePicture: sponsorAndExhibitor.profilePicture,
                        });
                      }}
                    /> */}
                    <img
                      src="/svgs/Delete.svg"
                      alt="delete"
                      className="w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        let newExhibitorArray;
                        setSponsorAndExhibitors((prev) => {
                          newExhibitorArray = sponsorAndExhibitors.filter(
                            (ele, id) => {
                              console.log(ele._id);
                              console.log(sponsorAndExhibitor._id);
                              return ele._id !== sponsorAndExhibitor._id;
                            }
                          );
                          return newExhibitorArray;
                        });

                        console.log(newExhibitorArray);
                        const updatedEvent = await patchRequest(
                          `/event/${event._id}`,
                          {
                            exhibitorAndSponsors: newExhibitorArray,
                          }
                        );

                        dispatch({
                          type: UPDATE_EVENT,
                          payload: {
                            exhibitorAndSponsors: newExhibitorArray,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-[325px] md:w-[422px]">
                  <hr />
                </div>
              </>
            ))
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

          {/* <div className="my-4 flex items-center">
            <img
              src="/sponsor.png"
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="pl-2 w-[250px]">
              <div className="text-xs font-semibold py-1">Smart Rubiks</div>
              <div className="text-xs font-medium py-1 text-gray-500">
                Intelligent camera systems
              </div>
            </div>
            <div className="flex">
              <img
                src="/svgs/Edit.svg"
                alt="edit"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setOpen(true)
                }}
              />
              <img
                src="/svgs/Delete.svg"
                alt="delete"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div> */}
        </div>

        <div className="w-[335px] md:w-[340px] mx-auto ">
          <PrimaryButton
            btnText={"Add more sponsors"}
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        {/* <div className="w-[335px] md:w-[422px] mx-auto md:mx-0 ">
          <SecondaryButton
            btnText={"Upload CSV"}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </div>

        <div className="w-[335px] mx-auto md:w-[422px]">
          <span className="text-primary font-normal text-sm cursor-pointer pt-5">
            Download the CSV format
          </span>
        </div> */}

        <AddSponsor
          open={open}
          setOpen={setOpen}
          singleSponsor={singleSponsor}
          setSingleSponsor={setSingleSponsor}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </div>
    </div>
  );
}

export default Sponsors;
