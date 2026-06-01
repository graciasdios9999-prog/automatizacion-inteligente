import express from 'express';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({
    dashboard: {
      totalPosts: 0,
      totalEngagement: 0,
      totalReach: 0
    }
  });
});

export default router;