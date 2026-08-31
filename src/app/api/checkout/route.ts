import { NextRequest, NextResponse } from 'next/server';
import { findOffer } from '@/lib/catalog';
import { successResponse, errorResponse, ApiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { sku?: string; successUrl?: string; cancelUrl?: string };
    const offer = body.sku ? findOffer(body.sku) : undefined;
    if (!offer) {
      throw new ApiError('UNKNOWN_SKU', 'SKU no existe en catálogo', 404);
    }

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      if (!offer.paymentLink) {
        throw new ApiError('NO_CHECKOUT', 'Falta STRIPE_SECRET_KEY y payment link', 503);
      }
      return NextResponse.json(
        successResponse({
          mode: 'payment_link',
          url: offer.paymentLink,
          sku: offer.sku,
          amountUsd: offer.priceUsd,
        })
      );
    }

    const params = new URLSearchParams();
    params.set('mode', offer.interval === 'month' ? 'subscription' : 'payment');
    params.set('success_url', body.successUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?paid=${offer.sku}`);
    params.set('cancel_url', body.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?cancel=1`);
    params.set('line_items[0][quantity]', '1');
    params.set('line_items[0][price_data][currency]', 'usd');
    params.set('line_items[0][price_data][unit_amount]', String(offer.priceUsd * 100));
    params.set('line_items[0][price_data][product_data][name]', offer.name);
    params.set('metadata[sku]', offer.sku);
    params.set('metadata[stripe_product_id]', offer.stripeProductId);
    if (offer.interval === 'month') {
      params.set('line_items[0][price_data][recurring][interval]', 'month');
    }

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const json = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) {
      throw new ApiError('STRIPE_ERROR', json.error?.message || `Stripe ${res.status}`, 502);
    }
    return NextResponse.json(successResponse({ mode: 'checkout_session', id: json.id, url: json.url, sku: offer.sku }));
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(errorResponse(error), { status: error.statusCode });
    }
    return NextResponse.json(
      errorResponse(new ApiError('INTERNAL_ERROR', 'Checkout falló', 500)),
      { status: 500 }
    );
  }
}
