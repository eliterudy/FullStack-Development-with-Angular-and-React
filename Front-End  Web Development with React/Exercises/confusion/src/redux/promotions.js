import { PROMOTIONS } from "../shared/promotions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = PROMOTIONS;

export const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    default: (state) => {
      state = PROMOTIONS;
    },
  },
});

// Action creators are generated for each case reducer function
//   export const { increment } = promotionsSlice.actions;
export default promotionsSlice.reducer;
