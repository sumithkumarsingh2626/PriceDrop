import { Bell, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/60">Settings</p>
        <h1 className="mt-2 text-4xl font-semibold">Profile and notification defaults</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-3 text-emerald-300">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">User profile</p>
              <h2 className="mt-1 text-2xl font-semibold">{user?.fullName}</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4">
              <p className="text-sm text-emerald-100/60">Email</p>
              <p className="mt-2 text-lg font-medium text-emerald-50">{user?.email}</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/20 p-4">
              <p className="text-sm text-emerald-100/60">Phone</p>
              <p className="mt-2 text-lg font-medium text-emerald-50">
                {user?.phoneNumber ?? 'Not added yet'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/30 p-3 text-emerald-300">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Default notification profile</p>
              <h2 className="mt-1 text-2xl font-semibold">Stored in MongoDB</h2>
            </div>
          </div>

          <div className="space-y-3">
            {(
              [
                ['Email', user?.notificationPreferences.email],
                ['WhatsApp', user?.notificationPreferences.whatsapp],
                ['SMS', user?.notificationPreferences.sms],
                ['Push', user?.notificationPreferences.push],
              ]
            ).map(([label, enabled]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-emerald-950/20 px-4 py-3 text-sm"
              >
                <span>{label}</span>
                <span className={enabled ? 'text-emerald-300' : 'text-emerald-100/40'}>
                  {enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm leading-6 text-emerald-100/60">
            Product pages let you override these defaults per tracked item, including separate any-drop and target-price triggers.
          </p>
        </Card>
      </div>
    </div>
  );
}
