# Price Drop Alert Tool

Price Drop Alert Tool is a full-stack app for tracking product prices, saving daily price history, and sending alerts when prices drop or hit a target.

The stack in this repo is:

- `frontend/`: Next.js 15 + React 19 + Tailwind + Recharts
- `backend/`: Express + TypeScript + MongoDB + BullMQ + Redis

## What it does

- User signup, login, OTP verification, forgot password, and reset password
- Track products from supported stores
- Save product details, current price, and history in MongoDB
- Daily automatic price refresh jobs
- Product analytics and live price graphs
- Email, SMS, WhatsApp, and push notification architecture
- PricesAPI integration for live product lookup

## Security notes

Before pushing this repo anywhere:

- Do not commit any `.env` files
- Do not commit Twilio, MongoDB, SMTP, JWT, or PricesAPI secrets
- Rotate any secret that has already been pasted into chat or exposed elsewhere
- Use a strong `JWT_SECRET` with at least 32 characters

This repo already ignores local secret files and local build output through the root `.gitignore`.

## Project structure

```text
Price_Drop/
  backend/
  frontend/
  docker-compose.yml
  package.json
  README.md
```

## Requirements

Install these first:

- Node.js 20 or newer
- npm
- MongoDB Atlas or local MongoDB
- Redis if you want BullMQ-backed queues enabled

## How to open the project

1. Open the project folder:
   - `C:\Users\BITTU KUMAR SINGH\Downloads\Price_Drop`
2. Open it in VS Code or your IDE
3. Open two terminals:
   - one for `backend/`
   - one for `frontend/`

## Environment setup

### Backend

Create `backend/.env` from `backend/.env.example`.

Required backend values:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_very_long_secret_key_at_least_32_characters

REDIS_URL=redis://127.0.0.1:6379
REDIS_ENABLED=true

PRICES_API_KEY=your_pricesapi_key

EMAIL_FROM=your_email@example.com
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_smtp_password

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_API_KEY_SID=your_twilio_api_key_sid
TWILIO_API_KEY_SECRET=your_twilio_api_key_secret
TWILIO_SMS_FROM=your_twilio_number
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

Notes:

- `REDIS_ENABLED=false` is allowed for local testing, but queue retries and BullMQ workers will not be fully active
- `TWILIO_SMS_FROM` and `TWILIO_WHATSAPP_FROM` must be real Twilio-enabled sender values
- `JWT_SECRET` should be long and random

### Frontend

Create `frontend/.env` from `frontend/.env.example`.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Install dependencies

From the repo root:

```powershell
cmd /c npm run install:all
```

Or install manually:

```powershell
cd backend
cmd /c npm install

cd ..\frontend
cmd /c npm install
```

## Run the app in development

### Start backend

From the repo root:

```powershell
cmd /c npm run dev:backend
```

Or:

```powershell
cd backend
cmd /c npm run dev
```

Backend will run on:

- `http://localhost:5000`

### Start frontend

In another terminal from the repo root:

```powershell
cmd /c npm run dev:frontend
```

Or:

```powershell
cd frontend
cmd /c npm run dev
```

Frontend will run on:

- `http://localhost:3000`

## How to use it

1. Open `http://localhost:3000`
2. Register a new account
3. Verify the OTP sent to email
4. Log in
5. Add a product URL
6. The backend will:
   - fetch live product data
   - save the product in MongoDB
   - create the first price history record
7. View the dashboard, analytics, and product details page

## Build for production

### Backend

```powershell
cd backend
cmd /c npm run build
cmd /c npm start
```

### Frontend

```powershell
cd frontend
cmd /c npm run build
cmd /c npm start
```

## Optional Redis queue mode

If you want full BullMQ-based queue processing:

- make sure Redis is running
- set `REDIS_ENABLED=true`
- keep `REDIS_URL` valid

If Redis is disabled:

- the app still works
- daily tracking falls back to direct refresh logic
- queue retry behavior is reduced

## Quick troubleshooting

### Frontend opens but API calls fail

Check:

- backend is running on port `5000`
- `frontend/.env` has the correct `NEXT_PUBLIC_API_URL`
- `CLIENT_URL` in backend matches `http://localhost:3000`

### Login works, then session disappears after restart

Check:

- `JWT_SECRET` is properly set and long enough

### Notifications do not send

Check:

- SMTP credentials for email
- Twilio sender values for SMS and WhatsApp
- phone numbers stored in valid international format

### Daily jobs are not using BullMQ

Check:

- Redis is running
- `REDIS_ENABLED=true`

## Useful commands

From repo root:

```powershell
cmd /c npm run install:all
cmd /c npm run dev:backend
cmd /c npm run dev:frontend
cmd /c npm run build:frontend
cmd /c npm run start:backend
```
