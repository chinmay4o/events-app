import React from "react";
import { useForm } from "react-hook-form";
import FileInput from "../../common/inputElements/FileInput";
import TextInput from "../../common/inputElements/TextInput";
import TextArea from "../../common/inputElements/TextArea";

const AttendeeProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <div>
      <div className="h-full top-0 bg-[rgba(0,0,0,0.4)] z-20 fixed w-[100%]"></div>
      <div className="h-[90%] w-full z-30 fixed bottom-0 bg-white rounded-t-[10px] overflow-scroll">
        <div
          className={`max-w-[1440px] w-full mx-auto min-h-[calc(100vh_-_60px)] md:w-[375px] mt-[8px] flex items-center flex-col`}
        >
          <div className="w-[40px] h-[4px] rounded-[10px] bg-[#C5C5C7] mb-[20px] cursor-pointer"></div>
          <div className="w-full -mt-[10px]">
            <div className="w-full md:w-full p-5 pt-2">
              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="font-[500] text-[16px] text-center">
                    Your Profile
                  </p>
                </div>
                <form className="grid gap-[6px]">
                  <div className="h-[96px] w-[96px] border m-auto rounded-full"></div>
                  <span className="mt-[16px] mb-[32px] text-primary text-[12px] m-auto cursor-pointer">
                    Change profile photo
                  </span>
                  <TextInput
                    register={register}
                    type="text"
                    id={"firstName"}
                    label="First Name"
                  />
                  <TextInput
                    register={register}
                    type="text"
                    id={"lastName"}
                    label="Last Name"
                  />
                  <div className="relative">
                    <label
                      htmlFor="startDate"
                      className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-[10px] peer-placeholder-shown:left-[13px] transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[12.5px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
                    >
                      Email (cannot be edited)
                    </label>
                    <TextInput
                      register={register}
                      type="text"
                      id={"email"}
                      label="xyz@gmail.com"
                      placeholder="xyz@gmail.com"
                      disabled={true}
                    />
                  </div>

                  <TextInput
                    register={register}
                    type="text"
                    id={"organization"}
                    label="Company Name"
                  />
                  <TextInput
                    register={register}
                    type="text"
                    id={"jobTitle"}
                    label="Designation"
                  />
                  <div className="mt-[-29px]">
                    <TextArea
                      register={register}
                      type="text"
                      id={"shortDescription"}
                      label="Event description"
                      placeholder="Event description"
                    />
                  </div>

                  <div className="w-full h-[40px] bg-primary text-white text-[12px] flex justify-center items-center rounded-[10px] cursor-pointer">
                    Save
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeProfile;
