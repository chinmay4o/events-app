import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { patchRequest } from "../../../utils/API/api.ts";
import DefaultProfilePicture from "../../../common/defaultProfilePicture/DefaultProfilePicture";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";

const ListOrganizations = ({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  singleCompany,
  setSingleCompany,
}) => {
  const [organizations, setOrganizations] = useState([]);

  const singleEvent = useSelector((state) => state.eventData);
  const eventsId = useMatch("/events/:eventId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (singleEvent.exhibitorOrganizations) {
      setOrganizations(singleEvent.exhibitorOrganizations);
    }
  }, [singleEvent.exhibitorOrganizations]);

  return (
    <>
      {organizations?.length > 0 ? (
        organizations.map((company, key) => (
          <>
            <div className="my-4 flex justify-between">
              <div className="flex items-center">
                {company?.logo ? (
                  <img
                    alt="logo"
                    src={company.logo}
                    className="rounded-full mymd:w-[50px] mymd:h-[50px] w-[40px] h-[40px] object-cover "
                  />
                ) : (
                  <div className=" ">
                    <DefaultProfilePicture
                      firstName={"E"}
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
                    {company.companyName}
                  </div>
                  <div className="text-sm font-medium py-1 text-gray-500">
                    {company.industry}
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2.5 mr-6 items-center">
                <img
                  src="/svgs/Edit.svg"
                  alt="edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setIsEdit(true);
                    setSingleCompany({
                      _id: company._id,
                      logo: company.logo,
                      companyName: company.companyName,
                      email: company.email,
                      website: company.website,
                      linkedinUrl: company.linkedinUrl,
                      bio: company.bio,
                      industry: company.industry,
                      inviteTeam : company.inviteTeam
                    });
                  }}
                />
                <img
                  src="/svgs/Delete.svg"
                  alt="delete"
                  className="w-6 h-6 cursor-pointer"
                  onClick={async () => {
                    let newCompanyArray;
                    setOrganizations((prev) => {
                      newCompanyArray = organizations.filter((ele, id) => {
                        return ele._id !== company._id;
                      });
                      return newCompanyArray;
                    });

                    console.log(newCompanyArray);
                    const updatedEvent = await patchRequest(
                      `/event/${eventsId.params.eventId}`,
                      {
                        exhibitorOrganizations: newCompanyArray,
                      }
                    );

                    dispatch({
                      type: UPDATE_EVENT,
                      payload: {
                        exhibitorOrganizations:
                          updatedEvent.data.savedEventConfig
                            .exhibitorOrganizations,
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
    </>
  );
};

export default ListOrganizations;
