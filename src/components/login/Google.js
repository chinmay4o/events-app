import React, { useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../common/loader/Loader";
import { USER_LOGIN_SUCCESS } from "../../redux/constants/userConstants";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo?.firstName) {
      navigate("/events");
    }

    if (error) {
      alert("internal server error");
    }
  }, [userInfo?.firstName, error]);

  return (
    <>
      {loading && <Loader />}

      <GoogleOAuthProvider clientId="1031575351652-mk50h2ibqj7fmavpjc15prboeuc117dr.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // request start
            axios({
              method: "POST",
              url: `${process.env.REACT_APP_SERVER_URL}/user/registerWithGoogle`,
              data: {
                tokenByGoogle: credentialResponse.credential,
              },
            })
              .then((response) => {
                if (response.data.newUser) {
                  navigate(
                    `/login/userdetails?step=2&firstName=${response.data.firstName}&lastName=${response.data.lastName}&email=${response.data.email}`
                  );
                } else {
                  dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                      ...response.data.oldUser,
                      accessToken: response.data.accessToken,
                      refreshToken: response.data.refreshToken,
                    },
                  });
                  //accessToken
                  localStorage.setItem(
                    "accessToken",
                    response.data.accessToken
                  );
                  localStorage.setItem(
                    "refreshToken",
                    response.data.refreshToken
                  );
                  //User
                  localStorage.setItem(
                    "user",
                    response.data.oldUser
                      ? JSON.stringify(response.data.oldUser)
                      : JSON.stringify(response.data.oldUser)
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
            // request end
          }}
          onError={() => {
            console.log("google credentials Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default Google;

// this reponse is tobe commented here for testing else tobe used for .then response in google login to login user directly

// .then((response) => {
//   console.log("response", response);
//   if (response.data.newUser?.firstName) {
//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: {
//         ...response.data.newUser,
//       },
//     });
//   } else {
//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: {
//         ...response.data.oldUser,
//       },
//     });
//   }
//   //accessToken
//   localStorage.setItem("accessToken", response.data.accessToken);
//   localStorage.setItem(
//     "refreshToken",
//     response.data.refreshToken
//   );
//   //user
//   localStorage.setItem(
//     "user",
//     response.data.newUser
//       ? JSON.stringify(response.data.newUser)
//       : JSON.stringify(response.data.oldUser)
//   );
// })
