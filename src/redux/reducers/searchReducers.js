import {
  SEARCH_REGISTRATION_VALUE,
  SEARCH_SPEAKER_VALUE,
} from "../constants/searchBarConstants";

export const speakerSearchReducer = (state = { value: "" }, action) => {
  switch (action.type) {
    case SEARCH_SPEAKER_VALUE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const registrationSearchReducer = (state = { value: "" }, action) => {
  switch (action.type) {
    case SEARCH_REGISTRATION_VALUE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
