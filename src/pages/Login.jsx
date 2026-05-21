import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';

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

        <div className="mt-6 flex items-center justify-between text-sm text-emerald-100/60">
          <Link to="/forgot-password" className="hover:text-emerald-50">
            Forgot password?
          </Link>
          <Link to="/register" className="hover:text-emerald-50">
            Create account
          </Link>
        </div>
      </Card>
    </div>
  );
}
