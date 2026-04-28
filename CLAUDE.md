# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Run both frontend and backend together (recommended):**
```bash
npm run dev
```

**Run individually:**
```bash
# Backend (Express, port 4000)
cd backend && npm run dev

# Frontend (Vite/React, port 5173)
cd frontend && npm run dev
```

**Build frontend for production:**
```bash
cd frontend && npm run build
```

There are no test suites configured in this project.

## Architecture

This is a full-stack blog admin app split into two independent Node projects under a root orchestrator.

**Backend** (`backend/`) — Express + SQLite (CommonJS)
- `server.js` — entry point; mounts `/api/posts` router and `/health`
- `database.js` — singleton SQLite connection; creates the `posts` table on first open if it doesn't exist; the DB file is `backend/blog.db`
- `routes/posts.js` — all CRUD for posts: `GET /api/posts` (supports `?status=` and `?category=` filters), `GET /api/posts/:id`, `POST /api/posts`

**Frontend** (`frontend/`) — React 18 + React Router v6 + Vite (ESM)
- `src/api/posts.js` — thin fetch wrapper; all API calls go through here
- `src/App.jsx` — router root with three routes: `/` → PostList, `/posts/:id` → PostDetail, `/create` → CreatePost
- Pages use CSS Modules (`.module.css` co-located with each page)
- Vite proxies `/api/*` → `http://localhost:4000` in dev, so the frontend never hardcodes the backend port

**Post schema:** `id`, `title`, `content`, `author`, `category` (default `'General'`), `status` (`'draft'` | `'published'`), `created_at`
