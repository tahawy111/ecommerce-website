import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  message: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest: (state, action) => {
      return { ...state, loading: true };
    },

    registerSuccess: (state, action) => {
      return { ...state, loading: false, message: action.payload.message };
    },

    registerFailure: (state, action) => {
      return { ...state, loading: false, message: action.payload.error };
    },
  },
});

export const { registerRequest, registerSuccess, registerFailure } =
  userSlice.actions;

export default userSlice.reducer;
