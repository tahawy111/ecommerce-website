import {
  getAllCategoryFailure,
  getAllCategoryRequest,
  getAllCategorySuccess,
} from "../slices/categorySlice";
import axiosIntance from "./../helpers/axios";

// export const getAllCategory = () => {
//   return async (dispatch) => {
//     //     dispatch(getAllCategoryRequest());
//     try {
//       const res = await axiosIntance.get("/category/getCategory");
//       console.log(res);
//       //  dispatch(getAllCategorySuccess(res.data.categoryList));
//     } catch (error) {
//       //  dispatch(getAllCategoryFailure(error.response.data.error));
//     }
//   };
// };
