import ChooseCategoryEvents from "./ChooseCategoryEvents";
import CreateEvent from "./CreateEvent";
import EventAddressDetails from "./EventAddressDetails";
import EventDescription from "./EventDescription";
import EventHosted from "./EventHosted";

const CreateEventsForm = (props) => {
  switch (props.step) {
    case 1:
      return <CreateEvent setStep={props.setStep} />;
    case 2:
      return <ChooseCategoryEvents setStep={props.setStep} />;
    case 3:
      return <EventAddressDetails setStep={props.setStep} />;
    case 4:
      return <EventHosted setStep={props.setStep} />;
    case 5:
      return <EventDescription setStep={props.setStep} />;
    default:
      return <CreateEvent setStep={props.setStep} />; //Change the default case to 404 page
  }
};

export default CreateEventsForm;
