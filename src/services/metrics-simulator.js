import Analytics from '../models/Analytics.js';
import logger from '../utils/logger.js';
import { broadcastMetrics } from '../websocket.js';

const platforms = ['instagram', 'twitter', 'facebook', 'tiktok', 'linkedin'];

const simulateMetrics = async (userId) => {
  try {
    const metrics = {
      totalEngagement: Math.floor(Math.random() * 10000) + 1000,
      totalReach: Math.floor(Math.random() * 100000) + 10000,
      totalImpressions: Math.floor(Math.random() * 500000) + 50000,
      totalPosts: Math.floor(Math.random() * 100) + 10,
      byPlatform: {}
    };

    platforms.forEach(platform => {
      metrics.byPlatform[platform] = Math.floor(Math.random() * 50);
    });

    // Guardar en BD
    await Analytics.create({
      userId,
      platform: 'overall',
      ...metrics,
      date: new Date(),
      hour: new Date().getHours()
    });

    // Broadcast WebSocket
    broadcastMetrics(userId, metrics);

    logger.info(`📊 Metrics simulated for user ${userId}`);
    return metrics;
  } catch (error) {
    logger.error(`Error simulating metrics: ${error.message}`);
  }
};

export const startMetricsSimulation = (userId, interval = 30000) => {
  logger.info(`🚀 Starting metrics simulation for ${userId} (every ${interval}ms)`);
  setInterval(() => simulateMetrics(userId), interval);
};

export default simulateMetrics;