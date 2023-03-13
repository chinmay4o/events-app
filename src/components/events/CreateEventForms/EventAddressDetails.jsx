import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CARRY_EVENT } from "../../../redux/constants/eventConstants";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../common/navbar/Navbar";
import Card from "../../../common/cards/Card";
import ProgressBar from "../../../common/progressBar/ProgressBar";
import TextInput from "../../../common/inputElements/TextInput";
import Select from "../../../common/inputElements/Select";
import { eventCategories } from "../../../helper/constant";

const EventAddressDetails = (props) => {
  const [apiStatus, setApiStatus] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventType, seteventType] = useState();
  const [value1, setValue1] = useState([]);
  const [options, setOptions] = useState([]);
  const [event, setEvent] = useState({
    title: "Globoil India 2022",
    startDate: "",
    endDate: "",
    description: "",
    location: {
      addressLine1: "",
      addressLine2: "",
      Landmark: "",
      pincode: "",
      city: "",
      state: "",
    },
    coverImage:
      "https://d2xqcdy5rl17k2.cloudfront.net/images/default-landing-banner.png",
    eventTag: [],
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    if (watch().pincode?.length === 6) {
      getStateAndCityByPincode();
    }
  }, [watch().pincode]);

  const getStateAndCityByPincode = async () => {
    const addressDetailsResponse = await fetch(
      `https://api.postalpincode.in/pincode/${watch().pincode}`
    );
    const addressDetails = await addressDetailsResponse.json();
    if (addressDetails[0].Status !== "Success") {
      setApiStatus(false);
      return;
    }
    setApiStatus(true);
    setValue("state", addressDetails[0].PostOffice[0].State);
    setValue("city", addressDetails[0].PostOffice[0].District);
  };

  const createEventB = useSelector((state) => state.createdEvent);
  const { loading, error, createdEvent, newEvent, location, shortDescription } =
    createEventB;

  async function onSubmit(data) {
    setIsSubmitting(true);
    console.log(errors);
    if (value1.length === 0) {
      alert("Please select atleast one Event Type");
      setIsSubmitting(false);
      return;
    }
    dispatch({
      type: CARRY_EVENT,
      payload: {
        newEvent: newEvent,
        location: data,
      },
    });

    if (watch().eventOnline) {
      props.setStep(4);
    } else {
      props.setStep(5);
    }
  }
  useEffect(() => {
    const eventType = JSON.parse(localStorage.getItem("showtype"));
    seteventType(eventType);
    const eventValue = [
      {
        label: eventType,
        value: "one",
      },
    ];
    setValue1(eventValue);
    setValue("eventValue", eventValue);
    console.log(eventType);
  }, [eventType, eventCategories]);

  console.log(eventCategories);
  useEffect(() => {
    if (eventCategories?.length > 0) {
      const speakerOptions = eventCategories?.map((category) => {
        return {
          label: category.name,
          value: "one",
        };
      });
      setOptions(speakerOptions);
    }
  }, [eventCategories]);
  console.log(value1);
  return (
    <>
      <div className="grid  justify-center content-center w-full sm:max-w-[1280px] mx-auto min-h-screen]">
        <Card>
          <form
            className="w-[340px] flex flex-col gap-[10px] md:pb-[40px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[23px] font-[600] block text-left w-full">
              Location of the event?
            </p>

            <ProgressBar width="50" step={2} />
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="mb-4">
              <Select
                multiple
                register={register}
                id={"selectSpeaker"}
                options={options}
                value={value1}
                onChange={(event) => {
                  console.log(event);
                  setValue("eventType", event);
                  setValue1(event);
                }}
              />
            </div>

            <TextInput
              type="text"
              label="Address"
              id="addressLine1"
              register={register}
              required
            />

            <TextInput
              type="url"
              label="Google Location URL"
              id="landmark"
              required
              register={register}
            />

            {/* <TextInput
              type="text"
              id="pincode"
              label="Pincode"
              register={register}
             maxLength={6}
              required
            /> 

            <TextInput
              type="text"
              label="Address line 1"
              id="addressLine1"
              register={register}
              required
            />

            <TextInput
              type="text"
              id="addressLine2"
              label="Address line 2"
              register={register}
              required
            />

            <TextInput
              type="url"
              label="Google Location URL"
              id="landmark"
              required
              register={register}
            />

            <TextInput
              type="text"
              id="city"
              label="City"
              register={register}
              required
            />

            <TextInput
              type="text"
              id="state"
              label="State"
              register={register}
              required
            /> */}

            {/* <p className="text-[13px] font-normal	text-[#A55EEA] mb-[15px] -mt-[20px]">
              <span className="inline-block w-[283px]">
                This event is an online event
              </span>
              <label
                htmlFor="default-toggle"
                className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  {...register("eventOnline")}
                />
                <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></span>
              </label>
            </p> */}
            <div className="-mt-[20px] spacer"></div>
            <input
              type="submit"
              value={isSubmitting ? "Loading..." : "Proceed ahead"}
              className="primary_submit"
              disabled={isSubmitting}
            />
            <div className="mt-[3px] spacer"></div>
            <span className="go_back_btn" onClick={() => props.setStep(2)}>
              <i className="fa-solid fa-arrow-left"></i> Go Back
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EventAddressDetails;
