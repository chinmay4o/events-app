import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  getUserEventsReducer,
} from "./reducers/userReducers";
import {
  speakerSearchReducer,
  registrationSearchReducer,
} from "./reducers/searchReducers";
import {
  getEventReducer,
  createEventReducer,
  editEventReducer,
} from "./reducers/eventReducers";
import {
  bookMeetingReducer,
  cancelMeetingReducer,
} from "./reducers/meetingReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userEvents: getUserEventsReducer,
  eventData: getEventReducer,
  createdEvent: createEventReducer,
  editedEvent: editEventReducer,
  searchSpeaker: speakerSearchReducer,
  searchRegistration: registrationSearchReducer,
  bookedMeeting: bookMeetingReducer,
  cancelledMeeting: cancelMeetingReducer,
});

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {
  userLogin: { userInfo: {} },
  userEvents: { userEvents: [] },
  // createdEvent: {createdEvent: {}}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
