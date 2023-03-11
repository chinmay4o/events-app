import React, { useEffect, useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useMatch, useNavigate } from "react-router-dom";
import LandingRegForm from "./LandingRegForm";
import LinkedinRegForm from "./LinkedinRegForm";
import axios from "axios";

var initialThrottleCall = false;
function throttle(fn, delay) {
  try {
    if (initialThrottleCall === false) {
      fn();
      initialThrottleCall = Date.now();
    } else if (Date.now() - initialThrottleCall > delay) {
      fn();
      initialThrottleCall = Date.now();
    }
  } catch (error) {
    console.log(error);
  }
}

const LinkedinReg = ({ setIsRegistered }) => {
  const vercelDomain = "http://localhost:3000/";
  // const vercelDomain = "https://dev.warpbay.com/";
  const [isChecked, setIsChecked] = useState(true);
  const [linkData, setlinkData] = useState({});
  const navigate = useNavigate();
  const eventsId = useMatch("/event/:eventId");

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

      if (response.status !== 200) {
        alert("something went wrong!!");
      }

      let data = await response.json();

      if (data?.newUser) {
        localStorage.setItem("linkedinAccessToken", data.linkedinAccessToken);
        localStorage.setItem(
          "linkedinURNId",
          data.linkedinURNId ? data.linkedinURNId : null
        );
        const newUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          linkedinAccessToken: data.linkedinAccessToken,
          linkedinURNId: data.linkedinURNId ? data.linkedinURNId : null,
        };
        setlinkData(newUser);
      } else if (data?.oldUser) {
        localStorage.setItem("linkedinAccessToken", data.linkedinAccessToken);
        localStorage.setItem(
          "linkedinURNId",
          data.linkedinURNId ? data.linkedinURNId : null
        );
        setlinkData(data.oldUser);
      }
    } catch (error) {
      console.log(error);
      navigate(`/event/${eventsId.params.eventId}?tab=${"register"}`);
    }
  }

  useEffect(() => {
    if (isChecked) {
      linkedInLogin();
    } else {
      navigate(`/event/${eventsId.params.eventId}?tab=${"register"}`);
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
