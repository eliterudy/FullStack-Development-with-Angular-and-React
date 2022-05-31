import { LEADERS } from "../shared/leaders";
import { createSlice } from "@reduxjs/toolkit";

const initialState = LEADERS;

export const leadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {
    default: (state) => {
      state = LEADERS;
    },
  },
});

// Action creators are generated for each case reducer function
//   export const { increment } = leadersSlice.actions;
export default leadersSlice.reducer;
