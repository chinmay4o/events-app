import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../../common/buttons/PrimaryButton";
import Toggle from "../../../common/inputElements/Toggle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import FileInput from "../../../common/inputElements/FileInput";
import TextArea from "../../../common/inputElements/TextArea";
import throttle from "../../../utils/throttle";
import TextInput from "../../../common/inputElements/TextInput";
import { useMatch } from "react-router-dom";

export default function AddSponsor({
  open,
  setOpen,
  singleSponsor,
  setSingleSponsor,
  isEdit,
  setIsEdit,
}) {
  const [isExhibitor, setIsExhibitor] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const eventsId = useMatch("/events/:eventId");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...singleSponsor,
      firstName: "Exhibitor",
      LastName: "Exhibitor",
    },
    mode: "onChange",
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    setProfilePicture(singleSponsor.profilePicture);
    if (Object.values(data).length <= 0) {
      alert("please fill all the details");
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/event/${
            eventsId.params.eventId
          }/${
            isEdit ? "editExhibitorAndSponsor" : "registerExhibitorAndSponsor"
          }`,
          {
            method: isEdit ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: data.email.toLowerCase(),
              data: {
                userData: {
                  firstName: "Exhibitor",
                  lastName: "Exhibitor",
                  //   jobTitle: data.jobTitle,
                  organization: data.organization,
                  email: data.email,
                  linkedinUrl: data.linkedinUrl,
                  profilePicture: profilePicture,
                },
                eventSpecificData: {
                  companyName: data.companyName,
                  industry: data.industry,
                  category: data.category,
                  webLink: data.webLink,
                  eventId: eventsId.params.eventId,
                  eventSpecificRole: "exhibitorAndSponsor",
                  bio: data.bio,
                },
              },
            }),
          }
        );

        const allSponsors = await response.json();
        console.log(allSponsors, "allSponsors-allSponsors-allSponsors");
        dispatch({
          type: UPDATE_EVENT,
          payload: {
            exhibitorAndSponsors: allSponsors.message.exhibitorsAndSponsors,
          },
        });

        setOpen(false);
        setIsEdit(false);
        setSingleSponsor({
          firstName: "",
          lastName: "",
          email: "",
          linkedinUrl: "",
          bio: "",
          profilePicture: "",
          companyName: "",
          industry: "",
          category: "",
          webLink: "",
          eventId: eventsId.params.eventId,
          eventSpecificRole: "exhibitorAndSponsor",
        });
        reset();
        setIsSubmitting(false);
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    }
  }
  console.log(errors, "Errors");

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-40 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="z-40 fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-[45px] md:left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md outline-none hidden md:block text-gray-300"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>X
                          {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                        </button>
                        <button
                          className="md:hidden flex items-center"
                          onClick={() => setOpen(false)}
                        >
                          <i className="fa fa-angle-left text-[24px]"></i>
                          <span className="text-[17px] pt-0.5">Back</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-[22px] pt-2 pb-[10px] font-[600] text-gray-900">
                          Add a new Sponsor
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit((data) =>
                            throttle(() => onSubmit(data), 5000)
                          )}
                        >
                          <TextInput
                            register={register}
                            type="url"
                            id={"linkedinUrl"}
                            placeholder="LinkedIn URL"
                            label="Linkedin URL"
                          />

                          <TextInput
                            register={register}
                            disabled={isEdit ? true : false}
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
                          {/* 
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
                          /> */}
                          {/* 
                          <input
                            type="file"
                            {...register("profilePicture", {
                              onChange: onChange,
                            })}
                            className="bg-[#f4f6f9] mb-[45px] rounded-[8px] text-[12px]"
                          /> */}

                          <TextInput
                            register={register}
                            type="text"
                            id={"companyName"}
                            label="Company Name"
                            required
                            placeholder="Company Name"
                          />

                          <FileInput
                            profilePicture={profilePicture}
                            setProfilePicture={setProfilePicture}
                            label="Company Logo"
                            mb="12"
                          />

                          <TextInput
                            register={register}
                            type="url"
                            id={"webLink"}
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

                          <TextInput
                            register={register}
                            type="text"
                            id={"category"}
                            label="Category"
                            required
                            placeholder="Category"
                          />
                          {/* <div className="flex justify-between my-4	">
                            <div className="text-sm text-primary font-normal">
                              Also an Exhibitor?
                            </div>
                            <Toggle
                              isChecked={isExhibitor}
                              setIsChecked={setIsExhibitor}
                            />
                          </div> */}

                          {/* {isExhibitor ? (
                            <TextInput
                              register={register}
                              type="text"
                              id={"exhibitorDetails"}
                              label="Exhibitor Details"
                              placeholder="Exhibitor Details"
                            />
                          ) : (
                            []
                          )} */}

                          <input
                            value={
                              isSubmitting
                                ? "Loading..."
                                : "Add Exhibitor/Sponsor"
                            }
                            type="submit"
                            className="primary_submit"
                          />
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
