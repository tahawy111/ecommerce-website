import { loginFailure, loginRequest, loginSuccess } from "../slices/authSlice";
import axiosIntance from "./../helpers/axios";
import { toast } from "react-toastify";

export const userLogin = (tookUser) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const { data } = await axiosIntance.post("/signin", tookUser);

      const { token, user } = data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      dispatch(loginFailure(error.data));
      toast.error(error.data.message);
    }
  };
};
