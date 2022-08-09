import axios from "axios";
import { logoutSuccess } from "../slices/authSlice";
import { api } from "../urlConfig";
import { store } from "./../store/store";
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
    console.log(error);
    const { status } = error.response;
    if (status === 500 || status === 400) {
      localStorage.clear();
      store.dispatch(logoutSuccess());
    }
    return Promise.reject(error.response);
  }
);

export default axiosIntance;
