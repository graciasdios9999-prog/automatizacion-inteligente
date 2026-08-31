# Hosting — Vercel no es el camino ahora

Vercel team `michel-s-projects7` devolvió HTTP 402 (saldo vencido). Hasta que paguen, el host primario es **Render** (`render.yaml`) o **Fly.io** (`fly.toml`). Cloudflare Pages queda como CDN/estático (`wrangler.toml`).

## Render (recomendado 24/7)
1. New Web Service → este repo, rama `chore/production-hardening`
2. Health: `/api/health`
3. Env: `DATABASE_URL`, `GROK_API_KEY`, `STRIPE_SECRET_KEY`, Clerk, `NEXT_PUBLIC_APP_URL`

## Fly
`fly launch --config fly.toml` y `fly secrets set ...`

## No uses tokens del chat. Solo dashboard.
