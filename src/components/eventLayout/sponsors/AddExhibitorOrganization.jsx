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

export default function AddExhibitorOrganization({
  open,
  setOpen,
  singleCompany,
  setSingleCompany,
  isEdit,
  setIsEdit,
  singleEvent,
}) {
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
    defaultValues: {
      ...singleCompany,
    },
    mode: "onChange",
  });

  // edit purpose
  useEffect(() => {
    if (!open) {
      reset({
        logo: "",
        companyName: "",
        email: "",
        website: "",
        linkedinUrl: "",
        bio: "",
        industry: "",
        inviteTeam: [],
      });
    }
    if (singleCompany?.companyName) {
      setCompanyLogo(singleCompany.logo);
      reset({
        ...singleCompany,
        inviteTeam: singleCompany.inviteTeam.join(","),
      });
    }
    if (!open) {
      setCompanyLogo("");
      setSingleCompany({});
      setIsEdit(false);
    }
  }, [singleCompany?.companyName, open, isEdit]);

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

        if (!isEdit) {
          for (let i = 0; i < singleEvent?.exhibitorOrganizations.length; i++) {
            if (data.email === singleEvent?.exhibitorOrganizations[i].email) {
              alert("company email already exists");
              return;
            }
          }
        }

        if (isEdit) {
          let exhibitorOrganizationsCopy =
            singleEvent.exhibitorOrganizations.filter(
              (ele, index) => singleCompany._id !== ele._id
            );

          exhibitorOrganizationsCopy = [
            ...exhibitorOrganizationsCopy,
            {
              ...data,
              logo: companyLogo,
              inviteTeam: data.inviteTeam.split(","),
            },
          ];

          console.log(
            exhibitorOrganizationsCopy,
            "exhibitorOrganizationsCopy 85"
          );

          // editing data to the event model
          const updatedEvent = await axios.patch(
            `${process.env.REACT_APP_SERVER_URL}/event/${eventsId.params.eventId}/addOrganization`,
            {
              exhibitorOrganizations: [...exhibitorOrganizationsCopy],
            },
            {
              headers: {
                Authorization: `bearer ${accessToken}`,
              },
            }
          );

          dispatch({
            type: UPDATE_EVENT,
            payload: {
              exhibitorOrganizations:
                updatedEvent.data.savedEventConfig.exhibitorOrganizations,
            },
          });

          setOpen(false);
          setIsEdit(false);
          setIsSubmitting(false);
          reset();
        } else {
          // adding data to the event model
          const updatedEvent = await axios.patch(
            `${process.env.REACT_APP_SERVER_URL}/event/${eventsId.params.eventId}/addOrganization`,
            {
              exhibitorOrganizations: [
                ...singleEvent.exhibitorOrganizations,
                {
                  ...data,
                  logo: companyLogo,
                  inviteTeam: data.inviteTeam.length > 0 ?  data.inviteTeam.split(",") : [],
                },
              ],
            },
            {
              headers: {
                Authorization: `bearer ${accessToken}`,
              },
            }
          );

          dispatch({
            type: UPDATE_EVENT,
            payload: {
              exhibitorOrganizations:
                updatedEvent.data.savedEventConfig.exhibitorOrganizations,
            },
          });

          setOpen(false);
          setIsEdit(false);
          setIsSubmitting(false);
          reset();
        }
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    }
  }

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
                          Add Exhibitor Organization
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
                            type="text"
                            id={"companyName"}
                            label="Company Name"
                            required
                            placeholder="Company Name"
                          />

                          <TextInput
                            register={register}
                            disabled={isEdit ? true : false}
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
                            value={
                              isSubmitting
                                ? "Loading..."
                                : isEdit
                                ? "Save Changes"
                                : "Add Organization"
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
