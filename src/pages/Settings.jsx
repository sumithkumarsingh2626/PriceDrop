import { Bell, Mail, Phone, ShieldCheck, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <span className="glass-pill border-brand-violet/30 text-brand-purple">
          User Preferences
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Account & <span className="text-gradient">Notifications</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Profile details, authentication status, and default alert channels.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* User Profile Card */}
        <Card hoverGlow isometric className="space-y-6 p-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-violet/30 bg-brand-violet/15 text-brand-purple shadow-glow">
              <UserCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                Identity Profile
              </span>
              <h2 className="mt-0.5 text-xl font-bold text-white">{user?.fullName || 'Active User'}</h2>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <Mail className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Email Address</span>
              </div>
              <p className="mt-1.5 text-base font-bold text-white">
                {user?.email ?? 'Not available'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <Phone className="h-3.5 w-3.5 text-brand-purple" />
                <span>Phone Number (SMS & WhatsApp)</span>
              </div>
              <p className="mt-1.5 text-base font-bold text-white">
                {user?.phoneNumber ?? 'Not added yet'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Account Role & Tier</span>
              </div>
              <p className="mt-1.5 text-base font-bold text-emerald-400 capitalize">
                {user?.role ?? 'Standard'} Member
              </p>
            </div>
          </div>
        </Card>

        {/* Default Notifications Card */}
        <Card hoverGlow isometric className="space-y-6 p-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-cyan/30 bg-brand-cyan/15 text-brand-cyan shadow-glow-cyan">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-purple">
                Dispatch Gateways
              </span>
              <h2 className="mt-0.5 text-xl font-bold text-white">Default Notification Channels</h2>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              ['WhatsApp Engine', user?.notificationPreferences?.whatsapp ?? true, 'Instant messaging alerts'],
              ['SMS Gateway', user?.notificationPreferences?.sms ?? true, 'Direct text notification'],
              ['In-App Push', user?.notificationPreferences?.push ?? true, 'Real-time dashboard badges'],
            ].map(([label, enabled, subtitle]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm backdrop-blur-md"
              >
                <div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${
                    enabled
                      ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                      : 'border-slate-700 bg-slate-800 text-slate-400'
                  }`}
                >
                  {enabled ? 'Active' : 'Muted'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs leading-relaxed text-slate-400 border-t border-white/[0.06] pt-4">
            Individual product alerts can be muted or configured independently from the product details panel.
          </p>
        </Card>
      </div>
    </div>
  );
}