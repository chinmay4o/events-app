import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMatch } from "react-router-dom";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/API/api";
import styles from "../../Events.module.css";
import { FormControl } from "./FormControl";

function RegForm() {
  const [regForm, setRegForm] = useState({});
  const [inputType, setInputType] = useState("text");
  const eventsid = useMatch("events/:eventId/*");
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = formMethods;
  const {
    register: register2,
    getValues,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      type: "text",
      options: "",
      required: false,
    },
  });

  function onSubmit(data, error) {
    const regFormCopy = regForm || [];
    let options = [];
    if (data.type === "select" || data.type === "multi-select") {
      const optionsArray = data.options.split(";");
      options = optionsArray.map((option) => {
        return {
          label: option,
          value: option.toLowerCase(),
        };
      });
      console.log(options, "optionsArray", optionsArray);
    }
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
        `event/${eventsid.params.eventId}/additionalForm`,
        regFormCopy
      );
    } else {
      postRequest(
        `event/${eventsid.params.eventId}/additionalForm`,
        regFormCopy
      );
    }
    console.log(data);
    reset();
  }
  function onFormSubmit(data, error) {
    console.log(data);
  }
  useEffect(() => {
    const getAdditionalForm = async () => {
      const response = await getRequest(
        `/event/${eventsid.params.eventId}/additionalForm`
      );
      console.log(response, "response");
      setRegForm(response.data[0]?.form);
    };
    if (eventsid.params.eventId) {
      getAdditionalForm();
    }
  }, [eventsid]);

  return (
    <div className="m-7 pl-2 w-[700px]">
      <div className={styles.title}>Registration Form</div>
      <div className="flex flex-row place-content-around">
        <div className="flex flex-col">
          {regForm &&
            regForm.length > 0 &&
            regForm.map((el, i) => (
              <div key={i}>
                <label>{el.label}</label>
                {/* <ErrorMessage errors={errors} name={el.fieldName} /> */}
              </div>
            ))}
        </div>

        <form onSubmit={handleSubmit2(onSubmit)} className="flex flex-col">
          <input
            id={"name"}
            type="text"
            {...register2("name", { required: true })}
            placeholder="Input Name"
            // defaultValue={defaultValue}
          />
          <select
            {...register2("type", { required: true })}
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
          </select>
          {inputType === "select" || inputType === "multi-select" ? (
            <input
              id={"options"}
              type="text"
              {...register2("options", { required: true })}
              placeholder="Enter options separated by ;"
              // defaultValue={defaultValue}
            />
          ) : (
            []
          )}
          <div>
            <input
              type="checkbox"
              id={"required"}
              {...register2("required")}
            ></input>
            <label htmlFor={"required"}>Required</label>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="mt-4 items-center flex flex-col "
      >
        <FormProvider {...formMethods}>
          {regForm &&
            regForm.length > 0 &&
            regForm.map((el, i) => (
              <div key={i}>
                <label htmlFor={el.fieldName}>{el.label}</label>

                <FormControl {...el} />

                {/* <ErrorMessage errors={errors} name={el.fieldName} /> */}
              </div>
            ))}
        </FormProvider>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default RegForm;
