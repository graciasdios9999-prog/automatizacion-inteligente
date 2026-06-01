import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import 'express-async-errors';
import dotenv from 'dotenv';
import logger from './utils/logger.js';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    version: '2.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  logger.info(`🤖 Plataforma Automatización Inteligente v2.0.0`);
});

export default app;