import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Card from "../../common/cards/Card";
import Navbar from "../../common/navbar/Navbar";
import ProgressBar from "../../common/progressBar/ProgressBar";
import TextInput from "../../common/inputElements/TextInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/actions/eventActions";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import TimeInput from "../../common/timeInput/TimeInput";

const LoginDemoEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const createEventB = useSelector((state) => state.createdEvent);
  const {
    loadingA,
    errorA,
    createdEvent,
    newEvent,
    location,
    shortDescription,
  } = createEventB;

  const [event, setEvent] = useState({
    title: "Explore Warpbay 2023",
    startDate: "",
    endDate: "",
    description: "",
    shortDescription: `Tell us more about the event, 
    what is the event about? 
    How long have you been doing this Event?`,
    location: {
      addressLine1: "Oberoi Commerz",
      addressLine2: "Andheri East",
      Landmark: "",
      pincode: "411600",
      city: "Mumbai",
      state: "Maharashtra",
    },
    coverImage:
      "https://d2xqcdy5rl17k2.cloudfront.net/images/default-landing-banner.png",
    eventTag: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: userInfo?.firstName
        ? `${userInfo.firstName} Explores Warpbay`
        : `Explore Warpbay 2023`,
      //   startTime: new Date().toLocaleTimeString(),
      // startTime: null,
    },
  });

  function onSubmit(data) {
    setIsSubmitting(true);
    if (!data.startTime) {
      alert("Please select event start time");
      setIsSubmitting(false);
      return;
    }
    if (!dateValue) {
      alert("Please select event start date");
      setIsSubmitting(false);
      return;
    }
    dispatch(
      createEvent({
        ...event,
        isMockEvent: true,
        title: data.title, //only first letter bing sent fix
        startDate: new Date(
          `${moment(dateValue).format("ll")}, ${data.startTime}`
        ).toISOString(),
      })
    );
  }

  useEffect(() => {
    //to redirect on same event dashboard
    if (createdEvent?.newEventConfig?._id) {
      setIsSubmitting(true);
      navigate(`/events/${createdEvent?.newEventConfig?._id}`);
    }
  }, [createdEvent?.newEventConfig?._id]);

  return (
    <>
      {/* {isSubmitting && <Loader />} */}
      <div
        className={`grid justify-center content-center max-w-[1280px] mx-auto min-h-[calc(100vh-58px)]`}
      >
        <Card>
          <form
            className="w-[370px] flex flex-col gap-[6px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[23px] font-[600] block text-left w-full mb-[10px]">
              Create your demo event
            </p>

            <ProgressBar step={3} />
            <div className="h-[25px]"></div>
            <TextInput
              type="text"
              placeholder="Event Name"
              id="title"
              required
              register={register}
              label="Event Name"
            />

            <div className="grid grid-cols-2 gap-[60px] mt-[5px] mb-[25px] ">
              <div className="relative">
                <label
                  htmlFor="startDate"
                  className="text-[12px] text-[#979797] absolute -top-[18px] left-[5px]"
                >
                  Start Date
                </label>
                <DatePicker
                  onChange={(value) => setDateValue(value)}
                  value={dateValue}
                  format="dMMMy"
                  minDate={dateValue}
                />
              </div>
              <TimeInput
                register={register}
                required={true}
                setValue={setValue}
                id="startTime"
                label="Start Time"
                isHalfWidth={false}
              />
            </div>

            <input
              type="submit"
              value={
                isSubmitting
                  ? "Launching your event..."
                  : "Take me to the demo event"
              }
              className="primary_submit"
              disabled={isSubmitting}
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginDemoEvent;
