'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import api from '@/services/api';
import { mapApiUser } from '@/lib/map-user';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/providers/ToastProvider';

const PUBLIC_PREFIXES = ['/login', '/register', '/forgot-password', '/verify-otp'];

function isPublicPath(pathname: string): boolean {
  if (pathname === '/') return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { error: showError } = useToast();
  const hydrateFromStorage = useAuthStore((state) => state.hydrateFromStorage);
  const logoutClient = useAuthStore((state) => state.logoutClient);
  const setAuthSession = useAuthStore((state) => state.setAuthSession);
  const setTokens = useAuthStore((state) => state.setTokens);

  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    hydrateFromStorage();

    let cancelled = false;

      const bootstrap = async () => {
        const state = useAuthStore.getState();
        const refreshToken = state.refreshToken;

        if (!state.accessToken && !refreshToken) {
        logoutClient();
        if (!cancelled) setSessionReady(true);
        return;
      }

      const loadMe = async () => {
        const response = await api.get<{ data?: { user: Record<string, unknown> } }>('/auth/me');
        const mapped = mapApiUser(response.data?.data?.user ?? null);

        if (!mapped) {
          throw new Error('Invalid session payload');
        }

        return mapped;
      };

      try {
        if (!useAuthStore.getState().accessToken && refreshToken) {
          const refreshResponse = await axios.post<{ data?: { accessToken?: string; refreshToken?: string } }>(
            `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'}/auth/refresh-token`,
            { refreshToken },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } },
          );

          const nextAccess = refreshResponse.data?.data?.accessToken ?? null;
          const nextRefresh = refreshResponse.data?.data?.refreshToken ?? refreshToken;

          if (!nextAccess) {
            throw new Error('Refresh failed');
          }

          setTokens(nextAccess, nextRefresh);
        }

        const user = await loadMe();

        if (!cancelled) {
          const access = useAuthStore.getState().accessToken;
          const refresh = useAuthStore.getState().refreshToken;

          if (access) {
            setAuthSession(user, access, refresh);
          }
        }
      } catch {
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post<{ data?: { accessToken?: string; refreshToken?: string } }>(
              `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'}/auth/refresh-token`,
              { refreshToken },
              { withCredentials: true, headers: { 'Content-Type': 'application/json' } },
            );

            const nextAccess = refreshResponse.data?.data?.accessToken ?? null;
            const nextRefresh = refreshResponse.data?.data?.refreshToken ?? refreshToken;

            if (!nextAccess) {
              throw new Error('Refresh failed');
            }

            setTokens(nextAccess, nextRefresh);
            const user = await loadMe();

            if (!cancelled) {
              setAuthSession(user, nextAccess, nextRefresh);
            }
          } catch {
            logoutClient();
            if (!isPublicPath(pathname)) {
              showError('Your session expired. Please sign in again.');
            }
          }
        } else {
          logoutClient();
        }
      } finally {
        if (!cancelled) {
          setSessionReady(true);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [hydrateFromStorage, logoutClient, pathname, setAuthSession, setTokens, showError]);

  useEffect(() => {
    if (!sessionReady) return;

    const state = useAuthStore.getState();
    const authed = Boolean(state.accessToken && state.user);
    const publicPath = isPublicPath(pathname);

    if (!authed && !publicPath) {
      router.replace('/login');
    }

    if (authed && (pathname === '/login' || pathname === '/register' || pathname === '/forgot-password')) {
      router.replace('/dashboard');
    }
  }, [pathname, router, sessionReady]);

  if (!sessionReady && !isPublicPath(pathname)) {
    return (
      <div className="min-h-screen bg-[#04110d] text-emerald-100 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/60 px-5 py-4 backdrop-blur-xl">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-300" />
          <span className="text-sm font-medium">Restoring your secure session...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
