import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  errMess: null,
  promotions: [],
};
export const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    promotionsLoading: (state) => {
      state.errMess = null;
      state.isLoading = true;
    },
    promotionsFailed: (state, action) => {
      state.errMess = action.payload;
      state.isLoading = false;
    },
    addPromotions: (state, action) => {
      state.errMess = null;
      state.isLoading = false;
      state.promotions = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { promotionsLoading, promotionsFailed, addPromotions } =
  promotionsSlice.actions;
export default promotionsSlice.reducer;
