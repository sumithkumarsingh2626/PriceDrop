import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { env } from '../configs/env';
import { HttpStatus } from '../constants';
import { User, type IUser } from '../models/user.model';
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '../services/token.service';
import { asyncHandler } from '../utils/async-handler.util';
import { sendSuccess } from '../utils/api-response.util';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/AppError';

function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  const secure = env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function clearAuthCookies(res: Response): void {
  const secure = env.NODE_ENV === 'production';

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure,
    sameSite: 'strict',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure,
    sameSite: 'strict',
  });
}

import { Otp } from '../models/otp.model';
import { emailService } from '../services/email.service';

function sanitizeUser(user: IUser): Record<string, unknown> {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImage: user.profileImage,
    isVerified: user.isVerified,
    notificationPreferences: user.notificationPreferences,
    notificationsSubscribed: user.notificationsSubscribed,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function issueSession(user: IUser, res: Response): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);

  user.activeRefreshTokenHash = hashToken(refreshToken);
  await user.save();
  setAuthCookies(res, accessToken, refreshToken);

  return { accessToken, refreshToken };
}

async function sendOtp(email: string, type: 'REGISTER' | 'LOGIN'): Promise<void> {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  const otpHash = await bcrypt.hash(otpCode, 10);
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60000);

  // Remove existing OTP for this email and type
  await Otp.deleteMany({ email, type });

  await Otp.create({
    email,
    otpHash,
    type,
    expiresAt,
  });

  await emailService.sendOtpEmail(email, otpCode, type);
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password, profileImage, notificationsSubscribed } = req.body as {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    profileImage?: string;
    notificationsSubscribed?: boolean;
  };

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new ConflictError('An account with this email already exists.');
  }

  const existingPhone = await User.findOne({ phoneNumber });
  if (existingPhone) {
    throw new ConflictError('An account with this phone number already exists.');
  }

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_COST_PASSWORD);
  await User.create({
    fullName,
    email,
    phoneNumber,
    passwordHash,
    profileImage,
    notificationsSubscribed: notificationsSubscribed ?? true,
    isVerified: false, // Remains false until OTP is verified
  });

  await sendOtp(email, 'REGISTER');

  sendSuccess(
    res,
    { otpRequired: true, email },
    'Registration successful. Please verify your OTP.',
    HttpStatus.CREATED,
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await User.findOne({ email }).select('+activeRefreshTokenHash');
  if (!user) throw new UnauthorizedError('Invalid email or password.');

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) throw new UnauthorizedError('Invalid email or password.');

  await sendOtp(email, 'LOGIN');

  sendSuccess(res, { otpRequired: true, email }, 'OTP sent to email. Please verify to login.');
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, type } = req.body as { email: string; otp: string; type: 'REGISTER' | 'LOGIN' };

  const otpRecord = await Otp.findOne({ email, type });
  if (!otpRecord) throw new UnauthorizedError('OTP not found or expired.');

  const isValid = await bcrypt.compare(otp, otpRecord.otpHash);
  if (!isValid) throw new UnauthorizedError('Invalid OTP.');

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError('User not found.');

  if (type === 'REGISTER' && !user.isVerified) {
    user.isVerified = true;
    await user.save();
  }

  // Delete the OTP record as it has been successfully used
  await Otp.deleteOne({ _id: otpRecord._id });

  const session = await issueSession(user, res);

  sendSuccess(res, {
    ...session,
    user: sanitizeUser(user),
  }, 'Verification successful.');
});

export const refreshTokens = asyncHandler(async (req: Request, res: Response) => {
  const token =
    (req.cookies?.refreshToken as string | undefined) ??
    ((req.body as { refreshToken?: string }).refreshToken ?? undefined);

  if (!token) {
    throw new UnauthorizedError('Refresh token missing.');
  }

  const payload = decodeToken(token);

  if (!payload || payload.type !== 'refresh') {
    throw new UnauthorizedError('Invalid refresh token.');
  }

  const user = await User.findById(payload.id).select('+activeRefreshTokenHash');

  if (!user || !user.activeRefreshTokenHash) {
    throw new UnauthorizedError('Refresh session not found.');
  }

  if (user.activeRefreshTokenHash !== hashToken(token)) {
    throw new UnauthorizedError('Refresh token has been revoked.');
  }

  const session = await issueSession(user, res);

  sendSuccess(res, session, 'Tokens refreshed.');
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError();

  const user = await User.findById(req.user.id);
  if (!user) throw new NotFoundError('User not found');

  sendSuccess(res, { user: sanitizeUser(user) }, 'Authenticated user fetched.');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  if (req.user?.id) {
    await User.findByIdAndUpdate(req.user.id, {
      $unset: {
        activeRefreshTokenHash: 1,
      },
    });
  }

  clearAuthCookies(res);
  sendSuccess(res, undefined, 'Logged out successfully.');
});

export const adminPing = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, { ok: true }, 'Admin route reachable.');
});
