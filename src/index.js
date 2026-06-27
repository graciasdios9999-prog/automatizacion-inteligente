import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import winston from 'winston';
import { Sequelize } from 'sequelize';

// Import modular routes (Microservices-ready architecture)
import authRoutes from './routes/auth.js';
import analyticsRoutes from './routes/analytics.js';
import aiRoutes from './routes/ai.js';
import socialRoutes from './routes/social.js';
import billingRoutes from './routes/billing.js';
import agentsRoutes from './routes/agents.js';
import marketplaceRoutes from './routes/marketplace.js';
import whatsappRoutes, { sendZeusWhatsApp, notifyUserCampaignComplete } from './routes/whatsapp.js';
import zeusRoutes from './routes/zeus.js';

// God-Level Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'automatizacion-inteligente-god-level' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io God-Level Real-time
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000
});

// Rate Limiter 100/10
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Demasiadas solicitudes. Por favor intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Sequelize DB Connection (Microservice ready - can be per service later)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'auto_inteligente_2026',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'supersecretgodlevel',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg),
    pool: { max: 20, min: 0, acquire: 30000, idle: 10000 } // Scalable pool
  }
);

// Test DB
sequelize.authenticate()
  .then(() => logger.info('✅ PostgreSQL conectado - Arquitectura escalable lista'))
  .catch(err => logger.warn('⚠️ DB no disponible en este entorno, usando mocks. Error:', err.message));

// Middleware Divine Stack
app.use(helmet({
  contentSecurityPolicy: false // For dev flexibility, tighten in prod
}));
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(limiter);

// Request Logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Make io and sequelize available to routes
app.set('io', io);
app.set('sequelize', sequelize);
app.set('logger', logger);

// ==================== MICROSERVICES-READY ROUTES ====================
// Each route group can be extracted to its own microservice later (auth-service, ai-service, etc.)
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/whatsapp', whatsappRoutes); // God-Level bidirectional WhatsApp with Zeus - your number +13256250675 connected
app.use('/api/zeus', zeusRoutes); // Direct web chat + status for Zeus v4.0 Olympus x1000 - the divine agent

// Health Check for Orchestration / Kubernetes
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'automatizacion-inteligente-god-level-v2',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    websocket: 'active',
    database: sequelize ? 'connected (or mock)' : 'disconnected',
    architecture: 'modular-monolith-ready-for-microservices',
    scalability: 'docker-compose + horizontal scaling ready'
  });
});

// WebSocket Divine Real-time Engine
io.on('connection', (socket) => {
  logger.info(`🔌 Cliente WebSocket conectado: ${socket.id}`);

  // Join user room for personalized updates (multi-tenant ready)
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
    logger.info(`Usuario ${userId} unido a sala personalizada`);
  });

  // Real-time metrics simulation / broadcast (replace with real DB queries + cron in prod)
  const metricsInterval = setInterval(() => {
    const liveMetrics = {
      timestamp: new Date(),
      postsToday: Math.floor(Math.random() * 50) + 120,
      engagementRate: (Math.random() * 3 + 4.5).toFixed(2),
      reach: Math.floor(Math.random() * 15000) + 45000,
    };
    socket.emit('live-metrics', liveMetrics);
  }, 5000);

  socket.on('disconnect', () => {
    clearInterval(metricsInterval);
    logger.info(`🔌 Cliente WebSocket desconectado: ${socket.id}`);
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado', path: req.path });
});

// Error Handler
app.use((err, req, res, next) => {
  logger.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor', message: err.message });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  logger.info(`🚀 Servidor Zeus God-Level escuchando en puerto ${PORT}`);
  logger.info(`🧠 Zeus v4.0 Olympus x1000 activo - Chat web + WhatsApp + Tools + Memoria persistente`);
});

export { app, io };