import { DISHES } from "../shared/dishes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  errMess: null,
  dishes: [],
};
export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    dishesLoading: (state) => {
      state.errMess = null;
      state.isLoading = false;
    },
    dishesFailed: (state, action) => {
      state.errMess = action.payload;
      state.isLoading = false;
    },
    addDishes: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.dishes = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { dishesLoading, dishesFailed, addDishes } = dishesSlice.actions;
export default dishesSlice.reducer;
