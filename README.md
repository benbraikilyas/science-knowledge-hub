# Science Knowledge Hub

A modern scientific knowledge platform covering Space, Astronomy, Physics, Quantum Mechanics, Biology, AI, Technology, and more.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP animations, next-themes |
| **Backend** | Django 5.x, Django REST Framework 3.15, djangorestframework-simplejwt |
| **Database** | MongoDB (MongoEngine 0.28, MongoDB Atlas) |
| **Auth** | JWT (access + refresh tokens) |

## Project Structure

```
science-knowledge-hub/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components (16 total)
│   │   └── lib/            # API client, types, utils, constants
│   ├── public/             # Static assets
│   └── package.json
├── backend/                # Django REST API
│   ├── backend_config/     # Settings, URLs, JWT auth
│   ├── articles/           # Articles app (models, views, serializers)
│   ├── categories/         # Categories app
│   ├── scientists/         # Scientists app
│   ├── authentication/     # User registration, login, bookmarks
│   ├── requirements.txt
│   └── .env
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Backend Setup

```bash
cd backend
python -m venv .venv

# Windows
.\.venv\Scripts\Activate.ps1

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env   # Then edit with your MongoDB URI
python manage.py runserver
```

Backend runs on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # Optional — defaults work for local dev
npm run dev
```

Frontend runs on `http://localhost:3000`

### Environment Variables

#### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | Yes | `mongodb://localhost:27017` | MongoDB connection string (Atlas SRV or local) |
| `MONGO_DB_NAME` | No | `science_hub` | Database name |
| `DJANGO_SECRET_KEY` | Yes | — | Random secret key (50+ chars) |
| `DJANGO_DEBUG` | No | `True` | Enable/disable debug mode |
| `DJANGO_ALLOWED_HOSTS` | No | `localhost,127.0.0.1` | Comma-separated allowed hosts |

#### Frontend (`frontend/.env.local`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:8000/api/v1` | Backend API base URL |

---

## API Endpoints

All content endpoints are **public** (no auth required). Auth endpoints are under `/api/v1/auth/`.

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/articles/` | List published articles. Query: `category`, `featured`, `tag`, `search` |
| `GET` | `/api/v1/articles/featured/` | Up to 6 featured articles |
| `GET` | `/api/v1/articles/related/?slug=<slug>` | Up to 4 related articles |
| `GET` | `/api/v1/articles/<slug>/` | Article detail (increments view count) |
| `POST` | `/api/v1/articles/<id>/like/` | Increment like count |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/categories/` | List all active categories |
| `GET` | `/api/v1/categories/<slug>/` | Category detail |

### Scientists

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/scientists/` | List scientists. Query: `featured`, `field`, `search` |
| `GET` | `/api/v1/scientists/featured/` | Up to 6 featured scientists |
| `GET` | `/api/v1/scientists/<slug>/` | Scientist detail |

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/auth/register/` | No | Register. Body: `username`, `email`, `password`, `display_name?` |
| `POST` | `/api/v1/auth/login/` | No | Login. Body: `identifier` (username or email), `password` |
| `POST` | `/api/v1/auth/refresh/` | No | Refresh access token. Body: `refresh` |
| `GET` | `/api/v1/auth/profile/` | Yes | Get current user profile |
| `PATCH` | `/api/v1/auth/profile/` | Yes | Update profile. Body: `displayName?`, `avatar?`, `bio?` |
| `GET` | `/api/v1/auth/bookmarks/` | Yes | Get bookmarked article IDs |
| `POST` | `/api/v1/auth/bookmarks/` | Yes | Toggle bookmark. Body: `articleId` |
| `GET` | `/api/v1/auth/reading-history/` | Yes | Get reading history (max 50) |
| `POST` | `/api/v1/auth/reading-history/` | Yes | Add to history. Body: `articleId`, `title` |

---

## What's Working

### Backend

- Full CRUD read API for articles, categories, and scientists
- JWT authentication (register, login, token refresh)
- User profiles with bookmarks and reading history
- MongoDB Atlas integration with MongoEngine ODM
- CORS configured for `localhost:3000`
- Custom JWT authentication backed by MongoDB users
- Article view counting, like system, related articles
- Category filtering and search across articles/scientists
- Featured content endpoints for homepage
- Slug-based routing on all entities

### Frontend

- **Homepage** (`/`) — Hero with animated starfield, featured articles bento grid, categories grid, stats counter, scientists spotlight, newsletter section
- **Categories** (`/categories`) — Grid of all categories with icon, color, article count
- **Category Detail** (`/categories/[slug]`) — Category info + filtered articles
- **Scientists** (`/scientists`) — Directory with field filtering
- **Scientist Detail** (`/scientists/[slug]`) — Full profile with biography, contributions, quotes, awards
- **Search** (`/search`) — Unified search across articles and scientists via `?q=` query param
- Dark/light theme with full CSS variable system (next-themes)
- GSAP-powered animations: scroll-triggered reveals, 3D card tilt, mouse-following glows, counter animations
- Responsive design with mobile hamburger menu
- Keyboard shortcut `Cmd/Ctrl+K` for search
- Fallback to demo data when API is unavailable
- Server-side rendering with ISR (60s revalidation)

