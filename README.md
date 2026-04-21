# Campus Exchange

A mobile-first marketplace for Chico State students to buy and sell items within a verified campus community.

## Repo Layout

```
/client/      # React PWA (Vite + Tailwind CSS)
/api/         # Express REST API (Node.js)
/supabase/    # SQL migrations + seed data
/docs/        # PRD, site map, OpenAPI spec, deployment notes
README.md
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, PWA (service worker) |
| Backend | Express 4, Node.js 20+ |
| Database | Supabase (PostgreSQL + Auth + Storage) |
| Auth | Supabase Auth – Chico State email required |

## Quick Start

### Prerequisites
- Node.js ≥ 20
- A [Supabase](https://supabase.com) project (free tier works)

### 1 – Install dependencies

```bash
cd client && npm install && cd ..
cd api    && npm install && cd ..
```

### 2 – Configure environment

```bash
cp client/.env.example client/.env
cp api/.env.example    api/.env
# Fill in Supabase URL + keys in both files
```

### 3 – Apply database schema

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor (or via `supabase db push` with the Supabase CLI).  
Optionally run `supabase/seeds/seed.sql` to load categories and meetup locations.

### 4 – Start dev servers

```bash
# Terminal 1
cd api    && npm run dev   # http://localhost:3000

# Terminal 2
cd client && npm run dev   # http://localhost:5173
```

## Documentation

- [`docs/PRD.md`](docs/PRD.md) – Product requirements
- [`docs/sitemap.md`](docs/sitemap.md) – Page hierarchy & user flows
- [`docs/openapi.yaml`](docs/openapi.yaml) – REST API spec
- [`docs/deployment.md`](docs/deployment.md) – Environment variables & hosting guide
