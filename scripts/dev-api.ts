/**
 * Local development API server (port 5000).
 * Production on Vercel uses api/index.ts serverless handler instead.
 */

import dotenv from 'dotenv';

// Load repo `.env` first so DB/API keys are available locally.
dotenv.config();
// Dev server should behave like development even if the repo's `.env` is production-focused.
process.env.NODE_ENV = 'development';

const [{ createApp }, { connectDB }, { env }] = await Promise.all([
  import('../backend/src/app'),
  import('../backend/src/configs/db'),
  import('../backend/src/configs/env'),
]);

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
