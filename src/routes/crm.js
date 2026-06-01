import express from 'express';

const router = express.Router();

router.get('/contacts', (req, res) => {
  res.json({ contacts: [], total: 0 });
});

router.post('/contacts', (req, res) => {
  res.json({ success: true, contact: { id: 1 } });
});

export default router;