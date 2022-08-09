import axios from "axios";
import { api } from "../urlConfig";
const token = localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

axiosIntance.interceptors.request.use((req) => req);
axiosIntance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error);
    return Promise.reject(error.response);
  }
);

export default axiosIntance;
