import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import categorySlice from "../slices/categorySlice";
import productSlice from "../slices/productSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    product: productSlice,
    auth: authSlice,
    cart: cartSlice,
  },
});
