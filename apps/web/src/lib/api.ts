import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { token: null as string | null, refreshToken: null as string | null };
  }
  const token = window.localStorage.getItem('accessToken');
  const refreshToken = window.localStorage.getItem('refreshToken');
  return { token, refreshToken };
};

api.interceptors.request.use((config) => {
  const { token } = getStoredAuth();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingRequests.push(resolve));
        return api(originalRequest);
      }

      isRefreshing = true;
      try {
        const { refreshToken } = getStoredAuth();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refreshToken,
        });
        const newAccessToken = refreshResponse.data?.token || refreshResponse.data?.data?.token;
        const newRefreshToken = refreshResponse.data?.refreshToken || refreshResponse.data?.data?.refreshToken;

        if (newAccessToken) {
          window.localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            window.localStorage.setItem('refreshToken', newRefreshToken);
          }
          pendingRequests.forEach((resolve) => resolve());
          pendingRequests = [];
          isRefreshing = false;
          return api(originalRequest);
        }
      } catch (refreshError) {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
