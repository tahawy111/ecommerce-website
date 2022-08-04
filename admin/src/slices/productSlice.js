import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntance from "../helpers/axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axiosIntance.get("/product/getProducts");
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  error: null,
  message: false,
  loading: false,
  products: [],
};

const buildProductList = (products, product) => {
  products.push(product);
  return products;
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    });
  },
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
      // const newProduct = action.payload.product;
      console.log(state.products, action.payload.product);
      return {
        ...state,
        products: buildProductList(state.products, action.payload.product),
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
} = productSlice.actions;

export default productSlice.reducer;
