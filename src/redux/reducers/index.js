import { combineReducers } from "redux";
import courses from "./courseReducer"; //because this is the default export, import-name could be changed from courseReducer to course
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  //   courses: courses,
});

export default rootReducer;
