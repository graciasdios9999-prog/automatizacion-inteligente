import express from 'express';
import { agentOrchestrator } from '../services/agent-orchestrator.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/execute', async (req, res) => {
  try {
    const task = req.body;
    const result = await agentOrchestrator(task);
    res.json({ success: true, result });
  } catch (error) {
    logger.error(`Agent execution error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.post('/publish-multi', async (req, res) => {
  try {
    const { content, platforms, schedule } = req.body;
    const result = await agentOrchestrator({
      type: 'task',
      command: 'publish-multi',
      params: { content, platforms, schedule }
    });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/analyze/:userId', async (req, res) => {
  try {
    const { platforms = ['instagram', 'twitter', 'facebook'] } = req.query;
    const result = await agentOrchestrator({
      type: 'analysis',
      command: 'analyze',
      params: { userId: req.params.userId, platforms }
    });
    res.json({ success: true, analysis: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trends', async (req, res) => {
  try {
    const result = await agentOrchestrator({
      type: 'trends',
      command: 'trend-alert',
      params: { platforms: ['instagram', 'tiktok', 'youtube'] }
    });
    res.json({ success: true, trends: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;