#!/bin/bash

echo "🚀 FASE 3 - Database + OpenAI + Stripe"

# 1. Setup PostgreSQL
echo "💿 Creando base de datos..."
# Asume que PostgreSQL está instalado
psql -U postgres -c "CREATE DATABASE auto_inteligente_2026;" 2>/dev/null || echo "DB ya existe"

# 2. Run migrations
echo "🗄️ Ejecutando migraciones..."
node migrations/run.js

# 3. Actualizar .env
echo "🔐 Asegúrate de llenar .env.local con:"
echo "   - OPENAI_API_KEY"
echo "   - STRIPE_SECRET_KEY"
echo "   - DB_PASSWORD"

# 4. Install dependencies
echo "💿 Instalando dependencias..."
npm install

# 5. Start servers
echo "🚀 Iniciando servidores..."
node --watch src/index-phase2.js &
cd frontend && npm run dev &

echo ""
echo "✅ FASE 3 iniciado!"
echo "📊 URLs:"
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:3001"
echo ""
echo "📊 APIs nuevas:"
echo "   POST /api/auth/register"
echo "   POST /api/auth/login"
echo "   POST /api/ai/generate-content"
echo "   POST /api/billing/create-checkout"
echo ""
