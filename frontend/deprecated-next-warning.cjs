console.error(`
\x1b[31mThis folder is the old Next.js app and is no longer used.\x1b[0m

Run the app from the project root instead:

  cd ..
  npm install
  npm run dev

Web UI: http://localhost:3000  (Vite + React)
API:    http://localhost:5000/api
`);
process.exit(1);
