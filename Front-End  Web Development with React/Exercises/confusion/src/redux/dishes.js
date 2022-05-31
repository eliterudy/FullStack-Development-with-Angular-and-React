import { DISHES } from "../shared/dishes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = DISHES;

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    default: (state) => {
      state.dishes = DISHES;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = dishesSlice.actions;
export default dishesSlice.reducer;
