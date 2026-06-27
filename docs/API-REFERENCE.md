# Zeus Platform v6.0 - API Reference

This document provides an overview of the main REST API endpoints for the Zeus Platform. All endpoints are prefixed with `/api`.

**Base URL (Production)**: `https://your-backend-domain.com/api`

**Authentication**: Most endpoints require a valid JWT token in the `Authorization: Bearer <token>` header (obtained via `/api/auth/login`).

## Core Endpoints

### Authentication
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/me` — Get current user profile

### Zeus Agent (Core Intelligence)
- `POST /api/zeus/chat` — Send message to Zeus v6.0 (web chat interface). Returns response with memory context.
  - Body: `{ "message": "string", "from": "web" }`
- `GET /api/zeus/status` — Health and capabilities status of the Zeus agent (includes vector memory stats).

### Social & Content
- `POST /api/social/post` — Publish content to connected platforms (primary via Zapier for stability)
- `POST /api/social/schedule` — Schedule posts with intelligent timing
- `GET /api/social/trends` — Retrieve current trending topics with analysis

### Billing & Monetization
- `POST /api/billing/create-checkout` — Create Stripe Checkout session
- `POST /api/billing/create-portal-session` — Customer billing portal
- `POST /api/billing/connect` — Stripe Connect account creation (for affiliates/creators)
- `POST /api/billing/webhook` — Stripe webhook handler (for subscriptions, payouts)

### Analytics & Dashboard
- `GET /api/analytics/dashboard` — Real-time KPIs and metrics
- `GET /api/analytics/reports` — Exportable reports

### Marketplace & Affiliates
- `GET /api/marketplace/prompts` — Browse and purchase optimized prompts
- `POST /api/affiliates/create` — Generate affiliate link

### WhatsApp Integration (Zeus Control)
- Webhook endpoint for Twilio (configured in routes/whatsapp.js) — Allows direct commands to Zeus via your WhatsApp number.

## Vector Memory Endpoints (Internal / Admin)
- Memory operations are primarily handled internally by the agent but can be exposed via admin routes if needed (e.g., `/api/admin/memory/stats`).

## Error Responses
Standard JSON error format:
```json
{
  "error": "Description of the error",
  "code": "ERROR_CODE",
  "timestamp": "ISO8601"
}
```

## Rate Limiting
Global rate limiting applied (configurable in `.env`).

## WebSocket (Real-time)
Connect to `/` via Socket.io for live metrics, notifications, and agent updates.

For full OpenAPI/Swagger spec, run the server with documentation middleware or contact support for the latest spec file.

**Note**: Social posting prioritizes stable Zapier webhooks over direct fragile APIs for maximum reliability.