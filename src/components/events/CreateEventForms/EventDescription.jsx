import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CARRY_EVENT } from "../../../redux/constants/eventConstants";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../redux/actions/eventActions";
import Navbar from "../../../common/navbar/Navbar";
import Card from "../../../common/cards/Card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../../common/progressBar/ProgressBar";

const EventDescription = (props) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createEventB = useSelector((state) => state.createdEvent);
  const { loading, error, createdEvent, newEvent, location, shortDescription } =
    createEventB;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shortDescription: `Tell us more about the event, what is the event about? How long have you been doing this Event?`,
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    dispatch(
      createEvent({
        ...newEvent,
        startDate: new Date(
          moment(newEvent.startDate).format("ll") + " " + newEvent.startTime
        ),
        endDate: new Date(
          moment(newEvent.endDate).format("ll") + " " + newEvent.endTime
        ),
        location: location,
        shortDescription: data.shortDescription,
      })
    );
    return;
  }

  useEffect(() => {
    //to redirect on same event dashboard
    if (createdEvent?.newEventConfig?._id) {
      setIsSubmitting(true);
      navigate(`/events/${createdEvent.newEventConfig._id}?show=eventInfo`);
    }
  }, [createdEvent?.newEventConfig?._id]);

  return (
    <>
      <div className="grid  justify-center content-center w-full sm:max-w-[1280px] mx-auto min-h-[calc(100vh-58px)]">
        <Card>
          <form
            className="w-[340px] flex flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[23px] font-[700] block text-left w-full">
              Tell us more about your event
            </p>

            <ProgressBar width="100" step={4} />

            <textarea
              rows={4}
              cols={50}
              // className="bg-gray-100 border-0 rounded-[10px] focus:outline-slate-50"
              className="border-none text-[14px] font-medium rounded-[10px] bg-[#F4F6F9] outline-none focus:border focus:border-bg-[rgb(189, 189, 189)] focus:outline-none"
              placeholder="Event description..."
              {...register("shortDescription", {
                required: true,
              })}
              // value={event.description}
              // onChange={(e) => {
              //   setEvent({ ...event, description: e.target.value });
              //   console.log(event);
              // }}
            ></textarea>
            <input
              type="submit"
              value={isSubmitting ? "Launching your event..." : "Create Event"}
              className="primary_submit"
              disabled={isSubmitting}
            />
            <div className="-mt-[20px] spacer"></div>
            <span className="go_back_btn" onClick={() => props.setStep(3)}>
              <i className="fa-solid fa-arrow-left"></i> Go Back
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EventDescription;
