import axios from "axios";
import {
  ACCESS_TOKEN_LOCALSTORAGE,
  REFRESH_TOKEN_LOCALSTORAGE,
} from "../custom";
const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/",
  timeout: 5000,
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 || !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE);
      const response = await axiosInstance.post("/api/auth/refreshToken", {
        refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(
          ACCESS_TOKEN_LOCALSTORAGE,
          response.data.accessToken
        );
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
