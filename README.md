# Price Drop Alert

> **B.Tech Final Year Project** — Smart price tracking with SMS/WhatsApp alerts for Amazon, Flipkart, BestBuy, and Zara.

**Live:** https://price-drop-one.vercel.app  
**Backend:** https://price-drop-alert-backend-kda5.onrender.com

---

## Stack (3 lines)

- **Frontend:** React 18 + Vite + Tailwind CSS + TanStack Query + Zustand + Framer Motion + Recharts
- **Backend:** Express 4 on Render (Node 22), MongoDB via Mongoose, JWT auth (OTP via email → httpOnly cookies), node-cron daily price sweeps, Twilio SMS/WhatsApp alerts, PricesAPI + Cheerio + Puppeteer scraping
- **Deploy:** Vite SPA on Vercel (proxies `/api` → Render), backend as a long-running Docker service on Render

---

## Quick start

```bash
# 1. Copy and fill in environment files
cp .env.example .env
cp backend/.env.example backend/.env

# 2. Install dependencies (root installs both frontend + backend)
npm install

# 3. Start both servers concurrently
npm run dev
```

| URL | Service |
|-----|---------|
| http://localhost:3000 | Vite dev server (React app) |
| http://localhost:5000/api | Express API |
| http://localhost:5000/health | Health check |

---

## Environment Variables

Both `.env` files are excluded from git (see `.gitignore`). Never commit real credentials.

### Root `.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB Atlas or local connection string |
| `JWT_SECRET` | ✅ | 32+ char random string — generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `JWT_REFRESH_SECRET` | ✅ | Separate 32+ char random string |
| `CLIENT_URL` | ✅ | Allowed browser origin (e.g. `http://localhost:3000`) |
| `PRICES_API_KEY` | ⚠️ | PricesAPI key (scraping fallback; leave blank to use direct HTML scraping) |
| `TWILIO_ACCOUNT_SID` | ⚠️ | Required for SMS/WhatsApp alerts |
| `TWILIO_AUTH_TOKEN` | ⚠️ | Twilio auth token |
| `TWILIO_SMS_FROM` | ⚠️ | Twilio SMS sender number |
| `TWILIO_WHATSAPP_FROM` | ⚠️ | Twilio WhatsApp sender number |
| `EMAIL_USER` | ⚠️ | SMTP email used to send OTPs |
| `EMAIL_PASS` | ⚠️ | SMTP password / app password |
| `PRICE_TRACKING_CRON` | ➕ | Cron expression for daily sweep (default: `0 0 * * *` — midnight UTC) |

> See `.env.example` for the complete list.

---

## Auth flow

1. **Register** — provide full name, email, phone number, and password → OTP sent to email
2. **Verify OTP** — submit the 6-digit OTP to get JWT access + refresh tokens (httpOnly cookies)
3. **Login** — email + password → new OTP → verify → session issued

---

## Supported stores

| Store | Scraping method |
|-------|----------------|
| Amazon | PricesAPI → Cheerio → Puppeteer fallback |
| Flipkart | PricesAPI → Cheerio → Puppeteer fallback |
| BestBuy | PricesAPI → Cheerio → Puppeteer fallback |
| Zara | PricesAPI → Cheerio → Puppeteer fallback |

> Other URLs will fail with a "store not supported" error.

---

## Alert schedule

Prices are refreshed **once per day** (default: midnight UTC, configurable via `PRICE_TRACKING_CRON`). After the sweep, SMS/WhatsApp notifications are sent for any product that hit its target price or dropped since the last check.

> **Render free-tier note:** Render's free plan puts services to sleep after 15 minutes of inactivity, which prevents the cron from running. Use a keep-alive service (e.g. [UptimeRobot](https://uptimerobot.com)) pinging `/health` every 10 minutes, or upgrade to the Starter plan.

---

## Deploy

### Frontend → Vercel

1. Import this repo in Vercel.
2. Build command: `npm run build`, Output: `dist`.
3. `vercel.json` automatically proxies `/api/*` and `/health` to the Render backend.

### Backend → Render

1. Set the **Root Directory** to `backend/`.
2. Build: `npm install && npm run build`, Start: `npm start`.
3. Add all variables from `backend/.env.example` as Render environment variables.

---

## Project layout

```
backend/src/   Express API — controllers, services, models, jobs
src/           React SPA — pages, components, hooks, stores
public/        Static assets (favicon, og-image)
api/           Legacy Vercel serverless entry (unused)
frontend/      Deprecated Next.js app (do NOT run)
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite + local Express API (concurrent) |
| `npm run dev:web` | Frontend only |
| `npm run dev:api` | API only on :5000 |
| `npm run build` | Production frontend bundle |

> ⚠️ **Never run `cd frontend && npm run dev`** — that folder is the deprecated Next.js app.

---

## Known limitations

- Price tracking runs **once per day**, not in real-time.
- Only 4 stores are supported (Amazon, Flipkart, BestBuy, Zara).
- Render free tier sleeps after inactivity — use an external keep-alive.
- Puppeteer scraping (fallback) may fail in Render's restricted sandbox environment.
