import {
  BOOK_MEETING,
  BOOK_MEETING_FAILED,
  BOOK_MEETING_SUCCESS,
  CANCEL_MEETING_FAILED,
  CANCEL_MEETING_SUCCESS,
} from "../constants/meetingConstants";

export const bookMeetingReducer = (state = { bookedMeeting: [] }, action) => {
  switch (action.type) {
    case BOOK_MEETING:
      return {
        ...state,
      };

    case BOOK_MEETING_SUCCESS:
      return {
        ...state,
        bookedMeeting: action.payload,
      };

    case BOOK_MEETING_FAILED:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const cancelMeetingReducer = (state = { cancelMeeting: [] }, action) => {
  switch (action.type) {
    case CANCEL_MEETING_SUCCESS:
      return {
        ...state,
        cancelMeeting: action.payload,
      };

    case CANCEL_MEETING_FAILED:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
