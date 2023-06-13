import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://localhost:7049/api",
});

export const interceptorApi = axiosApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("@Token" || "{}");

    if (!token) {
      sessionStorage.clear();
    } else {
      const tokenObject = JSON.parse(atob(token.split(".")[1]));
      const now = new Date();
      if (now >= new Date(tokenObject.exp)) {
        sessionStorage.clear();
        axios.interceptors.request.eject(interceptorApi);
      }
    }

    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";

    const file = config.data
      ? Array.from(config.data).find((item: any) => item instanceof File)
      : null;
    if (!!file) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", config.data[0]);
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  }
);
