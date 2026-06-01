import express from 'express';
import Analytics from '../models/Analytics.js';
import Post from '../models/Post.js';
import logger from '../utils/logger.js';
import { broadcastMetrics } from '../websocket.js';

const router = express.Router();

router.get('/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const period = req.query.period || '7d';
    
    const analytics = await Analytics.findAll({
      where: { userId },
      limit: 30,
      order: [['date', 'DESC']]
    });

    const posts = await Post.findAll({
      where: { userId, status: 'published' },
      limit: 50
    });

    const totalMetrics = {
      totalPosts: posts.length,
      totalEngagement: posts.reduce((sum, p) => sum + p.engagement, 0),
      totalReach: posts.reduce((sum, p) => sum + p.reach, 0),
      totalImpressions: posts.reduce((sum, p) => sum + p.impressions, 0),
      avgEngagement: posts.length > 0 ? posts.reduce((sum, p) => sum + p.engagement, 0) / posts.length : 0,
      avgReach: posts.length > 0 ? posts.reduce((sum, p) => sum + p.reach, 0) / posts.length : 0,
      topPost: posts[0] || null,
      byPlatform: {
        instagram: posts.filter(p => p.platform === 'instagram').length,
        twitter: posts.filter(p => p.platform === 'twitter').length,
        facebook: posts.filter(p => p.platform === 'facebook').length,
        tiktok: posts.filter(p => p.platform === 'tiktok').length,
        linkedin: posts.filter(p => p.platform === 'linkedin').length
      }
    };

    res.json({ success: true, metrics: totalMetrics, history: analytics });
  } catch (error) {
    logger.error(`Analytics error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.post('/simulate', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Crear métricas simuladas para desarrollo
    const simulatedMetrics = {
      totalPosts: Math.floor(Math.random() * 100) + 10,
      totalEngagement: Math.floor(Math.random() * 10000) + 1000,
      totalReach: Math.floor(Math.random() * 100000) + 10000,
      totalImpressions: Math.floor(Math.random() * 500000) + 50000,
      byPlatform: {
        instagram: Math.floor(Math.random() * 50),
        twitter: Math.floor(Math.random() * 30),
        facebook: Math.floor(Math.random() * 25),
        tiktok: Math.floor(Math.random() * 40),
        linkedin: Math.floor(Math.random() * 20)
      }
    };

    // Broadcast vía WebSocket
    broadcastMetrics(userId, simulatedMetrics);

    res.json({ success: true, metrics: simulatedMetrics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/report/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const format = req.query.format || 'json'; // json, csv, pdf

    const analytics = await Analytics.findAll({
      where: { userId },
      order: [['date', 'DESC']]
    });

    if (format === 'csv') {
      const csv = 'Date,Platform,Engagement,Reach,Impressions\n' +
        analytics.map(a => `${a.date},${a.platform},${a.totalEngagement},${a.totalReach},${a.totalImpressions}`).join('\n');
      res.type('text/csv').send(csv);
    } else {
      res.json({ success: true, report: analytics });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;