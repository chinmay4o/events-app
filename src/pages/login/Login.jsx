import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Google from "../../components/login/Google";
import TextInput from "../../common/inputElements/TextInput";
import Card from "../../common/cards/Card";
import Linkedin from "../../components/login/Linkedin";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {}, mode: "onChange" });

  async function onSubmit(data) {
    if (!data.email) {
      alert("Please enter your email");
    } else {
      setLoading(true);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/user/emailotp`,
        data: {
          email: data.email.toLowerCase(),
        },
      })
        .then((response) => {
          console.log(response);
          localStorage.setItem("email", data.email.toLowerCase());
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("existingUser", response.data.existingUser);
          navigate("/login/otp");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      {/* {loading && <Loader />} */}
      <div
        className={`grid justify-center content-center w-full sm:max-w-[1280px] mx-auto h-[calc(100vh-120px)]`}
      >
        <Card>
          <form
            className="max-w-[340px] flex flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[22px] font-[700] block text-left mb-[10px] text-center">
              Login to Warpbay!!
            </p>
            <div className="grid grid-cols-1 gap-[20px] w-full place-items-center">
              <Linkedin />
              <Google />
            </div>
            <div className="border-[1px] border-gray-300 w-full"></div>

            <div>
              <TextInput
                type="text"
                placeholder="Enter you email address"
                id="email"
                required
                label="Enter your email"
                register={register}
                pattern={
                  /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i
                }
                mb="0"
              />
              {errors.email ? (
                <p className="error_input_text">
                  {errors.email?.type === "pattern" && "Email is invalid"}
                  {errors.email?.type === "required" && "Email is required"}
                </p>
              ) : null}
            </div>
            <input
              type="submit"
              value={loading ? "Loading..." : `Send OTP to Login`}
              className="primary_submit"
              disabled={loading}
            />
            {/* <div className="border-[1px] border-gray-300 w-full"></div> */}
            {/* <div className="grid grid-cols-1 gap-[20px] w-full place-items-center">
              <Google />
              <Linkedin />
            </div> */}
            <p className="text-[13px] font-[500]">
              By continuing you agree to the{" "}
              <span className="text-[#a55eea]">Term of Service</span> and{" "}
              <span className="text-[#a55eea]">Privacy Policy</span>
            </p>
          </form>
        </Card>
        {/* <ScanIcon /> */}
      </div>
    </>
  );
}

export default Login;
