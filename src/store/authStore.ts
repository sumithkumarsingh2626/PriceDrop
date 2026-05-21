import { create } from 'zustand';
import type { User } from '@/types';
import { clearSessionFlag, setSessionFlag } from '@/utils/session-cookie';

const STORAGE_ACCESS = 'pda_access_token';
const STORAGE_REFRESH = 'pda_refresh_token';

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthState extends AuthTokens {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapped: boolean;
  hydrateFromStorage: () => void;
  setUser: (user: User | null) => void;
  /** Called after login / refresh succeed */
  setTokens: (access: string | null, refresh?: string | null) => void;
  setAuthSession: (user: User | null, access: string, refresh?: string | null) => void;
  /** Clears tokens + UX cookie (call API logout separately if needed). */
  logoutClient: () => void;
}

function readLs(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeTokens(access: string | null, refresh: string | null) {
  if (typeof window === 'undefined') return;
  try {
    if (access) localStorage.setItem(STORAGE_ACCESS, access);
    else localStorage.removeItem(STORAGE_ACCESS);
    if (refresh) localStorage.setItem(STORAGE_REFRESH, refresh);
    else localStorage.removeItem(STORAGE_REFRESH);
  } catch {
    /* ignore */
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isBootstrapped: false,

  hydrateFromStorage: () => {
    const access = readLs(STORAGE_ACCESS);
    const refresh = readLs(STORAGE_REFRESH);
    if (access) setSessionFlag();
    else clearSessionFlag();
    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: Boolean(access && get().user),
      isBootstrapped: true,
    });
  },

  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user && get().accessToken),
    }),

  setTokens: (access, refresh) => {
    const nextRefresh = refresh ?? get().refreshToken;
    writeTokens(access, nextRefresh ?? null);

    if (access) setSessionFlag();
    else clearSessionFlag();

    set({
      accessToken: access,
      refreshToken: nextRefresh ?? null,
      isAuthenticated: Boolean(access && get().user),
    });
  },

  setAuthSession: (user, access, refresh) => {
    const nextRefresh = refresh ?? readLs(STORAGE_REFRESH);
    writeTokens(access, nextRefresh ?? null);
    setSessionFlag();
    set({
      user,
      accessToken: access,
      refreshToken: nextRefresh ?? null,
      isAuthenticated: true,
    });
  },

  logoutClient: () => {
    writeTokens(null, null);
    clearSessionFlag();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },
}));
