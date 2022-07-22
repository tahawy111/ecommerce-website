import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "Amer" };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    auth: (state = { name: "Amer" }, action) => {
      return state;
    },
  },
});

export const { auth } = counterSlice.actions;

export default counterSlice.reducer;
