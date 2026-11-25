'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Phone, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ phoneNumber?: string; password?: string }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!phoneNumber) nextErrors.phoneNumber = 'Phone number is required.';
    if (!password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await login({ phoneNumber, password });
  };

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center bg-[#04110d] px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-300 p-3 text-emerald-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-sm text-emerald-100/65">
            Sign in to continue monitoring your tracked products.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="phone-number"
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
            error={errors.phoneNumber}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password}
          />
          <Button type="submit" className="w-full" isLoading={isLoggingIn}>
            Sign in
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-end text-sm text-emerald-100/60">
          <Link href="/register" className="hover:text-emerald-50">
            Create account
          </Link>
        </div>
      </Card>
    </div>
  );
}
