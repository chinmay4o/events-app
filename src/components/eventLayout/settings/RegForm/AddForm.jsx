// @ts-nocheck
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../../common/inputElements/TextInput";
import TextArea from "../../../../common/inputElements/TextArea";
import Select from "../../../../common/inputElements/Select";
// import styles from "../../common/inputElements/Input.module.css";
import styles from "../../../../common/inputElements/Input.module.css";

export default function AddForm({
  open,
  setOpen,
  register,
  handleSubmit,
  inputType,
  onSubmit,
  isSubmitting,
  setInputType,
  getValues,
  setValue,
}) {
  const options = [
    {
      value: "text",
      label: "Text",
    },
    {
      value: "select",
      label: "Select",
    },
    {
      value: "multi-select",
      label: "Multi Select",
    },
    {
      value: "number",
      label: "Number",
    },
    {
      value: "checkbox",
      label: "Checkbox",
    },
    {
      value: "phoneNumber",
      label: "Phone Number",
    },
    {
      value: "file",
      label: "File",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "url",
      label: "URL",
    },
  ];
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
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
                          className="rounded-md hidden md:block text-gray-300"
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
                        <Dialog.Title className="text-[20px] pt-8 font-[600] text-gray-900">
                          Add custom fields
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col gap-y-[20px]"
                        >
                          <input
                            id={"name"}
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Input Name"
                            className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
                          />
                          {/* <input
                            id={"name"}
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Input Name"
                            className="bg-[#F4F6F9] outline-none border rounded-[10px] border-[#F4F6F9] ring-0"
                            // defaultValue={defaultValue}
                          /> */}
                          {/* <Select
                            value={options}
                            options={options}
                            multiple={false}
                            {...register("type", { required: true })}
                            onClick={() => {
                              const value = getValues("type");
                              setInputType(value);
                              console.log(value);
                            }}
                          /> */}

                          <Select
                            register={register}
                            id={"type"}
                            options={options}
                            value={inputType}
                            onChange={(o) => {
                              const value = getValues("type");
                              setValue("type", o.value);
                              setInputType(o);
                            }}
                          />
                          {/* <select
                            {...register("type", { required: true })}
                                                        onClick={() => {
                                                            const value = getValues("type"); // { page_title: "someValue", test1: "test1-input", ... }
                                                            setInputType(value);
                                                            console.log(value);
                                                        }}
                                                    >
                                                        <option value="text">Text</option>
                                                        <option value="select">Select</option>
                                                        <option value="multi-select">Multi Select</option>
                                                        <option value="number">Number</option>
                                                        <option value="checkbox">Checkbox</option>
                                                        <option value="file">File</option>
                                                        <option value="phoneNumber">Phone Number</option>
                                                        <option value="email">Email</option>
                                                        <option value="url">URL</option>
                                                    </select> */}
                          {inputType?.value === "select" ||
                          inputType?.value === "multi-select" ? (
                            <input
                              id={"options"}
                              type="text"
                              {...register("options", { required: true })}
                              placeholder="Enter options separated by ;"
                              className={`${styles.input} peer focus:ring-transparent	 focus:border-gray-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
                            />
                          ) : (
                            // <input
                            //   id={"options"}
                            //   type="text"
                            //   {...register("options", { required: true })}
                            //   placeholder="Enter options separated by ;"
                            // />
                            []
                          )}

                          <p className="text-[13px] flex justify-between items-center font-normal	text-[#A55EEA]">
                            <span className="inline-block ">
                              Is this field required
                            </span>
                            <label
                              htmlFor="required"
                              className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value=""
                                id={"required"}
                                className="sr-only peer"
                                {...register("required")}
                              />
                              <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></span>
                            </label>
                          </p>
                          {/* <div>
                            <input
                              type="checkbox"
                              id={"required"}
                              {...register("required")}
                            ></input>
                            <label htmlFor={"required"}>Required</label>
                          </div> */}
                          {/* <PrimaryButton /> */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="primary_submit"
                          >
                            {isSubmitting ? "Submitting" : "Save Field"}
                          </button>
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
