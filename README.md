# Automatización Inteligente 2.0 🚀

Plataforma SaaS empresarial completa con IA, automatización, CRM, marketplace y más.

## 🚀 Inicio Rápido

### Con Docker (Recomendado)
```bash
docker-compose up
```

### Manual
```bash
# Backend
npm install
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

## 📋 Características Phase 1

✅ **Backend Express** con arquitectura modular
✅ **Rutas API completas** (Auth, CRM, Billing, Analytics, AI, Social)
✅ **Frontend React** con Tailwind CSS
✅ **Docker** para deployment
✅ **Logging** con Winston
✅ **CORS** configurado
✅ **JWT** listo para autenticación

## 🔗 URLs

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:3001
- **Health Check**: http://localhost:3000/health

## 📊 Rutas API Disponibles

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### CRM
- `GET /api/crm/contacts`
- `POST /api/crm/contacts`

### Billing
- `GET /api/billing/subscriptions`
- `POST /api/billing/subscribe`

### Analytics
- `GET /api/analytics/dashboard`

### IA
- `POST /api/ai/generate-content`
- `POST /api/ai/landing-page`
- `POST /api/ai/chatbot/train`

### Redes Sociales
- `POST /api/social/publish`
- `GET /api/social/platforms`

### Marketplace
- `GET /api/marketplace/prompts`
- `POST /api/marketplace/prompts`

### Afiliados
- `GET /api/affiliate/dashboard`
- `POST /api/affiliate/link`

### Webhooks
- `POST /api/webhooks/events`

## 🛠️ Stack

**Backend**
- Node.js 18+
- Express.js
- Winston Logging
- Helmet Security
- CORS

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

**DevOps**
- Docker
- Docker Compose

## 📖 Próximas Fases

- **FASE 2**: Dashboard en Tiempo Real con WebSocket
- **FASE 3**: Base de Datos, Stripe, Membresías
- **FASE 4**: IA avanzada, Landing Pages, RAG
- **FASE 5**: Agentes, Tendencias, Automatización
- **FASE 6**: Predicciones, Control Center
- **FASE 7**: PWA Mobile

## 🚀 Deploy en Hostinger

```bash
# Construir para producción
npm run build

# Copiar a Hostinger via FTP
# O usar el script deploy
npm run deploy:hostinger
```

## 📞 Soporte

Para soporte, crea un issue en GitHub.

---

**Creado con ❤️ | 2026 | graciasdios9999-prog**