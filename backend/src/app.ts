import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { env } from './configs/env';
import { errorHandler } from './middlewares/error.middleware';
import { attachHttpLogger } from './middlewares/logger.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { globalApiLimiter } from './middlewares/rate-limit.middleware';
import { sanitizeRequest } from './middlewares/sanitize.middleware';
import healthRoutes from './routes/health.routes';
import apiRoutes from './routes/index';
import { ForbiddenError } from './utils/AppError';

function normalizeOrigin(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');

  try {
    const url = new URL(trimmed);
    const protocol = url.protocol.toLowerCase();
    let hostname = url.hostname.toLowerCase();

    // Treat loopback aliases as equivalent to reduce local CORS mismatches.
    if (hostname === '127.0.0.1' || hostname === '::1') {
      hostname = 'localhost';
    }

    const port = url.port;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  } catch {
    // If it's not a valid URL (e.g. wildcard patterns), fall back to trimmed string.
    return trimmed;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildOriginAllowlistChecker(clientUrls: string[]): (origin: string) => boolean {
  const normalized = clientUrls.map(normalizeOrigin).filter(Boolean);

  const exact = new Set(normalized.filter((value) => !value.includes('*')));
  const wildcards = normalized
    .filter((value) => value.includes('*'))
    .map((pattern) => {
      // Convert simple wildcard patterns into a safe anchored regex.
      const parts = pattern.split('*').map(escapeRegExp);
      return new RegExp(`^${parts.join('.*')}$`, 'i');
    });

  return (origin: string) => {
    const normalizedOrigin = normalizeOrigin(origin);

    if (exact.has(normalizedOrigin)) return true;
    return wildcards.some((re) => re.test(normalizedOrigin));
  };
}

function resolveCorsOrigin(): cors.CorsOptions['origin'] {
  if (env.NODE_ENV !== 'production') {
    return true;
  }

  // Merge configured origins with standard localhost and deployment domains
  const allowedOrigins = [
    ...env.CLIENT_URLS,
    'http://localhost:*',
    'http://127.0.0.1:*',
    'https://price-drop-one.vercel.app',
    'https://*.vercel.app',
  ];

  const isOriginAllowed = buildOriginAllowlistChecker(allowedOrigins);

  return (origin, callback) => {
    if (!origin || isOriginAllowed(origin)) {
      callback(null, true);
      return;
    }

    callback(new ForbiddenError('CORS origin not allowed'));
  };
}

export function createApp(): Express {
  const app = express();

  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  app.use(
    cors({
      origin: resolveCorsOrigin(),
      credentials: true,
    }),
  );

  attachHttpLogger(app, env.NODE_ENV);

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(cookieParser());
  app.use(sanitizeRequest);

  app.use('/health', healthRoutes);
  app.use('/api', globalApiLimiter);
  app.use('/api', apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
