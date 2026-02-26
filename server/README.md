# Course Management Backend (Node.js + Express + MongoDB)

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy and configure env variables:
   ```bash
   cp .env.example .env
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## React frontend integration (Vite)

In your React app, add this to `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Use it in frontend API calls:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

await fetch(`${API_BASE_URL}/courses`);
```

## Deployment notes (Vercel, Render, Railway)

- Set `MONGODB_URI` and `CLIENT_ORIGIN` in platform environment variables.
- Set `PORT` only if your provider requires it (Render/Railway set this automatically).
- Start command: `npm start`.
- Node version: `>=18`.
