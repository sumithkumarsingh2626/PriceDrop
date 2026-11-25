import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s()-]/g, ''))
  .pipe(z.string().regex(/^\+?[1-9]\d{7,14}$/, 'Use international format, e.g. +919876543210'));

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(120),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: phoneSchema,
  notificationsSubscribed: z.boolean().default(true),
  profileImage: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
});

export const verifyOtpSchema = z.object({
  email: z.string().email().toLowerCase(),
  otp: z.string().length(6),
  type: z.enum(['REGISTER', 'LOGIN']),
});

export const refreshBodySchema = z
  .object({
    refreshToken: z.string().min(10).optional(),
  })
  .strict();
