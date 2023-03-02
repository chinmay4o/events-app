import {
  ADD_EVENT,
  UPDATE_EVENT,
  CARRY_EVENT,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_EDIT_FAIL,
  EVENT_CREATE_DESTROY,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL,
  EVENT_GET_REQUEST,
} from "../constants/eventConstants";

//get event REDUCER
export const getEventReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EVENT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };

    case EVENT_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_EVENT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

// create event reducer
export const createEventReducer = (state = { createdEvent: {} }, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EVENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        createdEvent: action.payload,
      };

    case EVENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case EVENT_CREATE_DESTROY:
      return {
        loading: false,
        createdEvent: null,
      };

    case CARRY_EVENT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

// create event reducer
export const editEventReducer = (state = { createdEvent: {} }, action) => {
  switch (action.type) {
    case EVENT_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EVENT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        editedEvent: action.payload,
      };

    case EVENT_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
