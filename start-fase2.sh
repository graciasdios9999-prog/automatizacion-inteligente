#!/bin/bash

echo "🚀 FASE 2 - Starting Full System"

# Kill previous processes
pkill -f "npm run dev" || true
pkill -f "node src" || true

# Create logs directory
mkdir -p logs

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Setting up database..."
# PostgreSQL setup (asume que ya existe)
# psql -U postgres -c "CREATE DATABASE auto_inteligente_2026 IF NOT EXISTS;"

echo "🔄 Starting backend (WebSocket + Analytics)..."
node --watch src/index-phase2.js &
BACKEND_PID=$!

sleep 2

echo "🎨 Starting frontend (React + Recharts)..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ FASE 2 Sistema iniciado!"
echo ""
echo "📍 URLs:"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:3001"
echo "   WebSocket: ws://localhost:3000"
echo ""
echo "📊 Dashboard: http://localhost:3001"
echo ""
echo "⏱️ Métricas actualizándose cada 10 segundos"
echo ""
echo "Presiona Ctrl+C para detener"

wait