import { Schema, model, type Document } from 'mongoose';

export type OtpType = 'REGISTER' | 'LOGIN';

export interface IOtp extends Document {
  email: string;
  otpHash: string;
  type: OtpType;
  expiresAt: Date;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['REGISTER', 'LOGIN'],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// TTL index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = model<IOtp>('Otp', otpSchema);
