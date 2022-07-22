import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "Amer" };

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state = { name: "Amer" }, action) => {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
