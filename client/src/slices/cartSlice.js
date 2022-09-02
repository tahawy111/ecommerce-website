import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  cart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCartRequest: (state, action) => {
      return { ...state, loading: true, cart: {} };
    },
    addItemToCartSuccess: (state, action) => {
      return { ...state, loading: false, cart: action.payload.cart };
    },
    addItemToCartFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload.error };
    },
  },
});

export const {
  addItemToCartRequest,
  addItemToCartSuccess,
  addItemToCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
