import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under30k: [],
  },
  loading: false,
};

export const productSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getProductsBySlugRequest: (state) => {
      return { ...state, products: [], loading: true };
    },
    getProductsBySlugSuccess: (state, action) => {
      return {
        ...state,
        products: action.payload.products,
        productsByPrice: { ...action.payload.productsByPrice },
        loading: false,
      };
    },
  },
});

export const { getProductsBySlugRequest, getProductsBySlugSuccess } =
  productSlice.actions;

export default productSlice.reducer;
