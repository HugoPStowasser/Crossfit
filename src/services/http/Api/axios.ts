import axios, { InternalAxiosRequestConfig } from "axios";

const axiosApi = axios.create({
  baseURL: "https://localhost:7049/api",
});

const interceptorFn = async (config: InternalAxiosRequestConfig) => {
  if (config.url?.includes("login")) return config;

  const token = localStorage.getItem("@Token" || "");
  if (!token) {
    logout();
  } else {
    const tokenObject = JSON.parse(atob(token.split(".")[1]));
    const now = new Date();
    if (new Date(tokenObject.exp) >= now) {
      logout();
    }
  }

  const file = config.data
    ? Array.from(config.data).find((item: any) => item instanceof File)
    : null;

  config.headers["authorization"] = `Bearer ${token}`;
  config.headers["content-type"] = !!file
    ? "multipart/form-data"
    : "application/json";

  if (!!file) {
    const bodyFormData = new FormData();
    bodyFormData.append("file", config.data[0]);
  }

  return config;
};

const ejectInterceptors = axiosApi.interceptors.request.use(interceptorFn);

const logout = async () => {
  axios.interceptors.request.eject(ejectInterceptors);
  localStorage.clear();
  window.location.reload();
};

export { axiosApi, logout };
