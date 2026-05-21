import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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
      return getEnvelopeData<AuthBundle>(response, 'Login failed');
    },
    onSuccess: (bundle) => {
      const mapped = mapApiUser(bundle.user);
      if (!mapped) {
        error('Invalid account payload received from the server.');
        return;
      }

      setAuthSession(mapped, bundle.accessToken, bundle.refreshToken);
      success(`Welcome back, ${mapped.fullName || mapped.email}.`);
      navigate('/dashboard');
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: {
      fullName: string;
      email: string;
      password: string;
      phoneNumber?: string;
    }) => {
      const response = await api.post('/auth/register', payload);
      return getEnvelopeData<{ email: string }>(response, 'Registration failed');
    },
    onSuccess: (bundle) => {
      success('Your account was created. Enter the OTP from your email to activate it.');
      navigate(`/verify-otp?email=${encodeURIComponent(bundle.email)}`);
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
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
      success('Email verified. Your dashboard is ready.');
      navigate('/dashboard');
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const response = await api.post('/auth/resend-otp', payload);
      return getEnvelopeData<{ email: string }>(response, 'Failed to resend OTP');
    },
    onSuccess: () => success('A fresh OTP is on its way to your inbox.'),
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post('/auth/forgot-password', { email });
      return getEnvelopeData<{ email?: string }>(response, 'Unable to request password reset');
    },
    onSuccess: (_bundle, email) => {
      success('If that email exists, a reset OTP has been sent.');
      navigate(`/verify-otp?email=${encodeURIComponent(email)}&mode=reset`);
    },
    onError: (mutationError: Error) => error(mutationError.message),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: {
      email: string;
      otp: string;
      newPassword: string;
    }) => {
      await api.post('/auth/reset-password', payload);
    },
    onSuccess: () => {
      success('Password updated. You can sign in now.');
      navigate('/login');
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
    resendOtp: resendOtpMutation.mutateAsync,
    isResendingOtp: resendOtpMutation.isPending,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    isRequestingReset: forgotPasswordMutation.isPending,
    resetPassword: resetPasswordMutation.mutateAsync,
    isResetting: resetPasswordMutation.isPending,
    logout,
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
  };
}
