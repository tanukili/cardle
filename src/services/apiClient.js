import axios from "axios";

export const apiClient = axios.create({
  // 直接在前面加上 export
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);
