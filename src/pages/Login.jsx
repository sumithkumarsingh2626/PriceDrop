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
      title="Access Telemetry Console"
      subtitle="Authenticate with your registered account credentials to view monitored retail targets."
    >
      <Card hoverGlow isometric className="w-full p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            placeholder="you@domain.com"
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
          <Button type="submit" className="w-full mt-2" isLoading={isLoggingIn}>
            Authenticate & Open Console
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] pt-4">
          <span>Need an account?</span>
          <Link to="/register" className="text-[#00f5a0] font-semibold hover:underline">
            Create Free Account
          </Link>
        </div>
      </Card>
    </PublicLayout>
  );
}