import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  message: false,
  loading: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    createPageRequest: (state, action) => {
      return { ...state, loading: true };
    },

    createPageSuccess: (state, action) => {
      return { ...state, loading: false, message: action.payload.message };
    },

    createPageFailure: (state, action) => {
      return { ...state, loading: false, message: action.payload.error };
    },
  },
});

export const { createPageRequest, createPageSuccess, createPageFailure } =
  pageSlice.actions;

export default pageSlice.reducer;
