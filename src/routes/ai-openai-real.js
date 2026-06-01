import express from 'express';
import { generateContent, generateLandingPage, chatbotResponse } from '../services/openai-real.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/generate-content', async (req, res) => {
  try {
    const { topic, platform, style } = req.body;
    const content = await generateContent(topic, platform, style);
    res.json({ success: true, content, platform });
  } catch (error) {
    logger.error(`Content generation error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.post('/landing-page', async (req, res) => {
  try {
    const { title, description, ctaText } = req.body;
    const html = await generateLandingPage(title, description, ctaText);
    res.json({ success: true, html, url: 'https://lp-' + Date.now() + '.com' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/chatbot/message', async (req, res) => {
  try {
    const { botName, message, context } = req.body;
    const response = await chatbotResponse(botName, message, context);
    res.json({ success: true, response, confidence: 0.95 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;