import { useState } from "react";
import { eventCategories } from "../../../helper/constant";
import Card from "../../../common/cards/Card";
import ProgressBar from "../../../common/progressBar/ProgressBar";

const ChooseCategoryEvents = (props) => {
  const [categories, setCategories] = useState(eventCategories);
  const [eventType, setEventType] = useState("");
  const selectImage = (index) => {
    const allCategories = categories.map((category, idx) => {
      category.showCheck = false;
      if (index === idx) {
        setEventType(category.name.toLocaleLowerCase());
        localStorage.setItem(
          "showtype",
          JSON.stringify(category.name.toLocaleLowerCase())
        );
        category.showCheck = !category.showCheck;
      }
      return category;
    });
    setCategories(allCategories);
  };
  return (
    <>
      <div className="grid justify-center content-center w-full sm:max-w-[1280px] mx-auto h-full">
        <Card>
          <div className="w-[340px] flex flex-col gap-[20px]">
            <div className="flex justify-start flex-col">
              <p className="text-[23px] font-[600] mb-[15px]">
                Which type your event falls into?
              </p>
              <ProgressBar widht="40px" step={1} />
            </div>
            <div className="grid grid-cols-1 gap-[20px] w-full mt-[20px]">
              {categories.map((event, index) => (
                <div
                  className="w-[340px] h-[50px] rounded-sm cursor-pointer relative mx-auto border pl-5 py-3 text-[15px] text-[#747B84] shadow"
                  key={index}
                  onClick={() => selectImage(index)}
                >
                  <div className="relative">
                    <div className="">{event.name}</div>

                    {event.showCheck && (
                      <img
                        src="/svgs/check.svg"
                        alt="check"
                        className="absolute top-1 right-2 h-5 w-5 drop-shadow-lg"
                      />
                    )}
                    {/* <img src={event.image} alt={event.name} />
                    <span className="absolute top-[75px] text-center h-[35px] w-[150px] bg-white pt-[4px] font-[600] text-[13px] text-[#3b3b3b]">
                      {event.name}
                    </span>
                    {event.showCheck && (
                      <img
                        src="/svgs/check.svg"
                        alt="check"
                        className="absolute top-2 right-2 h-5 w-5 drop-shadow-lg"
                      />
                    )} */}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="primary_submit"
              onClick={() => {
                if (!eventType) {
                  alert("Please select event type");
                } else {
                  props.setStep(3);
                }
              }}
            >
              Proceed ahead
            </button>
            <span className="go_back_btn" onClick={() => props.setStep(1)}>
              <i className="fa-solid fa-arrow-left"></i> Go Back
            </span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChooseCategoryEvents;
