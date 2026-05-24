# Price Drop Alert Tool

Deployment: **React + Vite** frontend on Vercel, **Express API** on Render.

## Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Bootstrap Icons, Framer Motion, Recharts, React Router, Zustand, TanStack Query, Axios
- **API:** Express (Render/Docker), MongoDB, JWT auth, Nodemailer OTP
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

## Deploy frontend to Vercel (backend on Render)

1. Deploy the backend on Render (example: `https://price-drop-alert-backend-kda5.onrender.com`).
2. Import this repository in Vercel.
3. Build command: `npm run build`  
4. Output directory: `dist`
5. `vercel.json` proxies `/api/*` and `/health` to the Render backend, and rewrites SPA routes to `index.html`.

**Note:** Background jobs (BullMQ/workers/cron/Puppeteer scraping) run only when you deploy the backend as a long-running service (Render).

## Project layout

```txt
api/           Legacy Vercel serverless entry (not used when backend is on Render)
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

**Do not run `cd frontend && npm run dev`** — that folder is the deprecated Next.js app and will show a Next.js error screen. Always use **`npm run dev` from the project root**.

Legacy `frontend/` (Next.js) and standalone `backend/server.ts` remain for reference only; the active app is the **root** Vite + `api/` setup.
