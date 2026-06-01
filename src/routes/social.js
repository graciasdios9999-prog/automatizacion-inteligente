import express from 'express';

const router = express.Router();

router.post('/publish', (req, res) => {
  res.json({ success: true, postId: 'post_123' });
});

router.get('/platforms', (req, res) => {
  res.json({
    platforms: ['instagram', 'twitter', 'facebook', 'tiktok', 'linkedin']
  });
});

export default router;