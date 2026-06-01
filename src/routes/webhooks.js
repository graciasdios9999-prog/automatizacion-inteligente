import express from 'express';

const router = express.Router();

router.post('/events', (req, res) => {
  res.json({ success: true, message: 'Webhook procesado' });
});

router.get('/history', (req, res) => {
  res.json({ history: [] });
});

export default router;