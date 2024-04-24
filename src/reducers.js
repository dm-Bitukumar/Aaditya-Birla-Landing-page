/**
 * Root Reducer
 */
import { combineReducers } from "redux";
import AppReducer from "./store/app/appReducer";

// Combine all reducers into one root reducer
export default combineReducers({
  AppReducer,
});
