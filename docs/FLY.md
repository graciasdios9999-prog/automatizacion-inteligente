# Fly.io — host primario (reemplazo de Vercel)

Vercel team está en 402. Este repo ya trae `Dockerfile` + `fly.toml` + `output: standalone`.

## Primera vez (en tu máquina, una sola vez)

```bash
curl -L https://fly.io/install.sh | sh
fly auth login
fly launch --no-deploy --copy-config --name mirolagente --region dfw
fly secrets set NEXT_PUBLIC_APP_URL=https://mirolagente.fly.dev
# luego, uno por uno, SIN pegarlos en git:
# fly secrets set GROK_API_KEY=...
# fly secrets set STRIPE_SECRET_KEY=...
# fly secrets set DATABASE_URL=...
# fly secrets set CLERK_SECRET_KEY=...
# fly secrets set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
fly deploy
curl -i https://mirolagente.fly.dev/api/health
```

Si el nombre `mirolagente` está tomado:

```bash
fly launch --no-deploy --copy-config --name mirolagente-dfw --region dfw
```

y cambia `app` en `fly.toml`.

## CI

Repo → Settings → Secrets → `FLY_API_TOKEN` (`fly tokens create deploy`).
El workflow `.github/workflows/cd-fly.yml` despliega al pushear `main` o con Run workflow.

## Health

`GET /api/health` cada 15s. 1 máquina siempre encendida (`min_machines_running = 1`).
