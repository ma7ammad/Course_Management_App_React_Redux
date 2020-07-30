import { combineReducers } from "redux";
import courses from "./courseReducer"; //because this is the default export, import-name could be changed from courseReducer to course
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  //   courses: courses,
});

export default rootReducer;
