import axiosIntance from "../helpers/axios";
import { loginSuccess, loginFailure, loginRequest } from "../slices/authSlice";
import { toast } from "react-toastify";
export const userLogin = (tookUser) => {
  return async (dispatch) => {
    dispatch(loginRequest(tookUser));
    try {
      const res = await axiosIntance.post("/signin", tookUser);
      console.log(res);

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      dispatch(loginFailure(error.data));
      toast.error(error.data.message);
    }
  };
};
export const isUserLoggedIn = (dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token) {
    dispatch(loginSuccess({ token, user: JSON.parse(user) }));
  } else {
    dispatch(loginFailure({ authenticate: false, error: "Failed to login" }));
  }
};
