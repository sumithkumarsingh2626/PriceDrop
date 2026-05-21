import { Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { KeyRound, Lock, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

function VerifyOtpInner() {
  const [searchParams] = useSearchParams();
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

  const subtitle = useMemo(() => {
    if (mode === 'reset') {
      return 'Enter the reset OTP and choose a new password.';
    }
    return email
      ? `Enter the OTP sent to ${email}. You will be signed in after verification.`
      : 'Enter the registration OTP from your email to activate your account.';
  }, [mode, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    if (!email) {
      setError('Email is missing. Open the link from registration again.');
      return;
    }

    if (mode === 'reset') {
      if (!newPassword || newPassword !== confirmPassword) {
        setError('Please enter matching passwords (8+ characters).');
        return;
      }

      setError('');
      try {
        await resetPassword({ email, otp, newPassword });
      } catch (submissionError) {
        setError(submissionError instanceof Error ? submissionError.message : 'Reset failed.');
      }
      return;
    }

    setError('');
    try {
      await verifyOtp({ email, otp });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Verification failed.');
    }
  };

  return (
    <PublicLayout title={title} subtitle={subtitle}>
      <Card className="w-full border-white/10 p-8">
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
            {mode === 'reset' ? 'Update password' : 'Verify and sign in'}
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

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/login" className="text-brand-purple hover:text-brand-cyan">
            Back to login
          </Link>
        </p>
      </Card>
    </PublicLayout>
  );
}

export default function VerifyOtp() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-ink">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-violet border-t-transparent" />
        </div>
      }
    >
      <VerifyOtpInner />
    </Suspense>
  );
}
