# Google Login System

Simple Express + React Google login demo.

## Setup

1. Copy `.env.example` to `.env`.
2. Add a Google OAuth client ID to `GOOGLE_CLIENT_ID`.
3. In Google Cloud Console, add this authorized JavaScript origin:

```text
http://127.0.0.1:5000
```

4. Optional: set `MONGODB_URI` to store users in MongoDB. Without it, the app uses an in-memory user store for local testing.

## Run

```bash
npm start
```

Open `http://127.0.0.1:5000`.

## Project Structure

```text
index.js              Server entry point
app.js                Express app setup and global middleware
config/               Environment and database connection
controllers/          Request handlers
middleware/           Auth middleware
models/               Mongoose models
routes/               API route definitions
services/             Google auth, JWT, and user persistence logic
public/               React UI and CSS
```

## API

- `GET /api/health`
- `GET /api/config`
- `POST /api/auth/google`
- `GET /api/auth/me`
- `POST /api/auth/logout`
