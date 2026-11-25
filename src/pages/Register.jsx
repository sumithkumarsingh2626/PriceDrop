import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Phone, User, ArrowRight } from 'lucide-react';
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

    if (!fullName || !email || !phoneNumber || !password) {
      setError('Full name, email, phone number, and password are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
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
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        password,
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Registration failed.');
    }
  };

  return (
    <PublicLayout
      title="Deploy AI Tracker Account"
      subtitle="Establish your autonomous price monitoring profile to receive real-time SMS & WhatsApp alerts."
    >
      <Card hoverGlow isometric className="w-full p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Input
              id="full-name"
              label="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              leftIcon={<User className="h-4 w-4" />}
              placeholder="Alex Vance"
              autoComplete="name"
            />
            <Input
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="alex@domain.com"
              autoComplete="email"
            />
          </div>

          <Input
            id="phone-number"
            label="Phone Number"
            hint="SMS & WhatsApp format"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            leftIcon={<Phone className="h-4 w-4" />}
            placeholder="+919876543210"
            autoComplete="tel"
          />

          {/* Perfectly aligned Password & Confirm Password Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Input
              id="register-password"
              label="Password"
              hint="Min. 8 chars"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 px-3.5 py-2.5 font-mono text-xs text-rose-300">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full mt-2 gap-2" isLoading={isRegistering}>
            Deploy Account Profile <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] pt-4">
          <span>Already registered?</span>
          <Link to="/login" className="text-[#00D4FF] font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </Card>
    </PublicLayout>
  );
}