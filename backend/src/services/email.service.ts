import nodemailer from 'nodemailer';
import { env } from '../configs/env';
import { logger } from '../utils/logger';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    if (env.NODE_ENV !== 'test') {
      this.transporter
        .verify()
        .then(() => logger.info('SMTP connection established successfully.'))
        .catch((error) => logger.error('SMTP connection failed:', error));
    }
  }

  public async sendOtpEmail(to: string, otp: string, type: 'REGISTER' | 'LOGIN'): Promise<void> {
    const subject = type === 'REGISTER' ? 'Verify Your Price Drop Account' : 'Login to Price Drop';
    const message = type === 'REGISTER' 
      ? `Welcome to Price Drop! Your verification code is: ${otp}`
      : `Your Price Drop login code is: ${otp}`;

    const mailOptions = {
      from: env.EMAIL_FROM,
      to,
      subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${subject}</h2>
          <p>${type === 'REGISTER' ? 'Welcome to Price Drop!' : 'Welcome back!'}</p>
          <p>Your one-time password (OTP) is:</p>
          <h1 style="font-size: 32px; letter-spacing: 4px; color: #10b981; background: #ecfdf5; padding: 16px; text-align: center; border-radius: 8px;">${otp}</h1>
          <p>This code will expire in ${env.OTP_EXPIRY_MINUTES} minutes.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    try {
      if (!env.EMAIL_USER) {
        logger.warn(`Email not configured. Simulated OTP for ${to}: ${otp}`);
        return;
      }
      
      await this.transporter.sendMail(mailOptions);
      logger.info(`OTP email sent to ${to}`);
    } catch (error) {
      logger.error(`Failed to send OTP email to ${to}:`, error);
      throw new Error('Failed to send email. Please try again later.');
    }
  }
}

export const emailService = new EmailService();
