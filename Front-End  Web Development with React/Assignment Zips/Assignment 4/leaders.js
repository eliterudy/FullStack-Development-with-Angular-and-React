import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  errMess: null,
  leaders: [],
};
export const leadersSlice = createSlice({
  name: "leaders",
  initialState,
  reducers: {
    leadersLoading: (state) => {
      state.errMess = null;
      state.isLoading = true;
    },
    leadersFailed: (state, action) => {
      state.errMess = action.payload;
      state.isLoading = false;
    },
    addLeaders: (state, action) => {
      state.errMess = null;
      state.isLoading = false;
      state.leaders = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { leadersLoading, leadersFailed, addLeaders } =
  leadersSlice.actions;
export default leadersSlice.reducer;
