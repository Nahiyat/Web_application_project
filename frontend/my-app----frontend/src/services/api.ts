/*
import axios from "axios";
//const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '/api'
const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export default api;
*/
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) throw new Error("No refresh token");

        // Request new access token
        const res = await axios.post("http://localhost:8000/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;

        // Save new access token
        localStorage.setItem("token", newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (err) {
        // Refresh failed → logout
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;