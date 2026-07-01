# MiroAgente - MVP de Agente de Automatización Inteligente para Redes Sociales

## 🎯 Descripción General

MiroAgente es un **agente de IA especializado en automatización de redes sociales para creadores de contenido financiero, coaches y expertos en wealth building**. Automatiza completamente:

✅ **Generación de contenido viral** con IA especializada en finanzas  
✅ **Publicación automática** en Instagram, TikTok, YouTube y X  
✅ **Captura automática de leads** desde comentarios y DMs  
✅ **Respuestas inteligentes** a interacciones de usuarios  
✅ **Lead nurturing automático** con email sequences  
✅ **Analytics avanzado** con insights IA y ROI estimado  

---

## 🏗️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React moderno con App Router
- **TypeScript** - Type safety completo
- **Tailwind CSS + shadcn/ui** - UI components premium
- **TanStack Query (React Query)** - State management y caching
- **Recharts** - Visualización de datos
- **Clerk Auth** - Autenticación empresarial

### Backend
- **Next.js API Routes** - Serverless endpoints
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Base de datos relacional
- **Vercel Postgres** - Database hosting

### IA y APIs
- **Grok API (xAI)** - Generación de contenido financiero
- **Instagram Graph API** - Publicación y análisis
- **TikTok API** - Video upload y analytics
- **YouTube Data API** - Shorts upload
- **X (Twitter) API v2** - Threads y engagement
- **Resend** - Email delivery para lead magnets

### Deployment
- **Vercel** - Hosting y CI/CD
- **Vercel Cron** - Scheduled tasks
- **GitHub** - Version control

---

## 📁 Estructura del Proyecto

```
mirolagente/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout con Clerk
│   │   ├── page.tsx                   # Landing page
│   │   ├── globals.css                # Estilos globales
│   │   ├── (auth)/                    # Auth routes
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   └── (dashboard)/               # Dashboard routes protegidas
│   │       ├── dashboard/
│   │       │   ├── page.tsx           # Main dashboard
│   │       │   ├── content-generator/page.tsx
│   │       │   ├── calendar/page.tsx
│   │       │   ├── leads/page.tsx
│   │       │   ├── analytics/page.tsx
│   │       │   ├── settings/page.tsx
│   │       │   └── onboarding/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── navbar.tsx
│   │   ├── dashboard/
│   │   │   └── stats-card.tsx
│   │   └── content/
│   │       ├── content-generator-form.tsx
│   │       ├── content-preview.tsx
│   │       └── category-selector.tsx
│   ├── lib/
│   │   ├── db/
│   │   │   ├── client.ts              # Drizzle client
│   │   │   └── schema.ts              # Database schema
│   │   └── api/
│   │       ├── grok.ts                # IA content generation
│   │       ├── instagram.ts           # Instagram API
│   │       ├── tiktok.ts              # TikTok API
│   │       ├── youtube.ts             # YouTube API
│   │       ├── x-api.ts               # X (Twitter) API
│   │       └── email.ts               # Email delivery
│   ├── hooks/
│   └── styles/
├── public/
├── drizzle/                           # Database migrations
├── .env.example                       # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

---

## 🚀 Getting Started

### Requisitos Previos
- Node.js 18+
- PostgreSQL database
- Accounts en: Clerk, Grok API, Instagram, TikTok, YouTube, X, Resend

### Instalación

1. **Clonar repositorio**
```bash
git clone https://github.com/graciasdios9999-prog/automatizacion-inteligente.git
cd automatizacion-inteligente
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

4. **Setup de base de datos**
```bash
npm run db:push
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

Visita `http://localhost:3000`

---

## 🎯 Funcionalidades MVP

### 1️⃣ Generador de Contenido IA
- ✅ Generación multi-plataforma (Instagram, TikTok, YouTube, X)
- ✅ 5 categorías de contenido financiero
- ✅ Optimización de hooks, CTAs, hashtags, emojis
- ✅ Generación de múltiples variantes
- ✅ Preview en tiempo real

### 2️⃣ Publicación Automática
- ✅ Programación inteligente por horarios
- ✅ Multi-plataforma simultánea
- ✅ Calendario editorial
- ✅ Sugerencias de temas trending