---

## What Needs to Be Added / Fixed

### Critical — Missing Pages

These pages are linked throughout the UI but don't exist yet. Users will see 404s:

1. **`/articles` page** — Article listing page (linked from nav, hero CTA "Start Exploring", footer)
2. **`/articles/[slug]` page** — Article detail page (linked from every ArticleCard). Should use the existing `ArticleReadingProgress` component and the `article-content` CSS class for rich typography
3. **`/privacy` page** — Privacy policy (linked from footer)
4. **`/terms` page** — Terms of service (linked from footer)
5. **`/sitemap` page** — Sitemap (linked from footer)

### Critical — Backend Gaps

1. **No `.env.example` file** — The backend `.gitignore` references it but it was never created. Without it, new developers don't know what env vars are needed
2. **SECRET_KEY is a placeholder** — `replace-me-with-a-random-secret` must be replaced before any deployment
3. **No content management endpoints** — Articles, categories, and scientists can only be managed by inserting directly into MongoDB. There's no admin API for creating/updating/deleting content
4. **`article_count` on Category is never updated** — The field exists but no code increments it when articles are added/removed
5. **`updated_at` never updates** — All models have `updated_at` but no pre-save hook updates it; it always reflects creation time

### Important — Frontend Cleanup

1. **Dead API layer** — `src/lib/api.ts` defines 11 axios functions that are never imported. All pages use raw `fetch()` directly. Either refactor pages to use `api.ts` or remove it
2. **Unused dependencies** — `framer-motion` and `@gsap/react` are installed but never imported
3. **Unused components** — `LoadingSkeleton`, `FadeIn`, `ArticleReadingProgress` are built but never rendered
4. **Unused utility functions** — 8 of 12 functions in `utils.ts` are never imported
5. **Newsletter forms don't work** — Both `NewsletterSection` and `Footer` newsletter forms just prevent default with no backend call
6. **Stats are hardcoded** — `StatsCounter` displays hardcoded numbers instead of fetching from API
7. **No `.env.local` file in frontend** — Relies on defaults; should have an example file

### Important — Backend Improvements

1. **No tests** — All 4 apps have empty `tests.py` files
2. **No password change/reset** — Users can register and login but can't change passwords
3. **No token blacklist** — Logout is purely frontend (delete token); no server-side invalidation
4. **No email verification** — Registration accepts any email without verification
5. **Like endpoint has no rate limiting** — Anyone can spam likes without auth
6. **CSRF middleware is active** — Unnecessary for a pure JWT REST API and may cause issues with non-browser clients
7. **`Author` model is dead code** — Defined in `articles/models.py` but never imported or used anywhere
8. **Redundant data on Article** — Category and author fields are denormalized (duplicated) on every article with no sync mechanism

### Nice to Have

1. **Admin dashboard** — A frontend or Django admin for managing content
2. **Pagination** — DRF pagination is configured (`PAGE_SIZE=20`) but MongoEngine querysets may not be compatible; list endpoints return all results
3. **Loading states** — No `loading.tsx` or `error.tsx` files for streaming/error UI
4. **Middleware** — No route protection, redirects, or request handling
5. **Error boundaries** — If API fails and demo data import also fails, pages crash
6. **`PlatformStats` type** exists but is never used; stats could come from a dedicated endpoint

---

## Frontend Routes Reference

| Route | Status | Description |
|-------|--------|-------------|
| `/` | Working | Homepage |
| `/categories` | Working | Categories grid |
| `/categories/[slug]` | Working | Category detail + articles |
| `/scientists` | Working | Scientists directory |
| `/scientists/[slug]` | Working | Scientist profile |
| `/search?q=` | Working | Search articles + scientists |
| `/articles` | **Missing** | Article listing |
| `/articles/[slug]` | **Missing** | Article detail |
| `/privacy` | **Missing** | Privacy policy |
| `/terms` | **Missing** | Terms of service |
| `/sitemap` | **Missing** | Sitemap |

---

## MongoDB Collections

| Collection | Purpose |
|------------|---------|
| `users` | User accounts (username, email, hashed password) |
| `user_profiles` | Profiles (display name, avatar, bio, bookmarks, reading history) |
| `categories` | Article categories with icon, color, gradient |
| `articles` | Published articles with full metadata |
| `authors` | Author records (currently unused) |
| `scientists` | Scientist profiles with biography and contributions |

---

## License

ISC
