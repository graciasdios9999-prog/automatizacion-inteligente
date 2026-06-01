import express from 'express';
import logger from '../utils/logger.js';

const router = express.Router();

const abTests = new Map();

router.post('/create', (req, res) => {
  try {
    const { contentId, variantA, variantB, platforms } = req.body;
    
    const testId = `ab_${Date.now()}`;
    const test = {
      id: testId,
      contentId,
      variantA,
      variantB,
      platforms,
      status: 'active',
      variantA_engagement: 0,
      variantB_engagement: 0,
      created: new Date(),
      winner: null
    };
    
    abTests.set(testId, test);
    logger.info(`🧻 A/B Test created: ${testId}`);
    res.json({ success: true, testId, test });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/results/:testId', (req, res) => {
  try {
    const test = abTests.get(req.params.testId);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    
    // Simular resultados
    const winner = test.variantA_engagement > test.variantB_engagement ? 'A' : 'B';
    const confidence = (Math.random() * 30 + 70).toFixed(2);
    
    res.json({ 
      success: true, 
      test,
      winner,
      confidence: confidence + '%',
      improvement: ((test.variantA_engagement - test.variantB_engagement) / test.variantB_engagement * 100).toFixed(2) + '%'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;