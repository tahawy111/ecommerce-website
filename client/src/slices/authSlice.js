import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { firstName: "", lastName: "", fullName: "", email: "", picture: "" },
  authenticate: localStorage.getItem("token") ? true : false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
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

    logoutRequest: (state) => {
      return { ...state, authenticate: true, loading: true };
    },
    logoutSuccess: (state) => {
      localStorage.clear();
      return {
        ...state,
        authenticate: false,
        loading: false,
        token: null,
        user: null,
      };
    },
    logoutFailure: (state, action) => {
      return {
        ...state,
        authenticate: true,
        loading: false,
        error: action.payload.error,
      };
    },
  },
});

export const {
  loginRequest,
  loginFailure,
  loginSuccess,

  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
