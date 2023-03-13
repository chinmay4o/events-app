// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Primarybtn from "../../../common/buttons/Primarybtn";
import TextInput from "../../../common/inputElements/TextInput";
import FileInput from "../../../common/inputElements/FileInput";
import { UPDATE_EVENT } from "../../../redux/constants/eventConstants";
import { useDispatch } from "react-redux";
import axios from "axios";
import throttle from "../../../utils/throttle";
import { useMatch } from "react-router-dom";

export default function AddSpeaker({
  open,
  setOpen,
  event,
  speakers,
  setSpeakers,
  isEdit,
  setIsEdit,
  singleSpeaker,
  setSingleSpeaker,
}) {
  const [profilePicture, setProfilePicture] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...singleSpeaker,
    },
    mode: "onChange",
  });
  useEffect(() => {
    if (!isEdit) {
      reset({
        firstName: "",
        lastName: "",
        jobTitle: "",
        organization: "",
        email: "",
        bio: "",
        linkedinUrl: "",
        profilePicture: "",
      });
    } else if (singleSpeaker?.firstName) {
      setProfilePicture(singleSpeaker.profilePicture);
      reset(singleSpeaker);
    }
    if (!open) {
      setProfilePicture("");
    }
  }, [singleSpeaker?.firstName, isEdit, open]);

  // useEffect(() => {
  //   setProfilePicture("");
  // }, [open]);

  const dispatch = useDispatch();
  const eventsid = useMatch("/events/:eventId");
  const onChange = (e) => {
    console.log("first-e.target.files[0]", e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/user/upload_picture`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setProfilePicture(response.data.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setProfilePicture(singleSpeaker.profilePicture);
    if (Object.values(data).length <= 0) {
      alert("please fill all the details");
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/event/${
            eventsid.params.eventId
          }/${isEdit ? "editSpeaker" : "registerSpeaker"}`,
          {
            method: isEdit ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: data.email,
              data: {
                userData: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  jobTitle: data.jobTitle,
                  organization: data.organization,
                  email: data.email.toLowerCase(),
                  linkedinUrl: data.linkedinUrl,
                  profilePicture: profilePicture,
                },
                eventSpecificData: {
                  eventId: eventsid.params.eventId,
                  eventSpecificRole: "speaker",
                  bio: data.bio,
                },
              },
            }),
          }
        );

        const allSpeakers = await response.json();
        if (response.status !== 200) {
          alert("Please add again!! some error occurred");
        }

        dispatch({
          type: UPDATE_EVENT,
          payload: {
            speakers: allSpeakers.message.speakers,
          },
        });

        setOpen(false);
        setIsEdit(false);
        setSingleSpeaker({
          firstName: "",
          lastName: "",
          jobTitle: "",
          organization: "",
          email: "",
          bio: "",
          linkedinUrl: "",
          profilePicture: "",
        });
        setIsSubmitting(false);
        reset();
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    }
  };

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
                          className="rounded-md hidden outline-none md:block text-gray-300"
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
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-3 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-[22px] pt-5 pb-4 font-[600] text-gray-900">
                          {!isEdit ? "Add a new speaker" : "Edit speaker"}
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit((data) =>
                            throttle(() => onSubmit(data), 5000)
                          )}
                          className="flex flex-col"
                        >
                          <TextInput
                            register={register}
                            type="url"
                            id={"linkedinUrl"}
                            placeholder="LinkedIn URL"
                            label="Linkedin URL"
                          />
                          {/* <div> */}
                          <TextInput
                            register={register}
                            disabled={isEdit ? true : false}
                            type="email"
                            id={"email"}
                            placeholder="Email Address"
                            label="Email"
                            required
                            errors={errors}
                            pattern={
                              /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i
                            }
                          />

                          {/* </div> */}
                          {/* <TextInput
                            register={register}
                            type="email"
                            id={"email"}
                            placeholder="Email Address"
                            label="Email"
                          /> */}
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
                            id={"organization"}
                            placeholder="Company/ Organization Name"
                            label="Company/ Organization Name"
                          />
                          <TextInput
                            register={register}
                            type="text"
                            id={"jobTitle"}
                            placeholder="Designation"
                            label="Designation"
                          />
                          <FileInput
                            profilePicture={profilePicture}
                            setProfilePicture={setProfilePicture}
                            label="Profile Picture"
                            mb="3"
                          />
                          {/* <input
                            type="file"
                            {...register("profilePicture", {
                              onChange: onChange,
                            })}
                            className="bg-[#f4f6f9] mb-[45px] rounded-[8px] text-[12px]"
                          /> */}
                          <TextInput
                            register={register}
                            type="text"
                            id={"bio"}
                            placeholder="Bio"
                            label="Bio"
                          />

                          {isEdit ? (
                            <input
                              disabled={isSubmitting}
                              value={
                                isSubmitting ? "Loading..." : "Save Changes"
                              }
                              type="submit"
                              className="primary_submit"
                            />
                          ) : (
                            <input
                              disabled={isSubmitting}
                              value={
                                isSubmitting ? "Loading..." : "Add Speaker"
                              }
                              type="submit"
                              className="primary_submit"
                            />
                          )}
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
