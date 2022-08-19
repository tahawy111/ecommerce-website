import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  loading: false,
  page: null,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    createPageRequest: (state, action) => {
      return { ...state, loading: true };
    },

    createPageSuccess: (state, action) => {
      return { ...state, loading: false, page: action.payload.page };
    },

    createPageFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload.error };
    },
  },
});

export const { createPageRequest, createPageSuccess, createPageFailure } =
  pageSlice.actions;

export default pageSlice.reducer;
