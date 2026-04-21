# Deployment Notes

## Local Development

### Prerequisites
- Node.js ≥ 20
- A Supabase project (free tier works)

### Setup
```bash
# 1 – Clone
git clone git@github.com:joey564-wq/prototype1.git campus-exchange
cd campus-exchange

# 2 – Install client deps
cd client && npm install && cd ..

# 3 – Install API deps
cd api && npm install && cd ..

# 4 – Configure environment
cp client/.env.example client/.env
cp api/.env.example api/.env
# Fill in your Supabase URL + keys in both .env files

# 5 – Apply migrations (Supabase dashboard SQL editor or CLI)
# supabase db push   (if using Supabase CLI)

# 6 – Run seeds (optional)
# Paste supabase/seeds/seed.sql into the Supabase SQL editor

# 7 – Start dev servers (two terminals)
cd api  && npm run dev   # http://localhost:3000
cd client && npm run dev # http://localhost:5173
```

## Environment Variables

### `/client/.env`
| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_API_BASE_URL` | Express API base URL |

### `/api/.env`
| Variable | Description |
|----------|-------------|
| `PORT` | Express port (default 3000) |
| `CLIENT_ORIGIN` | CORS allowed origin |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key (server-side only, keep secret) |

## Production (future)
- Client: deploy as static site (Vercel / Netlify) – `npm run build` output in `dist/`.
- API: deploy to Railway / Render / Fly.io.
- Set `CLIENT_ORIGIN` to production domain in API env.
- Enable Supabase Row Level Security (RLS) policies.
