import axios from "axios";
import { api } from "./api";
import { store } from "../store/store";
import { logoutSuccess } from "../slices/authSlice";
const token = localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();

  if (auth.token) {
    req.headers.authorization = `Bearer ${auth.token}`;
  }

  return req;
});
axiosIntance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { status } = error.response;
    if (status === 500 || status === 400) {
      store.dispatch(logoutSuccess());
    }
    return Promise.reject(error.response);
  }
);

export default axiosIntance;
