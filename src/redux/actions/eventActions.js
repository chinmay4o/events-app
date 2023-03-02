import { getRequest, getAuthenticatedRequest } from "../../utils/API/api.ts";
import {
  ADD_EVENT,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_EDIT_FAIL,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL,
  EVENT_GET_REQUEST,
} from "../constants/eventConstants";

// GET SINGLE EVENT
export const getSingleEvent =
  ({ eventId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_GET_REQUEST });
      // const accessToken = localStorage.getItem("accessToken");

      // if (!accessToken) {
      //   alert("Please Login!! can't find accessToken");
      //   window.location.pathname = "/login";
      // }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/event/${eventId}`
        // {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `bearer ${accessToken}`,
        //   },
        // }
      );

      // if (response.status === 403) {
      //   alert("unAuthorized!!");
      //   window.location.pathname = "/events";
      // }
      const res = await response.json();
      // if (response.data.message) {
      //   throw new Error(data.message);
      // }

      dispatch({ type: EVENT_GET_SUCCESS, payload: res.savedEventConfig });
    } catch (error) {
      dispatch({ type: EVENT_GET_FAIL, payload: error });
    }
  };

// Create event
export const createEvent =
  ({
    title,
    startDate,
    endDate,
    shortDescription,
    location,
    coverImage,
    isMockEvent,
    // eventTag,
  }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_CREATE_REQUEST });

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        return alert("Unauthorised from create reducer");
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title,
            startDate,
            endDate,
            shortDescription,
            location,
            coverImage:
              "https://d2xqcdy5rl17k2.cloudfront.net/images/default-landing-banner.png",
            isMockEvent: isMockEvent === true ? true : false,
            // eventTag,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        throw new Error(data.message);
      }

      dispatch({ type: EVENT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: EVENT_CREATE_FAIL, payload: error });
    }
  };

// edit event
export const editEvent = (eventInfo) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVENT_EDIT_REQUEST });

    // console.log(eventInfo, "eventInfoPP")

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return alert("Unauthorised from edit reducer");
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/event`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...eventInfo }),
    });

    const data = await response.json();

    console.log("Edit event", data);

    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({ type: EVENT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EVENT_EDIT_FAIL, payload: error });
  }
};
