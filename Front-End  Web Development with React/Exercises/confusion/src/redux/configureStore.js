import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import dishes from "./dishes";
import promotions from "./promotions";
import comments from "./comments";
import leaders from "./leaders";

export default configureStore({
  reducer: combineReducers({ dishes, promotions, leaders, comments }),
});
