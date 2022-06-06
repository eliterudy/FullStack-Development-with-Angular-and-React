import * as dishesActionReducers from "./dishes";
import * as promotionsActionReducers from "./promotions";
import * as leadersActionReducers from "./leaders";
import * as commentsActionReducers from "./comments";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...dishesActionReducers,
  ...commentsActionReducers,
  ...leadersActionReducers,
  ...promotionsActionReducers,
};
