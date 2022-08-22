import axiosIntance from "./../helpers/axios";
import {
  getProductPageFailure,
  getProductPageRequest,
  getProductPageSuccess,
  getProductsBySlugRequest,
  getProductsBySlugSuccess,
} from "../slices/productSlice";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    dispatch(getProductsBySlugRequest());
    const res = await axiosIntance.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch(getProductsBySlugSuccess(res.data));
    }
  };
};
export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload;
      dispatch(getProductPageRequest());
      const res = await axiosIntance.get(`/page/${cid}/${type}`);

      if (res.status === 200) {
        dispatch(getProductPageSuccess({ page: res.data.page }));
      } else {
        dispatch(getProductPageFailure({ error: res.data.error }));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
