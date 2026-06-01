#!/bin/bash

# Setup inicial del proyecto

echo "🎉 Setup de Automatización Inteligente 2026"

# 1. Crear carpetas
mkdir -p logs src/routes src/utils src/middleware src/services src/models

# 2. Instalar dependencias backend
echo "💿 Instalando dependencias backend..."
npm install

# 3. Instalar dependencias frontend
echo "💿 Instalando dependencias frontend..."
cd frontend
npm install
cd ..

# 4. Crear .env local
echo "🔐 Creando .env.local..."
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "✅ .env.local creado. Por favor, actualiza con tus credenciales."
fi

echo ""
echo "✅ Setup completado!"
echo "🚀 Comienza el servidor con:"
echo ""
echo "   npm run dev          # Backend"
echo "   cd frontend && npm run dev  # Frontend"
echo ""
echo "O usa Docker:"
echo "   docker-compose up"
echo ""
echo "URLs:"
echo "  Backend: http://localhost:3000"
echo "  Frontend: http://localhost:3001"
echo ""