### 3️⃣ Lead Generation Automática
- ✅ Monitoreo de comentarios en tiempo real
- ✅ Captura automática desde DMs
- ✅ Clasificación por temperatura (Cold/Warm/Hot)
- ✅ Engagement scoring automático
- ✅ Lead magnet delivery automática

### 4️⃣ Lead Nurturing
- ✅ Email sequences automáticas
- ✅ Seguimiento de interacciones
- ✅ Clasificación de leads por estado
- ✅ Tracking de conversiones

### 5️⃣ Analytics Avanzado
- ✅ Dashboard de métricas en tiempo real
- ✅ Insights IA sobre rendimiento
- ✅ ROI estimado por contenido
- ✅ Gráficos de engagement, impresiones, leads
- ✅ Recomendaciones automáticas

### 6️⃣ Automatización de Respuestas
- ✅ Respuestas inteligentes a comentarios
- ✅ Replies automáticos a DMs
- ✅ Reglas de automatización personalizables
- ✅ Lead magnet delivery por DM

---

## 📊 Database Schema

Tablas principales:
- **users** - Usuarios del sistema
- **social_accounts** - Cuentas conectadas por plataforma
- **generated_content** - Contenido creado con IA
- **leads** - Leads capturados
- **metrics** - Analytics y métricas
- **content_templates** - Templates de contenido
- **lead_magnets** - Lead magnets configurados
- **automation_rules** - Reglas de automatización

---

## 🔑 Configuración de APIs

### Clerk (Autenticación)
1. Ir a https://dashboard.clerk.com
2. Crear aplicación
3. Copiar `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`

### Grok API (IA)
1. Ir a https://console.x.ai
2. Crear API key
3. Copiar `GROK_API_KEY`

### Instagram Graph API
1. Ir a https://developers.facebook.com
2. Crear app
3. Generar access token con permisos: `instagram_basic,instagram_graph_user_media,instagram_graph_user_insights`

### TikTok API
1. Ir a https://developer.tiktok.com
2. Crear aplicación
3. Generar access token

### YouTube API
1. Ir a https://console.cloud.google.com
2. Habilitar YouTube Data API v3
3. Crear API key

### X (Twitter) API
1. Ir a https://developer.twitter.com/en/portal/dashboard
2. Crear proyecto
3. Generar Bearer Token con v2 API access

### Resend (Email)
1. Ir a https://resend.com
2. Crear cuenta
3. Generar API key

---

## 📝 Uso

### Generador de Contenido
1. Ir a `/dashboard/content-generator`
2. Seleccionar plataforma, categoría, tema
3. Clickear "Generar Contenido"
4. Editar preview si es necesario
5. Programar o publicar inmediatamente

### Gestión de Leads
1. Ir a `/dashboard/leads`
2. Ver leads capturados automáticamente
3. Filtrar por temperatura
4. Hacer click en un lead para ver detalles
5. Enviar lead magnet o contactar

### Analytics
1. Ir a `/dashboard/analytics`
2. Ver métricas en tiempo real
3. Análisis de mejor contenido
4. Insights IA con recomendaciones

---

## 🛣️ Roadmap

### Fase 1 (MVP - En Progreso)
- ✅ Generador IA de contenido
- ✅ Publicación automática
- ✅ Lead generation básica
- ✅ Dashboard y analytics
- ⏳ API integrations completas
- ⏳ Lead nurturing sequences

### Fase 2 (v1.0 - Próximo)
- Respuestas automáticas IA
- Automation rules builder
- A/B testing de contenido
- Integración con CRM
- Webhooks para eventos

### Fase 3 (v2.0)
- Marketplace de templates
- Collaborative content creation
- Team management
- Advanced scheduling
- Custom reports builder

---

## 🤝 Contributing

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 💬 Soporte

¿Necesitas ayuda? Contáctanos en:
- Email: support@mirolagente.com
- Discord: [Próximamente]
- Docs: [Próximamente]

---

## 👨‍💻 Autor

Creado por **graciasdios9999-prog** 🚀

---

**MiroAgente v0.1.0** - MVP de Automatización Inteligente para Redes Sociales Financieras 💰
