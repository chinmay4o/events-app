import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import FileInput from "../../../common/inputElements/FileInput";
import TextArea from "../../../common/inputElements/TextArea";
import throttle from "../../../utils/throttle";
import TextInput from "../../../common/inputElements/TextInput";
import { useMatch, useNavigate } from "react-router-dom";

export default function AddOrganzationForm() {
  const [companyLogo, setCompanyLogo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const eventsId = useMatch("/events/:eventId");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("please login!! access token not found");
    navigate("/login");
  }

  // onSubmit form create exhibitor organization
  async function onSubmit(data) {
    setIsSubmitting(true);

    if (Object.values(data).length <= 0) {
      alert("please fill all the details");
    } else {
      try {
        if (!companyLogo) {
          alert("please upload company logo");
          setIsSubmitting(false);
          return;
        }

        // adding data to the event model
        const updatedEvent = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/event/${eventsId.params.eventId}/addOrganization`,
          {
            exhibitorOrganizations: [
              //   ...singleEvent.exhibitorOrganizations,
              {
                ...data,
                logo: companyLogo,
                inviteTeam:
                  data.inviteTeam.length > 0 ? data.inviteTeam.split(",") : [],
              },
            ],
          },
          {
            headers: {
              Authorization: `bearer ${accessToken}`,
            },
          }
        );

        setIsSubmitting(false);
        reset();
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    }
  }

  return (
    <>
      <div className="grid place-items-center">
        <div className="w-[600px] flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
          <div className="px-4 sm:px-6">
            <p className="text-[22px] pt-2 pb-[10px] font-[600] text-gray-900">
              Add Exhibitor Organization
            </p>
          </div>
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            <form
              onSubmit={handleSubmit((data) =>
                throttle(() => onSubmit(data), 5000)
              )}
            >
              <TextInput
                register={register}
                type="text"
                id={"companyName"}
                label="Company Name"
                required
                placeholder="Company Name"
              />

              <TextInput
                register={register}
                type="email"
                id={"email"}
                placeholder="Email Address"
                label="Company Email"
                errors={errors}
                pattern={
                  /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i
                }
              />

              <TextInput
                register={register}
                type="url"
                id={"linkedinUrl"}
                placeholder="LinkedIn URL"
                label="Linkedin URL"
              />

              <FileInput
                profilePicture={companyLogo}
                setProfilePicture={setCompanyLogo}
                label="Company Logo"
                mb="12"
              />

              <TextInput
                register={register}
                type="url"
                id={"website"}
                required
                label="website link"
                placeholder="website link"
              />

              <TextArea
                register={register}
                type="text"
                id={"bio"}
                label="Bio"
                placeholder="Bio"
              />
              <div className="mb-[42px]"></div>

              <TextInput
                register={register}
                type="text"
                id={"industry"}
                label="Industry"
                required
                placeholder="Industry"
              />

              <TextArea
                register={register}
                type="text"
                id={"inviteTeam"}
                label="Invite team (with comma separated emails)"
                placeholder="Event description"
                mt="40px"
              />
              <div className="mb-[42px]"></div>

              <input
                value={isSubmitting ? "Loading..." : "Add Organization"}
                type="submit"
                className="primary_submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
