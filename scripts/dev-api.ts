/**
 * Local development API server (port 5000).
 * Production on Vercel uses api/index.ts serverless handler instead.
 */

import 'dotenv/config';
import createApp from '../backend/src/app';
import { connectDB } from '../backend/src/configs/db';
import { env } from '../backend/src/configs/env';

const app = createApp();

async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`[dev-api] http://127.0.0.1:${env.PORT} (MongoDB connected)`);
  });
}

start().catch((error) => {
  console.error('[dev-api] Failed to start:', error);
  process.exit(1);
});
