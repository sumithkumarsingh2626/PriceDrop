import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Phone, Sparkles, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Register() {
  const { register, isRegistering } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !password) {
      setError('Full name, email, and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    await register({
      fullName,
      email,
      password,
      phoneNumber: phoneNumber || undefined,
    });
  };

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center bg-[#04110d] px-4 py-10">
      <Card className="w-full max-w-lg p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-2xl bg-emerald-300 p-3 text-emerald-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-semibold">Create your tracker account</h1>
          <p className="mt-3 text-sm text-emerald-100/65">
            We will send a one-time password to verify the account before first login.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              id="full-name"
              label="Full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              leftIcon={<User className="h-4 w-4" />}
            />
            <Input
              id="phone-number"
              label="Phone number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              leftIcon={<Phone className="h-4 w-4" />}
              placeholder="+15551234567"
            />
          </div>
          <Input
            id="register-email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              id="register-password"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
            />
            <Input
              id="confirm-password"
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
            />
          </div>
          {error ? <p className="text-sm text-rose-200">{error}</p> : null}
          <Button type="submit" className="w-full" isLoading={isRegistering}>
            Register and send OTP
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-emerald-100/60">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
