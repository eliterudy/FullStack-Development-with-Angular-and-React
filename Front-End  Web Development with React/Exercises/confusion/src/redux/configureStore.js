import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import logger, { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import dishes from "./dishes";
import promotions from "./promotions";
import comments from "./comments";
import leaders from "./leaders";

const middleware = [createLogger(), thunk];
const enhancers = [...middleware];
export default configureStore({
  reducer: combineReducers({ dishes, promotions, leaders, comments }),
  middleware: enhancers,
});
