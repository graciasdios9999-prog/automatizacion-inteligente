import express from 'express';

const router = express.Router();

router.get('/subscriptions', (req, res) => {
  res.json({ subscriptions: [] });
});

router.post('/subscribe', (req, res) => {
  res.json({ success: true, subscription: { plan: 'pro' } });
});

export default router;