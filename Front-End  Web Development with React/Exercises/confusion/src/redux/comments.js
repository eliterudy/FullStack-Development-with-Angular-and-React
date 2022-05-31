import { COMMENTS } from "../shared/comments";
import { createSlice } from "@reduxjs/toolkit";

const initialState = COMMENTS;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    default: (state) => {
      state = COMMENTS;
    },
  },
});

// Action creators are generated for each case reducer function
//   export const { increment } = commentsSlice.actions;
export default commentsSlice.reducer;
