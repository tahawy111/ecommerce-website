import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      return { ...state, cartItems: action.payload.cartItems };
    },
  },
});

export const { AddToCart } = cartSlice.actions;

export default cartSlice.reducer;
