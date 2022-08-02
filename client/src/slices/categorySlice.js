import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntance from "../helpers/axios";

const initialState = {
  error: null,
  categories: [],
  loading: false,
};
// https://youtu.be/I2aM7YcOXDY
// export const fetchCategory = createAsyncThunk(
//   "category/fetchCategory",
//   async (id = null, { rejectWithValue }) => {
//     try {
//       const res = await axiosIntance.get("/category/getCategory");
//       return res.data.categoryList;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (arg = null, { rejectWithValue }) => {
    try {
      const res = await axiosIntance.get("/category/getCategory");
      return res.data.categoryList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
      state.categories = [];
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.payload;
    });
  },
  reducers: {
    getAllCategoryRequest: (state) => {
      return { ...state, loading: true, categories: [] };
    },
    getAllCategorySuccess: (state, action) => {
      return { ...state, loading: false, categories: action.payload };
    },
    getAllCategoryFailure: (state, action) => {
      return { ...state, loading: false, categories: action.payload };
    },
  },
});

export const {
  getAllCategoryRequest,
  getAllCategorySuccess,
  getAllCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
