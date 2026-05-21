import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[1-9]\d{7,14}$/, 'Phone number must be in international format')
  .optional()
  .or(z.literal('').transform(() => undefined));

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(120),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: phoneSchema,
  profileImage: z.string().url().optional(),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
});

export const otpVerifySchema = z.object({
  email: z.string().email().toLowerCase(),
  otp: z.string().regex(/^\d{4,8}$/, 'OTP must be 4-8 digits'),
});

export const resendOtpSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const passwordResetSchema = z.object({
  email: z.string().email().toLowerCase(),
  otp: z.string().regex(/^\d{4,8}$/, 'OTP must be 4-8 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const refreshBodySchema = z
  .object({
    refreshToken: z.string().min(10).optional(),
  })
  .strict();
