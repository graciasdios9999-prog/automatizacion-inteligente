import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import http from 'http';
import logger from './utils/logger.js';
import { initWebSocket } from './websocket.js';
import { startMetricsSimulation } from './services/metrics-simulator.js';

// Routes
import analyticsAdvanced from './routes/analytics-advanced.js';
import billingStripe from './routes/billing-stripe.js';
import crmAdvanced from './routes/crm-advanced.js';
import aiAdvanced from './routes/ai-advanced.js';
import affiliateAdvanced from './routes/affiliate-advanced.js';
import marketplaceAdvanced from './routes/marketplace-advanced.js';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);

// WebSocket init
initWebSocket(httpServer);

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    version: '2.0.0',
    environment: process.env.NODE_ENV,
    phase: 'FASE 2 - Real-time Dashboard'
  });
});

// Routes
app.use('/api/analytics', analyticsAdvanced);
app.use('/api/billing', billingStripe);
app.use('/api/crm', crmAdvanced);
app.use('/api/ai', aiAdvanced);
app.use('/api/affiliate', affiliateAdvanced);
app.use('/api/marketplace', marketplaceAdvanced);

// Start server
httpServer.listen(PORT, () => {
  logger.info(`🚀 FASE 2 - Server running on http://localhost:${PORT}`);
  logger.info(`📊 WebSocket enabled on ws://localhost:${PORT}`);
  logger.info(`🤖 Metrics simulation ready`);
  
  // Start simulating metrics for demo
  if (process.env.NODE_ENV === 'development') {
    startMetricsSimulation('user123', 10000); // Actualizar cada 10s
  }
});

export default app;