import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { recordTick } from '@/lib/runtime-store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const raw = await request.text();
  let eventType = 'unknown';
  try {
    const parsed = JSON.parse(raw) as { type?: string; id?: string };
    eventType = parsed.type || 'unknown';
  } catch {
    eventType = 'invalid_json';
  }
  recordTick(`stripe:${eventType}`);
  logger.info('stripe.webhook', { module: 'stripe', event: eventType });
  return NextResponse.json({ received: true, type: eventType });
}
