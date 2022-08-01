import {
  addNewProductSuccess,
  getAllProductsSuccess,
} from "../slices/productSlice";
import axiosIntance from "./../helpers/axios";

export const addProduct = async (dispatch, form) => {
  const res = await axiosIntance.post("/product/create", form);
  dispatch(addNewProductSuccess({ product: res.data.product }));
};
export const getProducts = async (dispatch) => {
  const res = await axiosIntance.get("/product/getProducts");
  console.log(res.data.products);
  dispatch(getAllProductsSuccess({ products: res.data.products }));
};
