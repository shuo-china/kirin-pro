import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "@/utils/token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // http status code !2xx
    const { response } = error;
    if (response && response.data) {
      if (response.status === 401 && response.data?.code === "TOKEN_INVALID") {
        // logout
      }

      return Promise.reject(response.data);
    }

    return Promise.reject(error);
  }
);

function request<T = any, R = any>(config: AxiosRequestConfig<R>): Promise<T> {
  return axiosInstance(config).then((res) => res.data);
}

export default request;
