# 🛠️ DEPLOYMENT GUIDE - Hostinger

## 1. Preparar Hostinger

### Step 1: Acceder a Hostinger
- URL: https://hostinger.com/dashboard
- Login con tus credenciales

### Step 2: Crear Node.js App
1. Ve a **Applications/Node.js**
2. Click **Create Application**
3. Configura:
   - **Node version**: 18+
   - **Port**: 3000
   - **Entry point**: `src/index.js`

### Step 3: Variables de Entorno
Aañade en Hostinger:
```
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://tudominio.com
BACKEND_URL=https://api.tudominio.com
```

## 2. Desplegar

### Via GitHub (Recomendado)
1. Push a `main` branch
2. Hostinger auto-deploya
3. URL: `https://api.tudominio.com`

### Via FTP Manual
```bash
# Compilar
npm run build

# Comprimir
zip -r dist.zip dist/ node_modules/ package.json

# Subir via FTP
ftp -u ftp://user:pass@ftp.tudominio.com dist.zip
```

## 3. Dominio SSL
- Hostinger: Settings > SSL Certificate
- Activar: Free Let's Encrypt
- Esperar 5-10 minutos

## 4. Base de Datos (PostgreSQL)
- En Hostinger: Databases > Create
- Nombre: `auto_inteligente_2026`
- Guardar credenciales en .env

## 5. Verificar Deployment

```bash
curl https://api.tudominio.com/health

# Respuesta esperada:
{
  "status": "online",
  "version": "2.0.0",
  "environment": "production"
}
```

## 🔚 Troubleshooting

**Error: Cannot find module**
- Solucin: `npm install` en Hostinger

**Port 3000 en uso**
- Solucin: Cambiar puerto en config

**CORS errors**
- Solucin: Verificar FRONTEND_URL en .env

## 📖 Documentación

- API Docs: https://api.tudominio.com/docs
- GitHub: https://github.com/graciasdios9999-prog/automatizacion-inteligente

---

**Listo para producción 🚀**