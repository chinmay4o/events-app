import React, { useEffect, useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN_SUCCESS } from "../../redux/constants/userConstants";

var initialThrottleCall = false;
function throttle(fn, delay) {
  try {
    if (initialThrottleCall === false) {
      fn();
      initialThrottleCall = Date.now();
      console.log("normal");
    } else if (Date.now() - initialThrottleCall > delay) {
      console.log(Date.now() - initialThrottleCall, "delay");
      fn();
      initialThrottleCall = Date.now();
      console.log("throttle");
    }
  } catch (error) {
    console.log(error);
  }
}

const Linkedin = () => {
  // const vercelDomain = "http://localhost:3000/";
  const vercelDomain = "https://dev.warpbay.com/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LinkedIn");
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const { linkedInLogin } = useLinkedIn({
    clientId: "77q4vi8kkicqo6",
    redirectUri: `${vercelDomain}linkedin`,
    scope: "r_emailaddress,r_basicprofile,w_member_social",
    // scope: "r_emailaddress,w_member_social,r_compliance",
    onSuccess: (code) => {
      const linkedinAccessToken = localStorage.getItem("linkedinAccessToken");
      if (linkedinAccessToken) {
        throttle(() => getLinkedinAccessToken(code, linkedinAccessToken), 10000);
      } else {
        throttle(() => getLinkedinAccessToken(code, null), 10000);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function getLinkedinAccessToken(
    code,
    linkedinAccessTokenClient = null
  ) {
    let url = `${process.env.REACT_APP_SERVER_URL}/user/registerwithlinkedin`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          linkedinCode: code,
          linkedinAccessTokenClient: linkedinAccessTokenClient
            ? linkedinAccessTokenClient
            : null,
        }),
      });

      if (response.status !== 200) {
        alert("something went wrong 400");
      } else {
        let data = await response.json();
        if (data?.newUser) {
          localStorage.setItem("linkedinAccessToken", data.linkedinAccessToken);
          localStorage.setItem("linkedinURNId", data.linkedinURNId ? data.linkedinURNId : null);
          navigate(
            `/login/userdetails?step=2&firstName=${data.firstName}&lastName=${data.lastName}&email=${data.email}&linkedinAccessToken=${data.linkedinAccessToken}`
          );
        } else {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: {
              ...data.oldUser,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              linkedinAccessToken: data.linkedinAccessToken,
              linkedinURNId: data.linkedinURNId,
            },
          });
          //accessToken
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("linkedinAccessToken", data.linkedinAccessToken);
          localStorage.setItem("linkedinURNId", data.linkedinURNId);
          //User
          localStorage.setItem(
            "user",
            response.data.oldUser
              ? JSON.stringify(response.data.oldUser)
              : JSON.stringify(response.data.oldUser)
          );
        }

        if (data.email) {
          console.log(data, "linkedin email");
        } else {
          alert("Linkedin data.email not found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async function getNameAndEmailFromLinkedin () {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const response = await fetch(url, {
  //         method: "POST",
  //         headers: { "content-type": "application/json" },
  //         body: JSON.stringify({ linkedinCode: code }),
  //       });

  //       let data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
  // }

  return (
    <>
      <div
        className="bg-[#066093] w-[230px] cursor-pointer flex items-center rounded-[5px] gap-x-2 text-white text-md font-medium"
        onClick={linkedInLogin}
      >
        <div className="w-12 h-10 bg-[#0b78b7] rounded-tl-lg rounded-bl-lg grid place-items-center">
          <svg
            className="inline-block align-middle ml-0 rounded-lg"
            width="30px"
            height="30px"
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
        <span className="text-[13px] mx-auto">Sign in with LinkedIn</span>
      </div>
    </>
  );
};

export default Linkedin;
