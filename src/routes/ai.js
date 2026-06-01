import express from 'express';

const router = express.Router();

router.post('/generate-content', (req, res) => {
  res.json({ success: true, content: 'Contenido generado por IA' });
});

router.post('/landing-page', (req, res) => {
  res.json({ success: true, url: 'https://landing.auto-inteligente.com' });
});

router.post('/chatbot/train', (req, res) => {
  res.json({ success: true, message: 'Chatbot entrenado' });
});

export default router;