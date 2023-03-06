import React, { useEffect, useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useMatch, useNavigate } from "react-router-dom";
import LandingRegForm from "./LandingRegForm";
import LinkedinRegForm from "./LinkedinRegForm";

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

const LinkedinReg = ({ setIsRegistered }) => {
  const vercelDomain = "http://localhost:3000/";
  const [isChecked, setIsChecked] = useState(true);
  const [linkData, setlinkData] = useState({});
  const navigate = useNavigate();
  const eventsid = useMatch("/event/:eventId");

  const { linkedInLogin } = useLinkedIn({
    clientId: "77q4vi8kkicqo6",
    redirectUri: `${vercelDomain}linkedin`,
    scope: "r_emailaddress,r_basicprofile,w_member_social",
    // scope: "r_emailaddress,w_member_social,r_compliance",
    onSuccess: (code) => {
      if (localStorage.getItem("linkedinAccessToken")) {
        throttle(
          getLinkedinAccessToken(
            code,
            localStorage.getItem("linkedinAccessToken")
          ),
          10000
        );
      } else {
        throttle(getLinkedinAccessToken(code, null), 10000);
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

      let data = await response.json();

      if (data?.newUser) {
        const newUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };
        setlinkData(newUser);
      } else {
        setlinkData(data.oldUser);
      }
    } catch (error) {
      console.log(error);
      navigate(`/event/${eventsid.params.eventId}?tab=${"register"}`);
    }
  }

  useEffect(() => {
    if (isChecked) {
      linkedInLogin();
    } else {
      navigate(`/event/${eventsid.params.eventId}?tab=${"register"}`);
    }
  }, [isChecked]);

  return (
    <>
      <div className="mymd:w-[390px] flex items-center mb-5 mt-3">
        <input
          type="checkbox"
          id="radiobtn"
          className="mr-2 border border-[#EBEEF2] bg-white checked:bg-primary checked:border-[#EBEEF2] cursor-pointer   focus:ring-0"
          checked={isChecked}
          onChange={() => {
            setIsChecked(false);
          }}
        />
        <label htmlFor="radiobtn" className="flex cursor-pointer">
          Autofill via &nbsp;
          <img src="/svgs/linkedinblue.svg" alt="linkedin" /> &nbsp;Linkedin
        </label>
      </div>
      {linkData?.firstName ? (
        <LinkedinRegForm
          linkData={linkData}
          setIsRegistered={setIsRegistered}
        />
      ) : (
        <>Loading....</>
      )}
    </>
  );
};

export default LinkedinReg;
