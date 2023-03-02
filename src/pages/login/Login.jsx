import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "../../common/cards/Card";
import TextInput from "../../common/inputElements/TextInput";
import Google from "../../components/login/Google";
import { useForm } from "react-hook-form";

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
        className={`grid justify-center content-center w-full sm:max-w-[1280px] mx-auto h-[calc(100vh-58px)]`}
      >
        <Card>
          <form
            className="max-w-[340px] flex flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[22px] font-[700] block text-left mb-[10px]">
              Login to Warpbay!!
            </p>
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
            <div className="border-[1px] border-gray-300 w-full"></div>
            <div className="grid grid-cols-1 gap-[20px] w-full place-items-center">
              {/* <div className="bg-[#066093] w-full cursor-pointer flex items-center rounded-lg gap-x-2 text-white text-md font-medium">
                <div className="w-12 h-11 bg-[#0b78b7] rounded-tl-lg rounded-bl-lg">
                  <svg
                    className="inline-block align-middle ml-1 rounded-lg"
                    width="40px"
                    height="40px"
                    viewBox="0 0 40 40"
                    version="1.1"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g id="LinkedIn" fill="#FFFFFF">
                        <g
                          id="Fill-6-+-Fill-7"
                          transform="translate(6.000000, 5.000000)"
                        >
                          <path
                            d="M3.44222222,0 C5.34,0 6.88,1.54111111 6.88,3.44 C6.88,5.34 5.34,6.88111111 3.44222222,6.88111111 C1.53666667,6.88111111 0,5.34 0,3.44 C0,1.54111111 1.53666667,0 3.44222222,0 L3.44222222,0 Z M0.471111111,9.48888889 L6.41,9.48888889 L6.41,28.5777778 L0.471111111,28.5777778 L0.471111111,9.48888889 Z"
                            id="Fill-6"
                          ></path>
                          <path
                            d="M10,9.47333333 L15.6866667,9.47333333 L15.6866667,12.0833333 L15.7688889,12.0833333 C16.56,10.5822222 18.4955556,9 21.3811111,9 C27.3888889,9 28.4988889,12.9522222 28.4988889,18.0933333 L28.4988889,28.5622222 L22.5666667,28.5622222 L22.5666667,19.2788889 C22.5666667,17.0655556 22.5288889,14.2177778 19.4844444,14.2177778 C16.3966667,14.2177778 15.9255556,16.63 15.9255556,19.1211111 L15.9255556,28.5622222 L10,28.5622222 L10,9.47333333"
                            id="Fill-7"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </div> */}
              <Google />
            </div>
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
