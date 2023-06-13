import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://localhost:7049/api",
});

const logout = () => {
  localStorage.clear();
  axios.interceptors.request.eject(interceptorApi);
  window.location.reload();
};

export const interceptorApi = axiosApi.interceptors.request.use(
  async (config) => {
    if (config.url?.includes("user")) return config;

    const token = localStorage.getItem("@Token" || "{}");
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

    config.headers.setAuthorization(`Bearer ${token}`);
    config.headers["content-type"] = !!file
      ? "multipart/form-data"
      : "application/json";

    if (!!file) {
      const bodyFormData = new FormData();
      bodyFormData.append("file", config.data[0]);
    }
    return config;
  }
);
