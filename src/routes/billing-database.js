import express from 'express';
import { Pool } from 'pg';
import logger from '../utils/logger.js';
import { createCheckoutSession, handleWebhook } from '../services/stripe-service.js';

const router = express.Router();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'auto_inteligente_2026',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password'
});

router.post('/create-checkout', async (req, res) => {
  try {
    const { userId, plan } = req.body;
    
    // Create Stripe session
    const session = await createCheckoutSession(userId, plan);
    
    // Save to database
    await pool.query(
      'UPDATE users SET stripe_id = $1 WHERE id = $2',
      [session.customer, userId]
    );
    
    logger.info(`💳 Checkout created: ${session.id}`);
    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const event = await handleWebhook(req.body, req.headers['stripe-signature']);
    
    if (event.type === 'checkout.session.completed') {
      const { metadata, customer } = event.data.object;
      
      // Update user subscription
      await pool.query(
        'INSERT INTO subscriptions (user_id, stripe_customer_id, plan, status) VALUES ($1, $2, $3, $4)',
        [metadata.userId, customer, metadata.plan, 'active']
      );
      
      // Update user plan
      await pool.query(
        'UPDATE users SET plan = $1, stripe_subscription_id = $2 WHERE id = $3',
        [metadata.plan, event.data.object.id, metadata.userId]
      );
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/subscription/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [req.params.userId]
    );
    res.json({ subscription: result.rows[0] || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;