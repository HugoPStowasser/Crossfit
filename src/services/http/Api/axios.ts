import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://localhost:3000",
});
