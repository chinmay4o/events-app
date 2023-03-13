import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_EVENTS_SUCCESS,
  USER_EVENTS_REQUEST,
  USER_EVENTS_FAIL,
  USER_EVENTS_EMPTY,
} from "../constants/userConstants";

// LOGIN ACTION
export const login =
  ({ email, firstName, lastName, mobile, organization, jobTitle, linkedinAccessToken}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            mobile,
            organization,
            jobTitle,
            "linkedinAccessToken": linkedinAccessToken ? linkedinAccessToken : null
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        throw new Error("invalid email");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      if (data.newUser?.firstName) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            ...data.newUser,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          },
        });
      } else {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            ...data.oldUser,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          },
        });
      }

      // localStorage.setItem(
      //   "userInfo",
      //   JSON.stringify(getState().userLogin.userInfo)
      // );
      localStorage.setItem(
        "user",
        data.newUser
          ? JSON.stringify(data.newUser)
          : JSON.stringify(data.oldUser)
      );
      // if (data.newUser?.firstName) {
      //   if (data.newUser.organizer?.events.length === 0) {
      //     router.push("/login/demoevent");
      //   }
      // }
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: err.message,
      });
    }
  };

// LOGOUT ACTION
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
};

// GET USER DETAILS;
export const getUserDetails =
  ({ accessToken }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: {
          ...data,
        },
      });

      // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
    }
  };

//USER UPDATE ACTIONS
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch("/api/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userInfo.token}`,
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    // i am doing this change for a bug in ...
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error });
  }
};

//USER GET ALL USER-EVENTS
export const getUserEvents =
  ({ accessToken }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_EVENTS_REQUEST });

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/events`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      console.log("userEvents", data);

      if (data.message) {
        throw new Error("invalid req in getUserEvents");
      }

      dispatch({
        type: USER_EVENTS_SUCCESS,
        payload: [...data],
      });
    } catch (err) {
      dispatch({
        type: USER_EVENTS_FAIL,
        payload: err.message,
      });
    }
  };
