import axiosIntance from "../helpers/axios";
import {
  createPageFailure,
  createPageRequest,
  createPageSuccess,
} from "../slices/pageSlice";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch(createPageRequest());
    try {
      const res = await axiosIntance.post("/page/create", form);
      if (res.status === 201) {
        dispatch(createPageSuccess({ page: res.data.page }));
      } else {
        dispatch(createPageFailure({ error: res.data.error }));
      }
    } catch (error) {}
  };
};
