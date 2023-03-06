import React from "react";
import { useEffect, useState } from "react";
import Card from "../../common/cards/Card";
import TextInput from "../../common/inputElements/TextInput";
import { useForm } from "react-hook-form";
import ProgressBar from "../../common/progressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import Loader from "../../common/loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginUserDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      firstName: searchParams.get("firstName"),
      lastName: searchParams.get("lastName"),
      email: searchParams.get("email"),
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    if (!(email && data.firstName && data.lastName)) {
      alert("please fill all the details");
      setIsSubmitting(false);
    } else {
      searchParams.get("linkedinAccessToken")
        ? dispatch(
            login({
              ...data,
              email: email,
              linkedinAccessToken: searchParams.get("linkedinAccessToken"),
            })
          )
        : dispatch(login({ ...data, email: email }));
    }
  }

  useEffect(() => {
    let email = localStorage.getItem("email");

    if (email) {
      setEmail(email);
    } else if (searchParams.get("email")) {
      setEmail(searchParams.get("email"));
    }
  }, []);

  useEffect(() => {
    if (userInfo?.firstName) {
      setIsSubmitting(true);
      if (watch().eventOrganizer) {
        navigate("/login/demoevent?organizer=true");
      } else {
        navigate("/events");
      }
    }
  }, [userInfo?.email]);

  return (
    <>
      {loading && <Loader />}
      {error && alert("Some error occurred")}
      <div
        className={`grid justify-center content-center max-w-[1280px]  mx-auto min-h-[calc(100vh-58px)]`}
      >
        <Card>
          <form
            className="w-[340px] flex flex-col gap-[6px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[22px] font-[600] block text-left w-full mb-[20px]">
              Please add basic details
            </p>
            <ProgressBar width="65" step={2} />

            {/* <InputPD type="text" placeholder="LinkedIn Profile" id="linkedinProfile" required register={register} /> */}
            <div className="h-[20px]"></div>
            <TextInput
              type="text"
              placeholder="First Name"
              id="firstName"
              required
              register={register}
              label="First Name"
            />
            <TextInput
              type="text"
              id="lastName"
              placeholder="Last Name"
              required
              register={register}
              label="Last Name"
            />
            {/* if email then phone number or vice a versa*/}
            <TextInput
              type="tel"
              id="mobile"
              placeholder="Mobile Number"
              register={register}
              label="Mobile Number"
            />
            <TextInput
              type="text"
              id="organization"
              placeholder="Organization"
              required
              register={register}
              label="Company Name"
            />
            <TextInput
              type="text"
              id="jobTitle"
              placeholder="Job Title"
              register={register}
              label="Job Title"
            />

            <p className="text-[13px] font-normal	text-[#A55EEA] mb-[15px] -mt-[15px]">
              <span className="inline-block w-[283px]">
                Would you like to organize an event
              </span>
              <label
                htmlFor="default-toggle"
                className="inline-flex top-[8px] left-[7px] relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  {...register("eventOrganizer")}
                />
                <span className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></span>
              </label>
            </p>

            <input
              type="submit"
              value={isSubmitting ? "Loading..." : "Proceed ahead"}
              className={`primary_submit`}
              disabled={isSubmitting}
            />
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginUserDetails;
