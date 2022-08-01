import {
  addNewCategoryFailure,
  addNewCategoryRequest,
  addNewCategorySuccess,
  fetchCategory,
} from "../slices/categorySlice";
import axiosIntance from "./../helpers/axios";

export const addCategory = async (dispatch, form) => {
  dispatch(addNewCategoryRequest());
  const res = await axiosIntance.post("/category/create", form);
  console.log(res);
  if (res.status === 201) {
    dispatch(addNewCategorySuccess(res.data.category));
    dispatch(fetchCategory());
  } else {
    dispatch(addNewCategoryFailure(res.data.error));
  }
};
