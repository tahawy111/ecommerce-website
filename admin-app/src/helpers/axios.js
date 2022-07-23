import axios from "axios";
import { api } from "../urlConfig";

const axiosIntance = axios.create({
  baseURL: api,
  //   headers: {
  //     authorization: "",
  //   },
});

export default axiosIntance;
