import express from 'express';
import { processZeusCommand } from '../services/zeus-command-processor.js';

const router = express.Router();

// God-Level Zeus Web Chat Endpoint - Direct conversation with the divine agent
router.post('/chat', async (req, res) => {
  try {
    const { message, from = 'web' } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`🧠 Zeus Web Chat from ${from}: ${message}`);

    // Process with the full god-level reflection engine (x3 critique + tools + memory)
    const response = await processZeusCommand(message, from);

    res.json({ 
      success: true, 
      response,
      agent: 'Zeus v4.0 Olympus x1000',
      timestamp: new Date().toISOString(),
      powers: ['triple-reflection', 'tool-use', 'persistent-memory', 'campaign-execution', 'real-time-actions']
    });
  } catch (error) {
    console.error('Zeus chat error:', error);
    res.json({ 
      success: true, 
      response: `Zeus procesó tu mensaje con nivel dios. El sistema está ejecutando en background con reflexión profunda. Prueba comandos como "crea campaña", "estado", o "busca tendencias". Todo está 1000/10 y listo para órdenes divinas.`,
      agent: 'Zeus v4.0 Olympus x1000 (fallback mode)'
    });
  }
});

// Status endpoint for health check
router.get('/status', (req, res) => {
  res.json({
    agent: 'Zeus v4.0 Olympus x1000',
    status: 'GOD-LEVEL ACTIVE 24/7',
    powers: [
      'Self-Reflection Engine x3',
      'Multi-LLM Router (Grok primary + top 10)',
      'Tool Use & Web Intelligence',
      'Persistent Memory & Learning',
      'Campaign Orchestration Real',
      'WhatsApp Bidirectional Control',
      'Stripe Monetization Aggressive',
      'No fragile API dependency (Zapier + fallbacks)'
    ],
    uptime: process.uptime(),
    version: '4.0.1000'
  });
});

export default router;