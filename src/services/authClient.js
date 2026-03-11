import axios from "axios";

// 從 cookie 讀取 userToken
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

authClient.interceptors.request.use((config) => {
  const token = getCookie("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

authClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
);
