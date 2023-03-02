import React, { useState } from "react";
import CreateEventsForm from "../../components/events/CreateEventForms/CreateEventsForm";

const EventsCreate = () => {
  const [step, setStep] = useState(1);
  return <CreateEventsForm step={step} setStep={setStep} />;
};

export default EventsCreate;
