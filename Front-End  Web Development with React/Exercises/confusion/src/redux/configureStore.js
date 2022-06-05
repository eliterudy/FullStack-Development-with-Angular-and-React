import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { createForms } from "react-redux-form";

import thunk from "redux-thunk";
import dishes from "./dishes";
import promotions from "./promotions";
import comments from "./comments";
import leaders from "./leaders";
import { InitialFeedback } from "./forms";

const middleware = [createLogger(), thunk];
const enhancers = [...middleware];
export default configureStore({
  reducer: combineReducers({
    dishes,
    promotions,
    leaders,
    comments,
    ...createForms({
      feedback: InitialFeedback,
    }),
  }),
  middleware: enhancers,
});
