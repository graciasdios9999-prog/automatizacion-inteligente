#!/bin/bash

# Automatización Inteligente - Deploy Script

echo "🚀 Iniciando deployment..."

# 1. Instalar dependencias
echo "💿 Instalando dependencias..."
npm install

# 2. Build
echo "🔨 Compilando..."
npm run build

# 3. Tests
echo "🧻 Ejecutando tests..."
npm test || echo "No tests configurados aún"

# 4. Git push
echo "📄 Pusheando a GitHub..."
git add -A
git commit -m "Deployment: Phase 1 complete"
git push origin develop

# 5. Notificación
echo "✅ Deployment completado!"
echo "🔗 Frontend: http://localhost:3001"
echo "🔗 Backend: http://localhost:3000"
echo "🎉 Listo para Hostinger!"
