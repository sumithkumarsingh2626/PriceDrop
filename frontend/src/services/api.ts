/**
 * Axios client with auth headers, refresh interceptor, backend envelope-aware errors.
 */

import axios from 'axios';
import type { ApiErrorBody } from '@/types/api.types';
import { useAuthStore } from '@/store/authStore';

const API_URL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'
    : process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export function unwrapMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response && (err.code === 'ERR_NETWORK' || err.message === 'Network Error')) {
      return (
        'Cannot reach the API. Start the backend on port 5000 and ensure NEXT_PUBLIC_API_URL matches ' +
        '(e.g. http://localhost:5000/api). If the browser origin differs from the API, CORS must allow it.'
      );
    }
    const data = err.response?.data as ApiErrorBody | undefined;
    return data?.message || err.message || 'Request failed';
  }
  return err instanceof Error ? err.message : 'Request failed';
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    const status = error.response?.status;
    const refreshToken = useAuthStore.getState().refreshToken;

    if (
      status === 401 &&
      !originalRequest?._retry &&
      refreshToken &&
      !originalRequest?.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post<{ data?: { accessToken?: string; refreshToken?: string } }>(
          `${API_URL}/auth/refresh-token`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );
        const envelope = res.data as { success?: boolean; data?: { accessToken?: string; refreshToken?: string } };
        const access = envelope.data?.accessToken;
        const nextRefresh = envelope.data?.refreshToken ?? refreshToken;
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
