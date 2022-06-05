import { COMMENTS } from "../shared/comments";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  errMess: null,
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addNewComment: (state, action) => {
      var newComment = action.payload;
      state.comments = [...state.comments, newComment];
    },
    commentsLoading: (state) => {
      state.errMess = null;
      state.isLoading = true;
    },
    commentsFailed: (state, action) => {
      state.errMess = action.payload;
      state.isLoading = false;
    },
    addComments: (state, action) => {
      state.errMess = null;
      state.isLoading = false;
      state.comments = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewComment, commentsLoading, commentsFailed, addComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
