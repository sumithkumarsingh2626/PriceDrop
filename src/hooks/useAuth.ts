import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api.js';
import { getEnvelopeData } from '@/lib/api-envelope';
import { mapApiUser } from '@/lib/map-user';
import { useToast } from '@/context/ToastProvider';
import { useAuthStore } from '@/store/authStore';

interface AuthBundle {
  accessToken: string;
  refreshToken: string;
  user: Record<string, unknown>;
}

interface OtpResponse {
  otpRequired: boolean;
  email: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const logoutClient = useAuthStore((state) => state.logoutClient);
  const setAuthSession = useAuthStore((state) => state.setAuthSession);
  const setTokens = useAuthStore((state) => state.setTokens);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await api.post('/auth/login', payload);
      return getEnvelopeData<OtpResponse>(response, 'Login failed');
    },
    onSuccess: () => {
      success('OTP sent to your email.');
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: {
      fullName: string;
      email: string;
      phoneNumber: string;
      password: string;
      notificationsSubscribed: boolean;
    }) => {
      const response = await api.post('/auth/register', payload);
      return getEnvelopeData<OtpResponse>(response, 'Registration failed');
    },
    onSuccess: () => {
      success('Account created. Check your email for OTP.');
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string; type: 'REGISTER' | 'LOGIN' }) => {
      const response = await api.post('/auth/verify-otp', payload);
      return getEnvelopeData<AuthBundle>(response, 'OTP verification failed');
    },
    onSuccess: (bundle) => {
      const mapped = mapApiUser(bundle.user);
      if (!mapped) {
        error('Invalid account payload received from the server.');
        return;
      }

      setAuthSession(mapped, bundle.accessToken, bundle.refreshToken);
      success(`Welcome, ${mapped.fullName || mapped.email}.`);
      navigate('/dashboard');
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      /* intentional: clear client session regardless */
    } finally {
      logoutClient();
      setTokens(null, null);
    }

    navigate('/login');
  };

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    verifyOtp: verifyOtpMutation.mutateAsync,
    isVerifying: verifyOtpMutation.isPending,
    logout,
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
  };
}
