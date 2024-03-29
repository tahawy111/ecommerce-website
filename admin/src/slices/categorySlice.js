import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosIntance from "./../helpers/axios";
const initialState = {
  error: null,
  categories: [],
  loading: false,
};
// https://youtu.be/I2aM7YcOXDY
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (arg = null, { rejectWithValue }) => {
    try {
      const res = await axiosIntance.get("/category/getCategory");
      return res.data.categoryList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const buildNewCategories = (categories, category) => {
  let myCategories = [];
  for (let cat of categories) {
    myCategories.push({
      ...cat,
      children:
        cat.children && cat.children.length > 0
          ? buildNewCategories(cat.children, category)
          : [],
    });
  }
  return myCategories;
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
      state.categories = [];
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.payload;
    });
  },
  reducers: {
    getAllCategoriesRequest: (state, action) => {
      return { ...state, categories: [], loading: true };
    },
    getAllCategoriesSuccess: (state, action) => {
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    },
    addNewCategoryRequest: (state) => {
      return { ...state, loading: true };
    },
    addNewCategorySuccess: (state, action) => {
      const updatedCategory = buildNewCategories(
        state.categories,
        action.payload
      );
      return {
        ...state,
        loading: false,
        categories: updatedCategory,
      };
    },
    addNewCategoryFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    updateCategoryRequest: (state) => {
      return { ...state, loading: true };
    },
    updateCategorySuccess: (state) => {
      return { ...state, loading: false };
    },
    updateCategoryFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload.error };
    },
    deleteCategoryRequest: (state) => {
      return { ...state, loading: true };
    },
    deleteCategorySuccess: (state) => {
      return { ...state, loading: false };
    },
    deleteCategoryFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload.error };
    },
  },
});

export const {
  addNewCategoryRequest,
  addNewCategorySuccess,
  addNewCategoryFailure,
  getAllCategoriesSuccess,
  getAllCategoriesRequest,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
