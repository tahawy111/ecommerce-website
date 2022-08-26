import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
} from "../slices/authSlice";
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

export const logout = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/signout");

    dispatch(logoutRequest());
    if (res.status === 200) {
      localStorage.clear();
      dispatch(logoutSuccess());
    } else {
      dispatch(loginFailure({ error: res.data.error }));
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      dispatch(loginSuccess({ token, user: JSON.parse(user) }));
    } else {
      dispatch(loginFailure({ authenticate: false, error: "Failed to login" }));
    }
  };
};
