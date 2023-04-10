//@ts-nocheck
import React, { useState, useEffect } from "react";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { patchRequest } from "../../../utils/API/api.ts";
import { useMatch } from "react-router-dom";
import DefaultProfilePicture from "../../../common/defaultProfilePicture/DefaultProfilePicture";
import AddExhibitorOrganization from "./AddExhibitorOrganization";
import ListOrganizations from "./ListOrganizations";
import AddSponsors from "./AddSponsors";

function Sponsors() {
  const [openSponsor, setOpenSponsor] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditCompany, setIsEditCompany] = useState(false);
  const [singleSponsor, setSingleSponsor] = useState({});
  const [singleCompany, setSingleCompany] = useState({});
  const [sponsorAndExhibitors, setSponsorAndExhibitors] = useState([]);

  const singleEvent = useSelector((state) => state.eventData);
  const eventsId = useMatch("/events/:eventId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (singleEvent.exhibitorOrganizations) {
      let allExhibitors = [];
      //  = singleEvent.exhibitorOrganizations.map(
      //   (organization, index) => {
      //     console.log(organization, "organization 30");
      //     return organization.exhibitorAndSponsors.map((exhibitor, index) => {
      //       console.log(exhibitor, "exhibitor 30");
      //       return exhibitor;
      //     });
      //   }
      // );
      for (let i = 0; i < singleEvent?.exhibitorOrganizations.length; i++) {
        for (
          let j = 0;
          j < singleEvent.exhibitorOrganizations[i].exhibitorAndSponsors.length;
          j++
        ) {
          allExhibitors.push(
            singleEvent.exhibitorOrganizations[i].exhibitorAndSponsors[j]
          );
        }
      }
      console.log(allExhibitors, "allExhibitors + 32");
      setSponsorAndExhibitors(allExhibitors);
    }
  }, [singleEvent.exhibitorOrganizations]);

  return (
    <div className="w-full md:w-[422px] md:ml-[0px] md:mt-[0px] pb-5">
      <div className="py-0">
        <div className="font-[600] w-[335px] mx-auto md:w-[422px] text-[20px] pt-2.5 text-black md:flex items-center justify-between fixed bg-white z-10 min-h-[82px]">
          <p className="text-[19px]">Exhibitors / Sponsors</p>
          <div className="w-[335px] md:w-[200px]">
            <PrimaryButton
              btnText={"Add more sponsors"}
              onClick={() => {
                setOpenCompany(true);
              }}
            />
          </div>
        </div>
        <div className="mt-5 mb-[30px] w-[355px] mx-auto md:w-[430px] overflow-y-auto pt-[75px] absolute pb-[50px] min-h-[400px]">
          <ListOrganizations
            open={openCompany}
            setOpen={setOpenCompany}
            isEdit={isEditCompany}
            setIsEdit={setIsEditCompany}
            singleCompany={singleCompany}
            setSingleCompany={setSingleCompany}
          />
          {sponsorAndExhibitors?.length < 0
            ? sponsorAndExhibitors.map((sponsorAndExhibitor, key) => (
                <>
                  <div className="my-4 flex justify-between">
                    <div className="flex items-center">
                      {sponsorAndExhibitor?.profilePicture ? (
                        <img
                          alt="profile"
                          src={sponsorAndExhibitor.profilePicture}
                          className="rounded-full mymd:w-[50px] mymd:h-[50px] w-[40px] h-[40px] object-cover "
                        />
                      ) : (
                        <div className=" ">
                          <DefaultProfilePicture
                            firstName={sponsorAndExhibitor.firstName.charAt(0)}
                            lastName={" "}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "300px",
                              fontSize: "18px",
                            }}
                          />
                        </div>
                      )}
                      <div className="pl-2.5 w-[197px]">
                        <div className="text-[14px] font-semibold py-1">
                          {
                            sponsorAndExhibitor.exhibitorAndSponsor.eventSpecificData.filter(
                              (ele, id) => {
                                return (
                                  ele.eventId.toString() ===
                                  eventsId.params.eventId
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
                                  eventsId.params.eventId
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
                            if (ele.eventId === eventsId.query.eventId) {
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
                            `/event/${eventsId.params.eventId}`,
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
            : null}
        </div>

        <AddExhibitorOrganization
          open={openCompany}
          setOpen={setOpenCompany}
          singleCompany={singleCompany}
          setSingleCompany={setSingleCompany}
          isEdit={isEditCompany}
          setIsEdit={setIsEditCompany}
          singleEvent={singleEvent}
        />

        {/* <AddSponsors
          open={open}
          setOpen={setOpen}
          singleSponsor={singleSponsor}
          setSingleSponsor={setSingleSponsor}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        /> */}
      </div>
    </div>
  );
}

export default Sponsors;
