import {
  addNewCategoryFailure,
  addNewCategoryRequest,
  addNewCategorySuccess,
  fetchCategory,
  updateCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
} from "../slices/categorySlice";
import axiosIntance from "./../helpers/axios";

export const addCategory = async (dispatch, form) => {
  dispatch(addNewCategoryRequest());
  try {
    const res = await axiosIntance.post("/category/create", form);
    if (res.status === 201) {
      dispatch(addNewCategorySuccess(res.data.category));
      dispatch(fetchCategory());
    } else {
      dispatch(addNewCategoryFailure(res.data.error));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch(updateCategoryRequest());
    const res = await axiosIntance.post("/category/update", form);
    if (res.status === 201) {
      dispatch(updateCategorySuccess());
      dispatch(fetchCategory());
    } else {
      const { error } = res.data;
      dispatch(updateCategoryFailure({ error }));
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/category/delete", {
      payload: { ids },
    });
    if (res.status === 201) {
      dispatch(fetchCategory());
    } else {
      console.log(res);
    }
  };
};
