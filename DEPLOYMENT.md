# MiroAgente - Instrucciones de Deployment

## 🚀 Deployment en Vercel

### Paso 1: Preparar el repositorio

```bash
# Asegúrate de que todo está committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona el repositorio `automatizacion-inteligente`
5. Click en "Import"

### Paso 3: Configurar variables de entorno

En Vercel dashboard, ve a "Settings" → "Environment Variables" y añade:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<tu_valor>
CLERK_SECRET_KEY=<tu_valor>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard/onboarding

DATABASE_URL=<postgresql://...>

GROK_API_KEY=<tu_valor>
NEXT_PUBLIC_GROK_MODEL=grok-2

INSTAGRAM_ACCESS_TOKEN=<tu_valor>
INSTAGRAM_BUSINESS_ACCOUNT_ID=<tu_valor>

TIKTOK_ACCESS_TOKEN=<tu_valor>
TIKTOK_OPEN_ID=<tu_valor>

YOUTUBE_API_KEY=<tu_valor>
YOUTUBE_CHANNEL_ID=<tu_valor>

X_API_KEY=<tu_valor>
X_API_SECRET=<tu_valor>
X_ACCESS_TOKEN=<tu_valor>
X_ACCESS_TOKEN_SECRET=<tu_valor>
X_BEARER_TOKEN=<tu_valor>

RESEND_API_KEY=<tu_valor>

NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_SUPPORT_EMAIL=support@mirolagente.com
```

### Paso 4: Setup de Base de Datos (Vercel Postgres)

1. En Vercel, ve a "Storage" → "Create Database"
2. Selecciona "Postgres"
3. Copia la conexión string a `DATABASE_URL`
4. Ejecuta migrations:

```bash
npm run db:push
```

### Paso 5: Deploy

```bash
# Vercel detectará automáticamente Next.js
# Solo clickea "Deploy" en el dashboard
```

---

## 📦 Estructura de Deployment

```
✅ Build: Next.js 15 optimizado
✅ Database: Vercel Postgres
✅ Auth: Clerk (Edge Functions)
✅ APIs: Serverless Functions
✅ Storage: Vercel Blob (próximamente)
✅ Caching: Vercel Cache
```

---

## 🔒 Seguridad

- ✅ Variables de entorno protegidas
- ✅ API keys no expuestas en cliente
- ✅ Clerk para autenticación segura
- ✅ CORS configurado
- ✅ Rate limiting en APIs

---

## 📊 Monitoreo

En Vercel dashboard:

1. **Analytics** - Ver tráfico y performance
2. **Logs** - Revisar errores y eventos
3. **Deployments** - Historial de releases
4. **Usage** - Función invocations y bandwidth

---

## 🔄 CI/CD

Automático con Vercel:

- Cada push a `main` = deploy automático
- Pull requests = preview deployments
- Rollbacks = un click

---

## 🆘 Troubleshooting

### Error: Database connection failed
```bash
# Verifica DATABASE_URL
# Asegúrate que Postgres está iniciado en Vercel
```

### Error: Clerk API key not found
```bash
# Verifica que CLERK_SECRET_KEY está en env variables
# No debe tener comillas extras
```

### Error: 500 Internal Server Error
```bash
# Revisa los logs en Vercel
# Vercel Dashboard → Logs
```

---

## 🎉 ¡Listo!

Tu aplicación está en vivo en: `https://tu-proyecto.vercel.app`

Próximos pasos:
1. Configura dominio personalizado
2. Setup de monitoreo
3. Configura backups
4. Optimiza performance

