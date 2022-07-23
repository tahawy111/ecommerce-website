import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: { firstName: "", lastName: "", fullName: "", email: "", picture: "" },
  authenticate: false,
  authenticating: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      return { ...state, authenticating: true };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
    },
    loginFailure: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { loginRequest, loginFailure, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
