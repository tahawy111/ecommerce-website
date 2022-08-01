import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: null,
  message: false,
  loading: false,
  products: [],
};

export const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // getAllInitialDataRequest: (state, action) => {},
    // getAllInitialDataSuccess: (state, action) => {},
    // getAllInitialDataFailure: (state, action) => {},
    getAllProductsRequest: (state, action) => {
      return { ...state, products: [], loading: true };
    },
    getAllProductsSuccess: (state, action) => {
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
    },
    addNewProductSuccess: (state, action) => {
      const newProduct = action.payload.product;
      return {
        ...state,
        products: state.products.push({ ...newProduct }),
        loading: false,
      };
    },
    getAllProductsFailure: (state, action) => {},
  },
});

export const {
  // getAllInitialDataRequest,
  // getAllInitialDataSuccess,
  // getAllInitialDataFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailure,
  addNewProductSuccess,
} = userSlice.actions;

export default userSlice.reducer;
