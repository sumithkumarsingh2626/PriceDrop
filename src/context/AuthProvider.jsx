import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '@/services/api.js';
import { mapApiUser } from '@/lib/map-user';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/context/ToastProvider';

const PUBLIC_PREFIXES = ['/login', '/register', '/forgot-password', '/verify-otp'];
const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

function isPublicPath(pathname) {
  if (pathname === '/') return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
        const response = await api.get('/auth/me');
        const mapped = mapApiUser(response.data?.data?.user ?? null);
        if (!mapped) throw new Error('Invalid session payload');
        return mapped;
      };

      const refreshSession = async () => {
        const res = await axios.post(
          `${API_BASE}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } },
        );
        const nextAccess = res.data?.data?.accessToken ?? null;
        const nextRefresh = res.data?.data?.refreshToken ?? refreshToken;
        if (!nextAccess) throw new Error('Refresh failed');
        setTokens(nextAccess, nextRefresh);
        return loadMe();
      };

      try {
        if (!useAuthStore.getState().accessToken && refreshToken) {
          const user = await refreshSession();
          if (!cancelled) {
            setAuthSession(user, useAuthStore.getState().accessToken, useAuthStore.getState().refreshToken);
          }
        } else {
          const user = await loadMe();
          if (!cancelled) {
            const access = useAuthStore.getState().accessToken;
            const refresh = useAuthStore.getState().refreshToken;
            if (access) setAuthSession(user, access, refresh);
          }
        }
      } catch {
        try {
          if (refreshToken) {
            const user = await refreshSession();
            if (!cancelled) {
              setAuthSession(
                user,
                useAuthStore.getState().accessToken,
                useAuthStore.getState().refreshToken,
              );
            }
          } else {
            logoutClient();
          }
        } catch {
          logoutClient();
          if (!isPublicPath(pathname)) {
            showError('Your session expired. Please sign in again.');
          }
        }
      } finally {
        if (!cancelled) setSessionReady(true);
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

    if (!authed && !publicPath) navigate('/login', { replace: true });
    if (authed && ['/login', '/register', '/forgot-password'].includes(pathname)) {
      navigate('/dashboard', { replace: true });
    }
  }, [pathname, navigate, sessionReady]);

  if (!sessionReady && !isPublicPath(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-ink text-slate-200">
        <div className="glass-card flex items-center gap-3 px-5 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-brand-purple" />
          <span className="text-sm font-medium">Restoring your session…</span>
        </div>
      </div>
    );
  }

  return children;
}
