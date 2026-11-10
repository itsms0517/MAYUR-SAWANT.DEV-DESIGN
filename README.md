# Mayur Sawant — Full-Stack Portfolio Platform

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloud Run](https://img.shields.io/badge/Google_Cloud_Run-4285F4?style=flat&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)

A production-grade, decoupled full-stack portfolio and CMS platform built for **Mayur Sawant** (Full-Stack Software Engineer & UI/UX Designer). Designed for sub-second page performance, 100 SEO & accessibility scores, and dynamic project/inquiry management without redeploying.

---

## Architecture Overview

```text
                               ┌────────────────────────────────┐
                               │   Vercel / Firebase Hosting    │
                               │  Next.js 15 (App Router) + TS  │
                               │    (SSR, ISR, OG Image Tags)   │
                               └──────────────┬─────────────────┘
                                              │
                                     REST API │ HTTPS / JSON
                                              ▼
                               ┌────────────────────────────────┐
                               │        Google Cloud Run        │
                               │    FastAPI + Pydantic + Uvicorn│
                               │    (Dockerized Python Backend) │
                               └───────┬────────────────┬───────┘
                                       │                │
                        SQLAlchemy 2.0 │                │ Resend API
                                       ▼                ▼
                          ┌─────────────────┐   ┌───────────────┐
                          │ Neon PostgreSQL │   │ Email Alerts  │
                          │ Serverless Pool │   │ (Mayur Inbox) │
                          └─────────────────┘   └───────────────┘
```

---

## Key Features

- **SEO & Social Sharing**: Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) ensures all search bots and OpenGraph link previews (LinkedIn, WhatsApp, Slack) receive rich HTML.
- **Dynamic CMS & Case Studies**: Projects are served dynamically from Neon PostgreSQL. Add or update projects via the JWT-secured Admin Dashboard without triggering code redeploys.
- **Instant Lead Capture**: Contact forms validate with Pydantic, save inquiries to PostgreSQL, and deliver real-time notifications to the site owner via Resend in non-blocking background tasks.
- **Admin Dashboard**: Secure control panel (`/admin`) for viewing incoming client messages and managing published case studies.
- **Zero-Cost Production Hosting**: Runs completely within Google Cloud Run's free tier (2M requests/month) and Neon's serverless free tier.

---

## Monorepo Directory Structure

```text
C:\Mayursawant.dev/
├── frontend/                  # Next.js 15 + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/               # App Router pages (Home, Work, Services, Contact, Admin)
│   │   ├── components/        # Hero, ProjectCard, Testimonials, ContactForm, Navbar, Footer
│   │   ├── lib/               # api.ts (Fetch wrapper), validators.ts
│   │   └── types/             # Shared TypeScript interfaces
│   ├── tailwind.config.ts     # Dark editorial theme with acid-lime accent (#B7FF3C)
│   └── package.json
│
├── backend/                   # FastAPI + SQLAlchemy 2.0 + Neon PostgreSQL
│   ├── app/
│   │   ├── main.py            # App initialization, CORS, auto-seeding
│   │   ├── core/              # Config (pydantic-settings), JWT security
│   │   ├── db/                # SQLAlchemy session & Base engine
│   │   ├── models/            # Project, Message, Testimonial, AdminUser tables
│   │   ├── schemas/           # Pydantic validation models
│   │   ├── routers/           # /projects, /contact, /testimonials, /admin
│   │   └── services/          # Resend async email integration
│   ├── Dockerfile             # Python 3.12-slim Cloud Run container
│   └── requirements.txt
│
└── .github/workflows/ci.yml   # Automated lint, build & pytest CI workflow
```

---

## Quick Start (Local Development)

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Copy example environment
cp .env.example .env

# Start server
uvicorn app.main:app --reload --port 8000
```

FastAPI Interactive Docs will be live at: `http://localhost:8000/docs`

### 2. Frontend (Next.js)

```bash
cd frontend
npm install

# Start development server
npm run dev
```

Next.js frontend will be live at: `http://localhost:3000`

---

## Production Deployment Guide

### Deploy Backend to Google Cloud Run

```bash
cd backend
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

gcloud run deploy portfolio-api \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="postgresql://neondb_owner:password@ep-xyz.aws.neon.tech/neondb?sslmode=require",RESEND_API_KEY="re_...",OWNER_EMAIL="mayursawant0517@gmail.com",CORS_ORIGINS="https://mayursawant.dev"
```

### Deploy Frontend to Vercel

1. Push this repository to GitHub.
2. Import the `frontend` folder into Vercel.
3. Add the environment variable:
   ```env
   NEXT_PUBLIC_API_URL="https://portfolio-api-xxxx-el.a.run.app/api"
   ```
4. Deploy!

---

## License

MIT © Mayur Sawant.
