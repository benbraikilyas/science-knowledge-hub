# Science Knowledge Hub

A modern scientific knowledge platform covering Space, Astronomy, Physics, Quantum Mechanics, Biology, AI, Technology, and more.

## Structure

- `frontend/` — Next.js application (App Router, TypeScript, Tailwind CSS, next-themes)
- `backend/` — Django REST API (Django, Python)

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### Backend

```bash
cd backend
python -m venv .venv
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```
