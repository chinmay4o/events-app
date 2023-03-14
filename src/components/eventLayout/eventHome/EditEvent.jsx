// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editEvent } from "../../../redux/actions/eventActions";
import TextInput from "../../../common/inputElements/TextInput";
import FileInput from "../../../common/inputElements/FileInput";
import SmallTextInput from "../../../common/inputElements/SmallTextInput";
import TextArea from "../../../common/inputElements/TextArea";
import { getSingleEvent } from "../../../redux/actions/eventActions";
import axios from "axios";
import { useMatch, useNavigate } from "react-router-dom";

export default function EditEvent({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  singleEvent,
}) {
  // const [coverImage, setCoveredImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [eventLocation, setEventLocation] = useState({});
  // const [fileUploadLoader, setFileUploadLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    reset,
  } = useForm({
    defaultValues: {
      ...singleEvent,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (singleEvent.title) {
      setProfilePicture(singleEvent.coverImage);
      setEventLocation(singleEvent.location);
      reset({
        title: singleEvent.title,
        // location: singleEvent?.location.addressLine1,
        pincode: singleEvent?.location?.pincode,
        addressLine1: singleEvent?.location?.addressLine1,
        addressLine2: singleEvent?.location?.addressLine2,
        landmark: singleEvent?.location?.landmark,
        city: singleEvent?.location?.city,
        state: singleEvent?.location?.state,
        shortDescription: singleEvent.shortDescription,
      });
    }
  }, [open]);

  const navigate = useNavigate();
  const eventsId = useMatch("/events/:eventId");
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setEventLocation((prev) => {
      return {
        ...prev,
        pincode: data.pincode,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        landmark: data.landmark,
        city: data.city,
        state: data.state,
      };
    });

    const newLocation = {
      ...eventLocation,
      pincode: data.pincode,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
    };

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("please login!! access not found");
      navigate("/login");
    }

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/event/${eventsId.params.eventId}`,
        {
          ...data,
          coverImage: profilePicture,
          location: newLocation,
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        dispatch(getSingleEvent({ eventId: eventsId.params.eventId }));
        setOpen(false);
        reset({
          title: "",
          pincode: "",
          addressLine1: "",
          addressLine2: "",
          landmark: "",
          city: "",
          state: "",
          shortDescription: "",
        });
        setIsSubmitting(false);
      })
      .catch(function (error) {
        if (error.response.status === 403) {
          alert("Unauthorized!!");
          // router.push("/login");
        }
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={setOpen}>
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
                        <Dialog.Title className="text-[22px] pb-[25px] font-[600] text-gray-900">
                          Edit Event Info
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-5 flex-1 px-4 sm:px-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <TextInput
                            register={register}
                            type="text"
                            id={"title"}
                            label="Event Title"
                            placeholder="Event Title"
                            mb="3"
                          />
                          {/* <TextInput
                            register={register}
                            type="text"
                            id={"eventTag"}
                            label="Event Tag"
                            placeholder="Event Tag"
                          /> */}
                          {/* <input
                            type="file"
                            {...register("coverImage", {
                              onChange: onChange,
                            })}
                            className="bg-[#f4f6f9] mb-5 rounded-[10px]"
                          /> */}

                          <FileInput
                            profilePicture={profilePicture}
                            setProfilePicture={setProfilePicture}
                            label="Cover Image"
                            mb="11"
                          />

                          <TextArea
                            register={register}
                            type="text"
                            id={"shortDescription"}
                            label="Event description"
                            placeholder="Event description"
                          />
                          <div className="mb-[42px]"></div>

                          <p className="text-[13px] font-[500] mt-[22px]"></p>
                          <TextInput
                            type="text"
                            id="pincode"
                            placeholder="Pincode"
                            register={register}
                            maxLength={6}
                            required
                            label="Pincode"
                          />

                          <TextInput
                            type="text"
                            placeholder="Address line1"
                            id="addressLine1"
                            register={register}
                            required
                            label="AddressLine 1"
                          />

                          <TextInput
                            type="text"
                            id="addressLine2"
                            placeholder="Address line2"
                            register={register}
                            required
                            label="AddressLine 2"
                          />

                          <TextInput
                            type="url"
                            placeholder="Landmark"
                            id="landmark"
                            register={register}
                            required
                            label="Google Location URL"
                          />

                          <TextInput
                            type="text"
                            id="city"
                            placeholder="City"
                            register={register}
                            required
                            label="City"
                          />

                          <TextInput
                            type="text"
                            id="state"
                            placeholder="State"
                            register={register}
                            required
                            label="State"
                          />
                          {/* <p></p> */}
                          {/* </div> */}
                          <input
                            disabled={isSubmitting}
                            value={isSubmitting ? "Loading..." : "Save Changes"}
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
