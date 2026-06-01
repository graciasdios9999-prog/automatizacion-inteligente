import express from 'express';

const router = express.Router();

router.get('/prompts', (req, res) => {
  res.json({ prompts: [], total: 0 });
});

router.post('/prompts', (req, res) => {
  res.json({ success: true, prompt: { id: 1, title: 'Nuevo prompt' } });
});

router.get('/sales', (req, res) => {
  res.json({ sales: [] });
});

export default router;