# CI/CD — GitHub Actions

Workflows in `.github/workflows/`:

| Workflow | File | When | What |
|---|---|---|---|
| CI | `ci.yml` | PR + push to `main`/`develop`/`chore/production-hardening` | install, typecheck, lint, build, secret hygiene |
| CD Preview | `cd-preview.yml` | PR to `main`/`develop` | Vercel preview + `/api/health` |
| CD Production | `cd-production.yml` | push to `main` or manual | Vercel `--prod` + health |

## Required GitHub Actions secrets

Repo → Settings → Secrets and variables → Actions:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID` (`team_...`)
- `VERCEL_PROJECT_ID` (`prj_...`)

Optional environments: `preview`, `production` (Settings → Environments).

Do **not** put tokens in the repo or in chat.

## Current blocker

Vercel team billing 402 blocks live deploy until payment is current.

## Manual run

Actions → CI → Run workflow (branch `chore/production-hardening`).
