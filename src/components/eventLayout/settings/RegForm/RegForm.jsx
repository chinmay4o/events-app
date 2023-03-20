import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";
import PrimaryButton from "../../../../common/buttons/PrimaryButton";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/API/api.ts";
import AddForm from "./AddForm";
// import styles from "../../Events.module.css";
import { FormControl } from "./FormControl";

function RegForm() {
  const [regForm, setRegForm] = useState({});
  const [inputType, setInputType] = useState("text");
  const eventsId = useMatch("events/:eventId/*");
  const [open, setOpen] = useState(false);
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setValue,
  } = formMethods;
  const {
    register: register2,
    getValues,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset,
    setValue: setValue2,
  } = useForm({
    defaultValues: {
      name: "",
      type: "text",
      options: "",
      required: false,
    },
  });

  function onSubmit(data, error) {
    const duplicateExists = regForm?.some(
      (field) => field.label.toLowerCase() === data.name.toLowerCase()
    );
    if (duplicateExists) {
      alert("Field with the same label name exists");
      return;
    }
    let regFormCopy;
    if (!regForm || Object.entries(regForm).length === 0) {
      regFormCopy = [];
    } else {
      regFormCopy = regForm;
    }
    let options = [];
    if (data.type === "select" || data.type === "multi-select") {
      const optionsArray = data.options.split(",");
      options = optionsArray.map((option) => {
        return {
          label: option,
          value: option.toLowerCase(),
        };
      });
    }
    console.log(
      "🚀 ~ file: index.tsx:35 ~ onSubmit ~ regFormCopy",
      regFormCopy
    );
    regFormCopy?.push({
      label: data.name,
      inputType: data.type,
      fieldName: data.name
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, "")
        .replace(/\s/g, "_"),
      defaultValue: "",
      options,
      config: {
        required: data.required,
      },
    });
    setRegForm(regFormCopy);
    if (regForm) {
      patchRequest(
        `event/${eventsId.params.eventId}/additionalForm`,
        regFormCopy
      );
    } else {
      postRequest(
        `event/${eventsId.params.eventId}/additionalForm`,
        regFormCopy
      );
    }
    reset();
    setInputType("text");
    setOpen(false);
  }
  function onFormSubmit(data, error) {
    console.log(data);
  }
  useEffect(() => {
    const getAdditionalForm = async () => {
      const response = await getRequest(
        `/event/${eventsId.params.eventId}/additionalForm`
      );
      setRegForm(response.data[0]?.form);
    };
    if (eventsId.params.eventId) {
      getAdditionalForm();
    }
  }, [eventsId]);
  return (
    <div className="w-full md:w-[400px] h-screen ml-0 md:ml-[0px] mt-5 md:mt-[30px] ">
      <p className="font-[600] w-[335px] md:w-[400px] mx-auto md:mx-auto text-[19px] text-[#585858] md:ml-8">
        Build Registration Form
      </p>
      <div className="flex w-[335px] md:w-[340px] flex-row place-content-around mx-auto md:mx-0">
        {/* <div className="flex flex-col">
                    {regForm &&
                        regForm.length > 0 &&
                        regForm.map((el, i) => (
                            <div key={i}>
                                <label>{el.label}</label>
                            </div>
                        ))}
                </div> */}
        <AddForm
          open={open}
          setOpen={setOpen}
          inputType={inputType}
          isSubmitting={isSubmitting}
          register={register2}
          handleSubmit={handleSubmit2}
          onSubmit={onSubmit}
          setInputType={setInputType}
          getValues={getValues}
          setValue={setValue2}
        />
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mt-[35px] items-center flex flex-col w-[335px] md:w-[340px] mx-auto md:mx-0"
      >
        <FormProvider {...formMethods}>
          {regForm &&
            regForm.length > 0 &&
            regForm.map((el, i) => (
              <div
                key={i}
                className="w-[335px] md:w-[340px] flex flex-col mx-auto md:mx-0"
              >
                {/* <label htmlFor={el.fieldName}>{el.label}</label> */}
                <FormControl {...el} width={"300px"} />

                {/* <ErrorMessage errors={errors} name={el.fieldName} /> */}
              </div>
            ))}
        </FormProvider>

        {/* <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting" : "Submit"}
                </button> */}
      </form>

      <div className="w-[335px] md:w-[300px] mx-auto md:mx-0 md:ml-8">
        <PrimaryButton
          btnText={"Add custom fields"}
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
    </div>
  );
}

export default RegForm;
