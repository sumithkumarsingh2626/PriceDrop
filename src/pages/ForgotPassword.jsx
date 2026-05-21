import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

export default function ForgotPassword() {
  const { forgotPassword, isRequestingReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError('Email is required.');
      return;
    }

    setError('');

    try {
      await forgotPassword(email);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Request failed.');
    }
  };

  return (
    <PublicLayout
      title="Forgot your password?"
      subtitle="We will email a reset OTP to the address associated with your account."
    >
      <Card className="w-full border-white/10 p-8">
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

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/login" className="text-brand-purple hover:text-brand-cyan">
            Back to login
          </Link>
        </p>
      </Card>
    </PublicLayout>
  );
}
