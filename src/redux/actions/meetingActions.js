import {
  BOOK_MEETING_FAILED,
  BOOK_MEETING_SUCCESS,
  CANCEL_MEETING_FAILED,
  CANCEL_MEETING_SUCCESS,
} from "../constants/meetingConstants";

export const bookMeeting = (meetingDetails) => async (dispatch, getState) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return alert("Unauthorised from edit reducer");
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/user-meetings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...meetingDetails,
        }),
      }
    );

    const data = await response.json();
    console.log("Book Meeting", data);

    if (response.status !== 200) {
      throw new Error();
    }

    dispatch({ type: BOOK_MEETING_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: BOOK_MEETING_FAILED, payload: error });
  }
};

export const cancelMeeting = (meetingID) => async (dispatch, getState) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return alert("Unauthorised from edit reducer");
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/user/cancel-meetings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...meetingID,
        }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error();
    }

    dispatch({ type: CANCEL_MEETING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CANCEL_MEETING_FAILED, payload: error });
  }
};
