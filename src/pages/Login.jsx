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
    if (!email) nextErrors.email = 'Email is required.';
    if (!password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await login({ email, password });
  };

  return (
    <PublicLayout
      title="Welcome back"
      subtitle="Sign in to continue monitoring your tracked products."
    >
      <Card className="w-full border-white/10 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email}
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

        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <Link to="/forgot-password" className="hover:text-brand-cyan">
            Forgot password?
          </Link>
          <Link to="/register" className="hover:text-brand-purple">
            Create account
          </Link>
        </div>
      </Card>
    </PublicLayout>
  );
}
