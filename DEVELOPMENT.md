# MiroAgente - Guía de Desarrollo

## 🎯 Arquitectura General

### Frontend (Next.js 15)
- **App Router** con Server Components por defecto
- **Client Components** solo donde se necesita interactividad
- **Layout Hierarchy**: Root → Auth/Dashboard → Pages
- **Componentes Reutilizables** en `/components`

### Backend (Serverless)
- **Next.js API Routes** para endpoints
- **Drizzle ORM** para queries type-safe
- **Environment Variables** para secrets

### Database (PostgreSQL)
- **Drizzle Schema** en `/lib/db/schema.ts`
- **Migrations** automáticas con drizzle-kit
- **Relations** configuradas en schema

---

## 📋 Convenciones de Código

### Naming
```typescript
// Componentes: PascalCase
export default function DashboardLayout() {}

// Funciones: camelCase
export async function generateFinancialContent() {}

// Variables: camelCase
const socialAccounts = [];

// Tipos: PascalCase
interface GeneratedContentResponse {}
type Platform = 'instagram' | 'tiktok';

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
```

### Estructura de Componentes
```typescript
'use client'; // Si es interactivo

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Props {
  title: string;
  onSubmit: (data: any) => void;
}

export default function MyComponent({ title, onSubmit }: Props) {
  const [state, setState] = useState('');

  return (
    <div className="space-y-4">
      {/* Contenido */}
    </div>
  );
}
```

---

## 🔌 API Endpoints (Por Implementar)

### Content Generation
```
POST /api/content/generate
Body: { platform, contentType, category, topic, tone }
Response: GeneratedContentResponse
```

### Social Media Integration
```
POST /api/social/:platform/publish
GET /api/social/:platform/analytics/:id
GET /api/social/:platform/comments/:id
```

### Leads Management
```
GET /api/leads
GET /api/leads/:id
POST /api/leads/:id/send-magnet
PUT /api/leads/:id/update-temperature
```

### Email
```
POST /api/email/send-lead-magnet
POST /api/email/send-sequence
```

---

## 🎨 UI/UX Patterns

### Colores
- **Primary**: Blue (innovación)
- **Success**: Green (completado)
- **Warning**: Yellow (atención)
- **Danger**: Red (error)
- **Neutral**: Gray/Slate (background)

### Typography
- **h1**: 3xl font-bold
- **h2**: 2xl font-bold
- **h3**: xl font-bold
- **body**: base font-normal
- **small**: sm font-normal

### Spacing
- Use Tailwind spacing: `space-y-4`, `gap-6`, `p-8`
- Padding: `p-6` o `p-8` para cards
- Gaps: `gap-4` para pequeño, `gap-6` para mediano

### Components
- **Cards**: `bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8`
- **Buttons**: `px-4 py-2 rounded-lg font-semibold transition`
- **Inputs**: `px-4 py-2 rounded-lg border dark:bg-slate-700`
- **Badges**: `px-3 py-1 rounded-full text-sm font-semibold`

---

## 🔐 Seguridad

### Autenticación
- Clerk maneja toda la auth
- Proteger rutas con `useUser()` en client
- Middleware en server si es necesario

### API Security
- Validar inputs con Zod
- Verificar usuario es owner de recurso
- Rate limiting (próximo)
- CORS configurado

### Secrets
- Nunca commitear `.env.local`
- API keys solo en variables privadas
- Public keys con `NEXT_PUBLIC_` prefix

---

## 🧪 Testing (Próximamente)

```bash
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e         # E2E tests
```

---

## 📚 Stack Specific Guides

### Next.js 15
- [Docs](https://nextjs.org/docs)
- App Router: `/app` directory
- Server/Client: 'use client' directive
- API Routes: `/app/api`

### Tailwind CSS
- [Docs](https://tailwindcss.com/docs)
- Dark mode: `dark:` prefix
- Responsive: `md:`, `lg:` prefixes

### Drizzle ORM
- [Docs](https://orm.drizzle.team)
- Schema: `/lib/db/schema.ts`
- Relations: Definidas en schema
- Queries: `db.query.*`

### React Query
- [Docs](https://tanstack.com/query/latest)
- `useQuery()` para GET
- `useMutation()` para POST/PUT/DELETE
- DevTools: `@tanstack/react-query-devtools`

---

## 🚀 Performance

### Optimizaciones
- ✅ Image optimization (próximamente)
- ✅ Code splitting automático
- ✅ Dynamic imports para heavy components
- ✅ Query caching con React Query
- ✅ ISR para static pages (próximamente)

### Monitoreo
- Vercel Analytics
- Web Vitals dashboard
- Error tracking (próximamente)

---

## 📖 Resources

- Next.js: https://nextjs.org
- Tailwind: https://tailwindcss.com
- Drizzle: https://orm.drizzle.team
- Clerk: https://clerk.com/docs
- React Query: https://tanstack.com/query
- TypeScript: https://www.typescriptlang.org

---

## 🐛 Debugging

```bash
# Dev mode con debugging
DEBUG=* npm run dev

# TypeScript check
npm run type-check

# Lint
npm run lint

# Database studio
npm run db:studio
```

---

**Happy Coding! 🚀**
