import express from 'express';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ affiliate: { earnings: 0, referrals: 0, commissionRate: 30 } });
});

router.post('/link', (req, res) => {
  res.json({ success: true, link: 'https://ref.auto-inteligente.com/' + Math.random().toString(36).substr(2, 9) });
});

router.get('/payouts', (req, res) => {
  res.json({ payouts: [] });
});

export default router;