import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function unwrapMessage(err) {
  if (axios.isAxiosError(err)) {
    if (!err.response && (err.code === 'ERR_NETWORK' || err.message === 'Network Error')) {
      return 'Cannot reach the API. Run npm run dev (starts API on :5000 and web on :3000).';
    }
    const data = err.response?.data;
    return data?.message || err.message || 'Request failed';
  }
  return err instanceof Error ? err.message : 'Request failed';
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      refreshToken &&
      !String(originalRequest.url).includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${API_URL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } },
        );
        const access = res.data?.data?.accessToken;
        const nextRefresh = res.data?.data?.refreshToken ?? refreshToken;
        if (!access) throw new Error('Refresh failed');
        useAuthStore.getState().setTokens(access, nextRefresh);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch {
        useAuthStore.getState().logoutClient();
      }
    }

    return Promise.reject(new Error(unwrapMessage(error)));
  },
);

export default api;
