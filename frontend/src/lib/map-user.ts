import type { NotificationPreferences, User } from '@/types';

function mapPreferences(raw: unknown): NotificationPreferences {
  const value = raw as Partial<NotificationPreferences> | undefined;

  return {
    email: Boolean(value?.email),
    whatsapp: Boolean(value?.whatsapp),
    sms: Boolean(value?.sms),
    push: Boolean(value?.push),
  };
}

export function mapApiUser(raw: Record<string, unknown> | undefined | null): User | null {
  if (!raw) return null;

  return {
    id: String(raw.id ?? raw._id ?? ''),
    fullName: typeof raw.fullName === 'string' ? raw.fullName : '',
    email: typeof raw.email === 'string' ? raw.email : '',
    phoneNumber: typeof raw.phoneNumber === 'string' ? raw.phoneNumber : undefined,
    profileImage: typeof raw.profileImage === 'string' ? raw.profileImage : undefined,
    isVerified: Boolean(raw.isVerified),
    notificationPreferences: mapPreferences(raw.notificationPreferences),
    role: raw.role === 'admin' ? 'admin' : 'user',
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : undefined,
  };
}
