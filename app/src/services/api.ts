import axios from "axios";
import { ACCES_TOKEN, API_URL } from "../constants";
import { refreshToken, deleteTokens } from "../utils/tokenManager";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCES_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const success = await refreshToken();
      if (!success) {
        deleteTokens();
        return Promise.reject(error);
      }
      return api(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
