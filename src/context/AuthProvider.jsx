import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '@/services/api.js';
import { mapApiUser } from '@/lib/map-user';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/context/ToastProvider';

const PUBLIC_PREFIXES = ['/login', '/register', '/forgot-password', '/verify-otp'];

function isPublicPath(pathname) {
  if (pathname === '/') return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

async function refreshAccessToken(refreshToken) {
  const res = await api.post('/auth/refresh-token', { refreshToken });
  const access = res.data?.data?.accessToken ?? null;
  const nextRefresh = res.data?.data?.refreshToken ?? refreshToken;
  if (!access) throw new Error('Refresh failed');
  return { access, refresh: nextRefresh };
}

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { error: showError } = useToast();
  const hydrateFromStorage = useAuthStore((s) => s.hydrateFromStorage);
  const completeBootstrap = useAuthStore((s) => s.completeBootstrap);
  const logoutClient = useAuthStore((s) => s.logoutClient);
  const setAuthSession = useAuthStore((s) => s.setAuthSession);
  const setTokens = useAuthStore((s) => s.setTokens);
  const isBootstrapped = useAuthStore((s) => s.isBootstrapped);

  useEffect(() => {
    hydrateFromStorage();
    let cancelled = false;

    const bootstrap = async () => {
      const state = useAuthStore.getState();
      const { refreshToken, accessToken } = state;

      if (!accessToken && !refreshToken) {
        logoutClient();
        if (!cancelled) completeBootstrap();
        return;
      }

      try {
        let access = accessToken;
        let refresh = refreshToken;

        if (!access && refresh) {
          const refreshed = await refreshAccessToken(refresh);
          access = refreshed.access;
          refresh = refreshed.refresh;
          setTokens(access, refresh);
        }

        const meRes = await api.get('/auth/me');
        const user = mapApiUser(meRes.data?.data?.user ?? null);
        if (!user) throw new Error('Invalid session');

        if (!cancelled && access) {
          setAuthSession(user, access, refresh);
        }
      } catch {
        logoutClient();
        if (!cancelled && !isPublicPath(window.location.pathname)) {
          showError('Session expired. Please sign in again.');
        }
      } finally {
        if (!cancelled) completeBootstrap();
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [hydrateFromStorage, completeBootstrap, logoutClient, setAuthSession, setTokens, showError]);

  useEffect(() => {
    if (!isBootstrapped) return;
    const { accessToken, user } = useAuthStore.getState();
    const authed = Boolean(accessToken && user);
    const pub = isPublicPath(pathname);

    if (!authed && !pub) navigate('/login', { replace: true });
    if (authed && ['/login', '/register', '/forgot-password'].includes(pathname)) {
      navigate('/dashboard', { replace: true });
    }
  }, [pathname, navigate, isBootstrapped]);

  if (!isBootstrapped && !isPublicPath(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-ink">
        <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return children;
}
