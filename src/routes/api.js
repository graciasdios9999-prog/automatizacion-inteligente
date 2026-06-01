import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({
    platform: 'Automatización Inteligente',
    status: 'active',
    version: '1.0.0',
    apis_integrated: ['Instagram', 'Twitter', 'Facebook', 'TikTok', 'LinkedIn'],
    ai_enabled: true,
    bot_status: 'running'
  });
});

router.post('/test', (req, res) => {
  logger.info('API test endpoint called');
  res.json({ message: 'API is working correctly!' });
});

export default router;