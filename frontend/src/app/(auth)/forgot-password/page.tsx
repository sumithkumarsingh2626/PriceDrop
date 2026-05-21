'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const { forgotPassword, isRequestingReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      setError('Email is required.');
      return;
    }

    setError('');
    await forgotPassword(email);
  };

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center bg-[#04110d] px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-300 p-3 text-emerald-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-semibold">Forgot your password?</h1>
          <p className="mt-3 text-sm text-emerald-100/65">
            We will email a reset OTP to the address associated with your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="forgot-password-email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            error={error || undefined}
          />
          <Button type="submit" className="w-full" isLoading={isRequestingReset}>
            Send reset OTP
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-emerald-100/60">
          <Link href="/login" className="text-emerald-300 hover:text-emerald-200">
            Back to login
          </Link>
        </p>
      </Card>
    </div>
  );
}
