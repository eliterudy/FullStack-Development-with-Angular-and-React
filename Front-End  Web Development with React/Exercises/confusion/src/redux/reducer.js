import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { COMMENTS } from "../shared/comments";
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dishes: DISHES,
  promotions: PROMOTIONS,
  comments: COMMENTS,
  leaders: LEADERS,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      state = { ...state, dishes: DISHES };
  }

  return state;
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = rootSlice.actions;
export default rootSlice.reducer;
