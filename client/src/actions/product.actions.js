import axiosIntance from "./../helpers/axios";
import {
  getProductsBySlugRequest,
  getProductsBySlugSuccess,
} from "../slices/productSlice";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    dispatch(getProductsBySlugRequest());
    const res = await axiosIntance.get(`products/${slug}`);
    if (res.status === 200) {
      dispatch(getProductsBySlugSuccess(res.data));
    }
  };
};
