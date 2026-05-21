import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

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

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    try {
      await register({
        fullName,
        email,
        password,
        phoneNumber: phoneNumber.trim() || undefined,
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Registration failed.');
    }
  };

  return (
    <PublicLayout
      title="Create your tracker account"
      subtitle="We send a one-time password to your email. After verification you are signed in automatically."
    >
      <Card className="w-full border-white/10 p-8">
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
              label="Phone (optional)"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              leftIcon={<Phone className="h-4 w-4" />}
              placeholder="+919876543210"
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
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <Button type="submit" className="w-full" isLoading={isRegistering}>
            Register and send OTP
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-purple hover:text-brand-cyan">
            Sign in
          </Link>
        </p>
      </Card>
    </PublicLayout>
  );
}
