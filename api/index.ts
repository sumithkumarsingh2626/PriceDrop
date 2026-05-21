/**
 * Vercel serverless entry — wraps the Express API (no app.listen).
 * Workers, cron, Puppeteer, and Redis queues are not started here.
 */

import 'dotenv/config';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import createApp from '../backend/src/app';
import { connectDB, isMongoConnected } from '../backend/src/configs/db';

const app = createApp();

app.use(async (_req, _res, next) => {
  try {
    if (!isMongoConnected()) {
      await connectDB();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const handler = serverless(app, {
  binary: ['image/*', 'application/octet-stream'],
});

export default async function vercelHandler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<unknown> {
  return handler(req, res);
}
