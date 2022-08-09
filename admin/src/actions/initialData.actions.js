import {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
} from "../slices/categorySlice";
import {
  getAllProductsRequest,
  getAllProductsSuccess,
} from "../slices/productSlice";
import axiosIntance from "./../helpers/axios";

export const getInitialData = async (dispatch) => {
  dispatch(getAllProductsRequest());
  dispatch(getAllCategoriesRequest());
  const res = await axiosIntance.get(
    `/initialdata/${localStorage.getItem("token")}`
  );
  if (res.status === 200) {
    const { categories, products } = res.data;
    dispatch(getAllCategoriesSuccess({ categories }));
    dispatch(getAllProductsSuccess({ products }));
  }
};
