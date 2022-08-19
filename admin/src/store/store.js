import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import categorySlice from "../slices/categorySlice";
import orderSlice from "../slices/orderSlice";
import pageSlice from "../slices/pageSlice";
import productSlice from "../slices/productSlice";
import userSlice from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    order: orderSlice,
    category: categorySlice,
    page: pageSlice,
  },
});
