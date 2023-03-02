import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_EVENTS_SUCCESS,
  USER_EVENTS_REQUEST,
  USER_EVENTS_FAIL,
  USER_EVENTS_EMPTY,
} from "../constants/userConstants";

//LOGIN REDUCER
export const userLoginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

// USER DETAILS REDUCER
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// USER DETAILS UPDATE REDUCER
export const userUpdateProfileReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, success: false };

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//User-Events REDUCER
export const getUserEventsReducer = (state = { userEvents: {} }, action) => {
  switch (action.type) {
    case USER_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userEvents: action.payload,
      };

    case USER_EVENTS_EMPTY:
      return {
        loading: false,
        userEvents: action.payload,
      };

    case USER_EVENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
