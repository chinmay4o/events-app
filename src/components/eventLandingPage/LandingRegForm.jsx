import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getRequest } from "../../../src/utils/API/api.ts";
import styles from "./Landing.module.css";
import axios from "axios";
import TextInputP from "../../common/inputElements/TextInputP";
import { useMatch, useNavigate } from "react-router-dom";
import { FormControl } from "../eventLayout/settings2/regForm/FormControl";

const LandingRegForm = ({ isRegistered, setIsRegistered }) => {
  const [regForm, setRegForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const eventsid = useMatch("/event/:eventId");
  const navigate = useNavigate();
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = formMethods;

  useEffect(() => {
    const getAdditionalForm = async () => {
      const response = await getRequest(
        `/event/${eventsid.params.eventId}/additionalForm`
      );
      setRegForm(response.data[0]?.form);
      // console.log(response.data[0]?.form, "new form");
    };
    if (eventsid.params.eventId) {
      getAdditionalForm();
    }
  }, [eventsid]);

  function onFormSubmit(data, error) {
    let additionalData = {};
    if (Object.keys(data).length > 6) {
      for (const prop in data) {
        if (
          prop !== "firstName" &&
          prop !== "lastName" &&
          prop !== "mobile" &&
          prop !== "email" &&
          prop !== "organization" &&
          prop !== "jobTitle"
        ) {
          additionalData[prop] = data[prop];
        }
      }
    }
    setIsSubmitting(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/attendee/eventregister`, {
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        email: data.email,
        eventId: eventsid.params.eventId,
        jobTitle: data.jobTitle,
        organization: data.organization,
        additionalData: additionalData,
      })
      .then(function (response) {
        reset();
        setIsSubmitting(false);
        setIsRegistered(true);
        setIsSubmitting(false);
      })
      .catch(function (error) {
        reset();
        setIsSubmitting(false);
        if (
          error.response.data.message ===
          "You have already registered for this event"
        ) {
          alert("You have already registered for this event");
        }
        setIsSubmitting(false);
      });
  }

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <div className="w-[100%] mymd:w-full">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={styles.reg_form_box}
      >
        <div className="mymd:w-[390px] flex items-center mb-5 mt-3">
          <input
            type="checkbox"
            id="radiobtn"
            className="mr-2 border border-[#cacaca] border-2 bg-white checked:bg-primary checked:border-[#EBEEF2] cursor-pointer focus:ring-0"
            checked={false}
            onChange={() =>
              navigate(
                `/event/${eventsid.params.eventId}?tab=${"registerlinkedin"}`
              )
            }
          />
          <label htmlFor="radiobtn" className="flex cursor-pointer text-[14px] font-[600]">
            Autofill via &nbsp;
            <img src="/svgs/linkedinblue.svg" alt="linkedin" /> &nbsp;Linkedin
          </label>
        </div>
        <div className="mymd:w-[100%] grid grid-cols-1 sm:grid-cols-2 pt-[15px] w-[100%] gap-[15px]">
          <TextInputP
            register={register}
            type="text"
            id={"firstName"}
            label="First Name"
            required
            width={windowWidth > 900 ? "" : ""}
          />
          <TextInputP
            register={register}
            type="text"
            id={"lastName"}
            label="Last Name"
            required
            // minLength={0}
            width={windowWidth > 900 ? "" : ""}
          />
        </div>

        <TextInputP
          register={register}
          type="email"
          id={"email"}
          label="Email Address"
          required
          errors={errors}
          pattern={
            /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i
          }
          width={"100%"}
        />
        <TextInputP
          register={register}
          type="tel"
          id={"mobile"}
          required
          label="Phone Number"
          width={"100%"}
        />
        <TextInputP
          register={register}
          type="text"
          id={"organization"}
          required
          label="Company Name"
          width={"100%"}
        />
        <TextInputP
          register={register}
          type="text"
          id={"jobTitle"}
          required
          label="Designation"
          width={"100%"}
        />

        <FormProvider {...formMethods}>
          {regForm &&
            regForm.length > 0 &&
            regForm.map((ele, key) => (
              <div key={key}>
                {/* <label htmlFor={ele.fieldName}>{ele.label}</label> */}

                <FormControl {...ele} showIcons={false} width={"100%"} />

                {/* <ErrorMessage errors={errors} name={el.fieldName} /> */}
              </div>
            ))}
        </FormProvider>
        <div className="mymd:w-[100%] mymd:flex">
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submit_btn}
            // onClick={() => setSubmitDisable(true)}
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandingRegForm;
