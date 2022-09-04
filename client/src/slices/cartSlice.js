import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  cart: {},
  error: "",
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
    getCartByIdRequest: (state, action) => {
      return { ...state, loading: true, cart: {}, error: "" };
    },
    getCartByIdSuccess: (state, action) => {
      return { ...state, loading: false, cart: action.payload.cart };
    },
    getCartByIdFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    },
    updateCartQuantityRequest: (state) => {
      return {
        ...state,
        loading: false,
        cart: {},
        error: "",
      };
    },
    updateCartQuantitySuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
      };
    },
    updateCartQuantityFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    },
  },
});

export const {
  addItemToCartRequest,
  addItemToCartSuccess,
  addItemToCartFailure,
  getCartByIdRequest,
  getCartByIdSuccess,
  getCartByIdFailure,
  updateCartQuantityRequest,
  updateCartQuantitySuccess,
  updateCartQuantityFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
