import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "@/utils/token";
import { useUserStore } from "@/store/user";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: ApiErrorData
  ) {
    super(message);
  }
}

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
    const { response, message } = error;
    if (response && response.data) {
      if (isTokenInvalid(response.status, response.data.code)) {
        useUserStore().logout();
        location.reload();
      }

      return Promise.reject(
        new ApiError(message, response.status, response.data)
      );
    }

    return Promise.reject(error);
  }
);

function request<T = any, R = any>(config: AxiosRequestConfig<R>): Promise<T> {
  return axiosInstance(config).then((res) => res.data);
}

function isTokenInvalid(status: number, code: string) {
  return status === 401 && code === "TOKEN_INVALID";
}

export function isTokenInvalidError(error: unknown) {
  return (
    error instanceof ApiError && isTokenInvalid(error.status, error.data.code)
  );
}

export default request;
