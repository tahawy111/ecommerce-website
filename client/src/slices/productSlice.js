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
  pageRequest: false,
  page: {},
  productDetails: {},
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

    getProductPageRequest: (state) => {
      return { ...state, page: [], pageRequest: true };
    },
    getProductPageSuccess: (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
    },
    getProductPageFailure: (state, action) => {
      return {
        ...state,
        products: action.payload.error,
        pageRequest: false,
      };
    },
    getProductDetailsByIdRequest: (state) => {
      return {
        ...state,
        productDetails: {},
        loading: true,
      };
    },
    getProductDetailsByIdSuccess: (state, action) => {
      return {
        ...state,
        productDetails: action.payload.product,
        loading: false,
      };
    },
    getProductDetailsByIdFailure: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    },
  },
});

export const {
  getProductsBySlugRequest,
  getProductsBySlugSuccess,
  getProductPageRequest,
  getProductPageSuccess,
  getProductPageFailure,
  getProductDetailsByIdRequest,
  getProductDetailsByIdSuccess,
  getProductDetailsByIdFailure,
} = productSlice.actions;

export default productSlice.reducer;
