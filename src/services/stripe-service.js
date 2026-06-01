import Stripe from 'stripe';
import logger from '../utils/logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (userId, plan) => {
  try {
    const prices = {
      basic: process.env.STRIPE_PRICE_BASIC || 'price_basic',
      pro: process.env.STRIPE_PRICE_PRO || 'price_pro',
      enterprise: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise'
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: prices[plan],
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { userId, plan }
    });

    logger.info(`✅ Checkout session created: ${session.id}`);
    return session;
  } catch (error) {
    logger.error(`Stripe error: ${error.message}`);
    throw error;
  }
};

export const handleWebhook = async (body, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    logger.info(`📨 Webhook received: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        logger.info(`✅ Payment completed: ${event.data.object.id}`);
        break;
      case 'invoice.payment_succeeded':
        logger.info(`💰 Invoice paid: ${event.data.object.id}`);
        break;
      case 'customer.subscription.deleted':
        logger.info(`❌ Subscription cancelled: ${event.data.object.id}`);
        break;
    }

    return event;
  } catch (error) {
    logger.error(`Webhook error: ${error.message}`);
    throw error;
  }
};

export const getSubscriptionStatus = async (customerId) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1
    });
    return subscriptions.data[0] || null;
  } catch (error) {
    logger.error(`Error getting subscription: ${error.message}`);
    return null;
  }
};

export default stripe;