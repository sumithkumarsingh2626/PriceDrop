import { Bell, Mail, Phone, ShieldCheck, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <span className="glass-pill border-[#00f5a0]/30 text-[#00f5a0] font-mono text-[10px]">
          SYSTEM CONFIGURATION
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Account & <span className="text-gradient">Gateways</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          User profile metadata, security status, and global notification dispatch settings.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* User Profile Card */}
        <Card hoverGlow isometric className="space-y-5 p-6">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#00f5a0]">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Identity Profile
              </span>
              <h2 className="text-base font-bold text-white">{user?.fullName || 'Active User'}</h2>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                <Mail className="h-3.5 w-3.5 text-[#38bdf8]" />
                <span>Primary Email Address</span>
              </div>
              <p className="mt-1 font-mono text-sm font-bold text-white">
                {user?.email ?? 'Not available'}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                <Phone className="h-3.5 w-3.5 text-[#00f5a0]" />
                <span>SMS & WhatsApp Dispatch Target</span>
              </div>
              <p className="mt-1 font-mono text-sm font-bold text-white">
                {user?.phoneNumber ?? 'Not configured'}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00f5a0]" />
                <span>Security Access Level</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#00f5a0] uppercase tracking-wider">
                {user?.role ?? 'Standard'} Role · JWT Verified
              </p>
            </div>
          </div>
        </Card>

        {/* Default Notifications Card */}
        <Card hoverGlow isometric className="space-y-5 p-6">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#38bdf8]">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Default Gateways
              </span>
              <h2 className="text-base font-bold text-white">Alert Dispatch Channels</h2>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              ['WhatsApp Dispatch Gateway', user?.notificationPreferences?.whatsapp ?? true, 'Direct messaging payload delivery'],
              ['Twilio SMS Gateway', user?.notificationPreferences?.sms ?? true, 'Global telecommunication text delivery'],
              ['In-App Push Channel', user?.notificationPreferences?.push ?? true, 'Real-time telemetry banner'],
            ].map(([label, enabled, subtitle]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs"
              >
                <div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="font-mono text-[10px] text-slate-500 mt-0.5">{subtitle}</p>
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                    enabled
                      ? 'border-[#00f5a0]/30 bg-[#00f5a0]/10 text-[#00f5a0]'
                      : 'border-slate-800 bg-slate-900 text-slate-500'
                  }`}
                >
                  {enabled ? 'Active' : 'Muted'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 border-t border-white/[0.06] pt-3">
            Individual items can override these defaults directly from their product page.
          </p>
        </Card>
      </div>
    </div>
  );
}