import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { CARRY_EVENT } from "../../../redux/constants/eventConstants";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../common/navbar/Navbar";
import Card from "../../../common/cards/Card";
import ProgressBar from "../../../common/progressBar/ProgressBar";
import TextInputPD from "../../../common/inputElements/TextInputPD";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimeInput from "../../../common/timeInput/TimeInput";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../common/inputElements/TextInput";

const CreateEvent = (props) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    console.log(date, "f + date");
  }, [date.startDate, date.endDate]);

  const [event, setEvent] = useState({
    title: "Globoil India 2022",
    startDate: "",
    endDate: "",
    startTime: "",
    description: "",
    location: { addressLine1: "" },
    coverImage:
      "https://d2xqcdy5rl17k2.cloudfront.net/images/default-landing-banner.png",
    eventTag: [],
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // title: `${userInfo.firstName}'s Demo Event`,
      // startDate: new Date().toISOString().slice(0, 10),
      // startTime: new Date().toLocaleTimeString()
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    if (!dateValue.startDate) {
      alert("Please select start date");
      setIsSubmitting(false);
    }
    if (!dateValue.endDate) {
      alert("Please select end date");
      setIsSubmitting(false);
    }
    if (!data.startTime) {
      alert("Please select start time");
      setIsSubmitting(false);
    }
    if (!data.endTime) {
      alert("Please select end time");
      setIsSubmitting(false);
    } else {
      setEvent((prevState) => {
        return { ...prevState, ...data };
      });
      console.log(date, "date = 12");
      dispatch({
        type: CARRY_EVENT,
        payload: {
          newEvent: { ...data, ...date },
          // newEvent: { ...data, ...dateValue },
        },
      });

      localStorage.setItem("createvent", JSON.stringify(data));
      props.setStep(2);
    }
  }

  return (
    <>
      <div className="h-[calc(100vh-58px)] grid justify-center content-center w-[1280px] mx-auto ">
        <Card>
          <form
            className="w-[370px] flex flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[24px] font-[700] block text-left w-full">
              Create new event
            </p>

            <ProgressBar width="25" />
            <div className=""></div>

            <TextInput
              type="text"
              placeholder="Event Name"
              id="title"
              required
              register={register}
              mb="4"
              label={"Event Name"}
            />

            <div className="flex space-x-8 mb-[20px]">
              <div className="relative">
                <label
                  htmlFor="startDate"
                  className="text-[12px] text-[#9c9c9c] absolute -top-[18px] left-[5px]"
                >
                  Start Date
                </label>
                <DatePicker
                  onChange={(value) => {
                    console.log(value, "+ startdate");
                    const date = new Date(value);
                    date.setHours(5, 30, 0, 0);
                    let isoString = date.toISOString();
                    console.log(isoString, "isoString + startdate");
                    // setDate({ ...date, startDate: isoString });
                    setDate((prev => {
                      return {
                        ...prev,  startDate: isoString 
                      }
                    }));
                    setDateValue({ ...dateValue, startDate: value });
                  }}
                  value={dateValue.startDate}
                  minDate={new Date()}
                  format="dMMMy"
                  // locale="hu-HU"
                />
              </div>

              <TimeInput
                required
                id="startTime"
                setValue={setValue}
                label={"Start Time"}
                isHalfWidth={true}
              />
            </div>
            <div className="flex space-x-8">
              <div className="relative">
                <label
                  htmlFor="endDate"
                  className="text-[12px] text-[#9c9c9c] absolute -top-[18px] left-[5px]"
                >
                  End Date
                </label>
                <DatePicker
                  onChange={(value) => {
                    console.log(value, "+ endDate");
                    const date = new Date(value);
                    date.setHours(5, 30, 0, 0);

                    let isoString = date.toISOString();
                    console.log(isoString, "isoString + endDate");
                    // setDate({startDate: date.startDate, endDate: isoString });
                    setDate((prev => {
                      return {
                        ...prev,  endDate: isoString 
                      }
                    }));
                    setDateValue({ ...dateValue, endDate: value });
                  }}
                  value={dateValue.endDate}
                  minDate={dateValue.startDate}
                  format="dMMMy"
                  // locale="hu-HU"
                />
              </div>
              <TimeInput
                required
                id="endTime"
                setValue={setValue}
                isHalfWidth={true}
                label={"End Time"}
              />
            </div>
            <input
              type="submit"
              value={isSubmitting ? "Loading..." : "Proceed ahead"}
              className="primary_submit"
              disabled={isSubmitting}
            />
            <span className="go_back_btn" onClick={() => navigate("/events")}>
              <i className="fa-solid fa-arrow-left"></i> Go Back
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateEvent;
