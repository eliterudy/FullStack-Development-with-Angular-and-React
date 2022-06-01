import { COMMENTS } from "../shared/comments";
import { createSlice } from "@reduxjs/toolkit";

const initialState = COMMENTS;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      state.push(comment);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
