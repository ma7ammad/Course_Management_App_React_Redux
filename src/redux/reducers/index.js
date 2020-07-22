import { combineReducers } from "redux";
import courses from "./courseReducer"; //because this is the default export, import-name could be changed from courseReducer to course

const rootReducer = combineReducers({
  courses,
  //   courses: courses,
});

export default rootReducer;
