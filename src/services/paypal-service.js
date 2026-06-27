// PayPal Gateway Integration v6.0+ for Zeus Platform
// Professional integration alongside Stripe for flexible payments

import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';

dotenv.config();

paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

export class PayPalService {
  // Create PayPal Order (for one-time or subscription start)
  async createOrder({ amount, currency = 'USD', description = 'Zeus God-Level Plan', userId }) {
    const create_payment_json = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/billing?paypal=success`,
        cancel_url: `${process.env.FRONTEND_URL}/billing?paypal=cancel`
      },
      transactions: [{
        item_list: {
          items: [{
            name: description,
            sku: `zeus-plan-${userId}`,
            price: (amount / 100).toFixed(2),
            currency,
            quantity: 1
          }]
        },
        amount: {
          currency,
          total: (amount / 100).toFixed(2)
        },
        description: `Zeus Platform - ${description}`
      }]
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) reject(error);
        else resolve({
          success: true,
          paymentId: payment.id,
          approvalUrl: payment.links.find(link => link.rel === 'approval_url').href,
          userId
        });
      });
    });
  }

  // Capture/Execute Payment after approval
  async capturePayment(paymentId, payerId) {
    const execute_payment_json = { payer_id: payerId };

    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
        if (error) reject(error);
        else resolve({
          success: true,
          paymentId: payment.id,
          state: payment.state,
          amount: payment.transactions[0].amount.total
        });
      });
    });
  }

  // PayPal Webhook Handler (for IPN or Webhooks API)
  async handleWebhook(event) {
    // Basic handling - expand for production
    console.log('PayPal Webhook received:', event.event_type);
    // Handle payment completed, subscription events, etc.
    return { received: true };
  }

  // Future: Subscriptions via PayPal Billing Plans (advanced)
}

export const paypalService = new PayPalService();