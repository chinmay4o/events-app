import Card from "../../../common/cards/Card";
import TextInputPD from "../../../common/inputElements/TextInputPD";
import Navbar from "../../../common/navbar/Navbar";
import ProgressBar from "../../../common/progressBar/ProgressBar";
import { useForm } from "react-hook-form";

const EventHosted = (props) => {
  const { register, watch, handleSubmit } = useForm();

  const onSubmit = () => {
    props.setStep(5);
  };

  return (
    <>
      <div className="grid  justify-center content-center w-full sm:max-w-[1280px] mx-auto min-h-[calc(100vh-58px)]">
        <Card>
          <form
            className="w-[340px] flex flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[24px] font-[700] block text-left w-full">
              Where will be the event hosted?
            </p>
            <ProgressBar width="50" step={3} />

            <TextInputPD
              type="text"
              id="search"
              placeholder="Search event location"
              register={register}
              required
            />

            <p className="text-[13px] font-normal	text-[#A55EEA]">
              <span className="inline-block w-[283px]">
                This event is an online event
              </span>
              <label
                htmlFor="event-online"
                className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="event-online"
                  className="sr-only peer"
                  {...register("eventOnline")}
                  checked
                />
                <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></span>
              </label>
            </p>
            {/* <p className="text-[13px] font-normal	text-[#A55EEA]">
                            <span className="inline-block w-[283px]">Do you want to use your own link?</span>
                            <label htmlFor="own-link" className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer">
                                <input type="checkbox" value="" id="own-link" className="sr-only peer" {...register("ownLink")} />
                                <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></span>
                            </label>
                        </p>

                        {watch().ownLink && <TextInputPD type="text" id="link" placeholder="Add Link here" register={register} required />} */}

            <div className="mt-5 font-normal text-[12px]">
              Warpbay will provide you magic links to host the event. Click
              continue to proceed.
            </div>

            <input
              type="submit"
              value="Proceed ahead"
              className="primary_submit"
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default EventHosted;
