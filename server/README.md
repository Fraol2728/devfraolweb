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

## API overview

- `POST /api/admin/login` → returns JWT token for admin sessions.
- `GET /api/admin/me` → returns current admin info (requires `Authorization: Bearer <token>`).
- `GET /api/courses` → public list of all courses.
- `POST /api/courses` → create course (admin only, supports multipart thumbnail upload with field `thumbnail`).
- `PUT /api/courses/:id` → update course (admin only).
- `DELETE /api/courses/:id` → delete course (admin only).

## File uploads

- Course thumbnails are stored on local disk in `server/uploads` and exposed through `/uploads/<filename>`.
- For production, you can replace local disk storage with cloud object storage (for example S3, Cloudinary, Supabase Storage) by swapping multer storage configuration in `middleware/upload.js`.

## React frontend integration (Vite)

In your React app, add this to `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Use it in frontend API calls:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("adminToken");

await fetch(`${API_BASE_URL}/courses`);

await fetch(`${API_BASE_URL}/courses`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

## Deployment notes (Vercel, Render, Railway)

- Set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN` in platform environment variables.
- Set `PORT` only if your provider requires it (Render/Railway set this automatically).
- Start command: `npm start`.
- Node version: `>=18`.
