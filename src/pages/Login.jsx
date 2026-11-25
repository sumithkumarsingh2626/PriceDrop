import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

export default function Login() {
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!email) nextErrors.email = 'Email address is required.';
    if (!password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await login({ email: email.trim().toLowerCase(), password });
  };

  return (
    <PublicLayout
      title="Welcome back"
      subtitle="Sign in to continue monitoring your tracked products."
    >
      <Card hoverGlow isometric className="w-full p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            leftIcon={<Lock className="h-4 w-4" />}
            autoComplete="current-password"
            error={errors.password}
          />
          <Button type="submit" className="w-full" isLoading={isLoggingIn}>
            Sign in
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-end text-sm text-slate-400">
          <Link to="/register" className="hover:text-brand-purple">
            Create account
          </Link>
        </div>
      </Card>
    </PublicLayout>
  );
}
