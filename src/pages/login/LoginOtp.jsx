import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../common/navbar/Navbar";
import Card from "../../common/cards/Card";
import Loader from "../../common/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import OTPLogin from "../../components/login/OTPLogin";

const LoginOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [loadingB, setLoadingB] = useState(false);
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(30);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token) {
      setToken(token);
    }
    if (email) {
      setEmail(email);
    }

    if (userInfo?.email) {
      if (window.innerWidth <= 768) {
        navigate("/home");
      } else {
        navigate("/events");
      }
    }

    if (error) {
      navigate("/login");
    }
  }, [userInfo?.email, error]);

  async function onSubmit(data) {
    const finalOtp = Number(otp.join(""));
    if (otp.includes("")) {
      alert("Sorry Invalid Otp");
      return;
    }
    if (!email) {
      alert("Sorry can't fetch your email");
    } else {
      setLoadingB(true);
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/user/verifyemailOtp`,
        data: {
          email: email,
          token: token,
          code: finalOtp,
        },
      })
        .then(async (response) => {
          if (response.data.message === "User is Verified!!") {
            if (response.data.existingUser === true) {
              await dispatch(login({ email: email }));
            } else {
              navigate("/login/userdetails");
              setLoadingB(false);
            }
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            alert("can't verify!! wrong OTP");
            setLoadingB(false);
          } else {
            alert("can't verify!! please enter again");
            setLoadingB(false);
          }
        });
    }
  }

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    const inputChar = e.target.value;
    if (inputChar === "" || (regex.test(inputChar) && inputChar.length <= 1)) {
      const index = parseInt(e.target.id.slice(-1)) - 1;
      const newOtp = otp.slice();
      newOtp[index] = e.target.value;
      setOtp(newOtp);

      if (inputChar !== "" && index < 3) {
        const nextInput = e.target.nextSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (inputChar === "" && index > 0) {
        const prevInput = e.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };
  return (
    <>
      {/* {loadingB && <Loader />} */}
      <div
        className={`grid justify-center content-center w-full sm:max-w-[1280px]  mx-auto min-h-[calc(100vh-58px)]`}
      >
        <Card>
          <form
            className="w-[340px] flex flex-col gap-[20px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-[24px] font-[700] block text-left w-[340px]">
              Enter OTP
            </p>
            {/* <ProgressBar width="45" step={1} /> */}
            <div>
              <OTPLogin otp={otp} handleChange={handleChange} />
            </div>

            <input
              type="submit"
              value={loadingB ? "Loading..." : "Verify OTP and continue"}
              className={`primary_submit`}
              disabled={loadingB}
            />
            <span className="go_back_btn" onClick={() => navigate("/login")}>
              <i className="fa-solid fa-arrow-left"></i> Go Back
            </span>

            <p className="text-[12px] font-[500] text-gray-500 text-left w-full">
              Didn’t receive OTP?{" "}
              <span
                className={`${
                  counter === 0 ? "text-[#2596be] cursor-pointer" : ""
                } `}
                onClick={() => setCounter(30)}
              >
                Resend OTP
              </span>{" "}
              {counter ? `in ${counter} seconds` : ""}
            </p>

            <div className="border-[1px] border-gray-300 w-full"></div>
            <p
              className="text-[12px] font-[500] text-gray-500 text-left w-full cursor-pointer	"
              onClick={() => navigate("/login")}
            >
              Not your email?{" "}
              <span onClick={() => navigate("/login")} className="text-primary">
                Change email address
              </span>
            </p>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginOtp;
