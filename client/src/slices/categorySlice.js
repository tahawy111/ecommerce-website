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
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await axiosIntance.get("/category/getCategory");
      return res.data.categoryList;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// const buildNewCategories = (categories, category) => {
//   let myCategories = [];
//   for (let cat of categories) {
//     myCategories.push({
//       ...cat,
//       children:
//         cat.children && cat.children.length > 0
//           ? buildNewCategories(cat.children, category)
//           : [],
//     });
//   }
//   return myCategories;
// };

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
  reducers: {},
});

// export const {} = categorySlice.actions;

export default categorySlice.reducer;
