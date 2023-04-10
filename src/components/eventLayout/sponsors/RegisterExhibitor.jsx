import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import FileInput from "../../../common/inputElements/FileInput";
import TextArea from "../../../common/inputElements/TextArea";
import throttle from "../../../utils/throttle";
import TextInput from "../../../common/inputElements/TextInput";
import { useMatch, useSearchParams } from "react-router-dom";

export default function RegisterExhibitor() {
  const [profilePicture, setProfilePicture] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const eventsId = useMatch("/events/:eventId/register-exhibitor");
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      companyName: searchParams.get("companyName"),
      email: searchParams.get("email"),
    },
    mode: "onChange",
  });

  if (!searchParams.get("companyId")) {
    alert("invalid company id");
  }

  async function onSubmit(data) {
    setIsSubmitting(true);

    if (Object.values(data).length <= 0) {
      alert("please fill all the details");
      return;
    } else if (!profilePicture) {
      alert("Please add profile picture");
      return;
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/event/${eventsId.params.eventId}/registerExhibitorAndSponsor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: data.email.toLowerCase(),
              data: {
                userData: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  organization: data.companyName,
                  jobTitle: data.jobTitle,
                  email: data.email,
                  linkedinUrl: data.linkedinUrl,
                  profilePicture: profilePicture,
                },
                eventSpecificData: {
                  companyId: searchParams.get("companyId"),
                  companyName: data.companyName,
                  jobTitle: data.jobTitle,
                  eventId: eventsId.params.eventId,
                  bio: data.bio,
                  eventSpecificRole: "exhibitorAndSponsor",
                },
              },
            }),
          }
        );

        const allSponsors = await response.json();
        console.log(allSponsors, "allSponsors- 72");
        if (allSponsors.code !== 200) {
          alert("some error occurred");
        }

        reset();
        setIsSubmitting(false);
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
              Join team {searchParams.get("companyName")}
            </p>
          </div>
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <TextInput
                register={register}
                type="url"
                id={"linkedinUrl"}
                placeholder="LinkedIn URL"
                label="Linkedin URL"
              />

              <TextInput
                register={register}
                // disabled="true"
                type="email"
                id={"email"}
                placeholder="Email Address"
                label="Company Email"
                errors={errors}
                required
                pattern={
                  /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i
                }
              />

              <TextInput
                register={register}
                type="text"
                id={"firstName"}
                placeholder="First Name"
                label="First Name"
              />

              <TextInput
                register={register}
                type="text"
                id={"lastName"}
                placeholder="Last Name"
                label="Last Name"
              />

              <TextInput
                register={register}
                type="text"
                disabled="true"
                id={"companyName"}
                label="Company Name"
                required
                placeholder="Company Name"
              />

              <TextInput
                register={register}
                type="text"
                id={"jobTitle"}
                label="Job Title"
                required
                placeholder="Job Title"
              />

              <FileInput
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                label="Profile Picture"
                mb="12"
              />

              <TextArea
                register={register}
                type="text"
                id={"bio"}
                label="Bio"
                placeholder="Bio"
              />
              <div className="mb-[42px]"></div>

              <input
                value={isSubmitting ? "Loading..." : "Join the team"}
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
