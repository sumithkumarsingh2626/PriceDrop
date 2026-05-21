'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { KeyRound, Lock, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';

function VerifyOtpInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const mode = searchParams.get('mode') === 'reset' ? 'reset' : 'verify';
  const { verifyOtp, resendOtp, resetPassword, isVerifying, isResendingOtp, isResetting } = useAuth();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const title = useMemo(
    () => (mode === 'reset' ? 'Reset your password' : 'Verify your account'),
    [mode],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    if (mode === 'reset') {
      if (!newPassword || newPassword !== confirmPassword) {
        setError('Please enter matching passwords.');
        return;
      }

      setError('');
      await resetPassword({ email, otp, newPassword });
      return;
    }

    setError('');
    await verifyOtp({ email, otp });
  };

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center bg-[#04110d] px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-300 p-3 text-emerald-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-3 text-sm text-emerald-100/65">
            {mode === 'reset'
              ? 'Enter the reset OTP and choose a new password.'
              : 'Enter the registration OTP from your email to activate your account.'}
          </p>
          <p className="mt-2 text-sm text-emerald-300">{email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="otp"
            label="One-time password"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            leftIcon={<KeyRound className="h-4 w-4" />}
            error={error || undefined}
          />

          {mode === 'reset' ? (
            <>
              <Input
                id="new-password"
                label="New password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
              <Input
                id="confirm-new-password"
                label="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
              />
            </>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            isLoading={mode === 'reset' ? isResetting : isVerifying}
          >
            {mode === 'reset' ? 'Update password' : 'Verify OTP'}
          </Button>
        </form>

        {mode === 'verify' ? (
          <Button
            variant="ghost"
            className="mt-4 w-full"
            isLoading={isResendingOtp}
            leftIcon={<RefreshCw className="h-4 w-4" />}
            onClick={() => void resendOtp({ email })}
          >
            Resend OTP
          </Button>
        ) : null}

        <p className="mt-6 text-center text-sm text-emerald-100/60">
          <Link href="/login" className="text-emerald-300 hover:text-emerald-200">
            Back to login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#04110d]" />}>
      <VerifyOtpInner />
    </Suspense>
  );
}
