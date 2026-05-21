# Price Drop Alert Tool

Single-app deployment: **React + Vite** frontend and **Express API** as Vercel serverless functions.

## Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Bootstrap Icons, Framer Motion, Recharts, React Router, Zustand, TanStack Query, Axios
- **API:** Express (serverless on Vercel), MongoDB, JWT auth, Nodemailer OTP
- **Local dev:** Vite on `:3000` proxies `/api` → Express on `:5000`

## Quick start

1. Copy environment file:

```bash
cp .env.example .env
```

2. Set `MONGODB_URI`, `JWT_SECRET` (32+ chars for production), and SMTP vars for email OTP.

3. Install and run:

```bash
npm install
npm run dev
```

- Web: http://localhost:3000  
- API: http://localhost:5000/api  

## Auth flow (unchanged)

1. **Register** → OTP emailed via SMTP  
2. **Verify OTP** → JWT session issued (access + refresh, cookies)  
3. **Login** → requires verified email  

## Deploy to Vercel (single project)

1. Import this repository in Vercel.
2. Set environment variables from `.env.example` (especially `MONGODB_URI`, `JWT_SECRET`, `EMAIL_*`, `CLIENT_URL` = your production URL).
3. Build command: `npm run build`  
4. Output directory: `dist`  
5. `vercel.json` rewrites SPA routes to `index.html` and `/api/*` to the serverless handler.

**Note:** BullMQ workers, Puppeteer scraping, and node-cron schedulers are **not** started in serverless mode. Product tracking APIs still work; background jobs should be moved to Vercel Cron or an external worker later.

## Project layout

```txt
api/           Vercel serverless entry (wraps backend Express app)
backend/src/   API controllers, models, auth, MongoDB
src/           React application
scripts/       Local dev API server
public/        Static assets
```

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Vite + local API (concurrent)        |
| `npm run build`| Production frontend build            |
| `npm run dev:web` | Frontend only                     |
| `npm run dev:api` | API only on port 5000             |

Legacy `frontend/` (Next.js) and standalone `backend/server.ts` remain for reference; the active app is the **root** Vite + `api/` setup.
