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
  if (res.status === 201) {
    dispatch(addNewCategorySuccess(res.data.category));
    dispatch(fetchCategory());
  } else {
    dispatch(addNewCategoryFailure(res.data.error));
  }
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/category/update", form);
    if (res.status === 201) {
      dispatch(fetchCategory());
    } else {
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/category/delete", {
      payload: { ids },
    });
    if (res.status === 201) {
      console.log(res);
      dispatch(fetchCategory());
    } else {
      console.log(res);
    }
  };
};
