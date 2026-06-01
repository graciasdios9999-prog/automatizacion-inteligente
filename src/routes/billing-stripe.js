import express from 'express';
import stripe from 'stripe';
import { createCheckoutSession, handleWebhook } from '../services/stripe-service.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/create-checkout', async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const session = await createCheckoutSession(userId, plan);
    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    logger.error(`Checkout error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    await handleWebhook(req.body, req.headers['stripe-signature']);
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/subscription/:customerId', async (req, res) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(req.params.customerId);
    res.json({ subscription });
  } catch (error) {
    res.status(404).json({ error: 'Subscription not found' });
  }
});

router.post('/cancel', async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const canceled = await stripe.subscriptions.del(subscriptionId);
    logger.info(`Subscription canceled: ${subscriptionId}`);
    res.json({ success: true, subscription: canceled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;